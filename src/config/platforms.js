const _TRANSLATE_COL = {
    0: 0,
    1: 200,
    2: 400,
    3: 600,
    4: 800,
    5: 1000,
    6: 1200
}

const _TRANSLATE_ROW = {
    0: 80,
    1: 220,
    2: 360,
    3: 500,
    4: 640,
    5: 780,
    6: 920,
    7: 1060
}

export const _constructMap = (config, level) => {
    _addPhysicsGroups(config);

    for (let i = 0; i < level.length; i++) {
        for (let j = 0; j < level[i].length; j++) {
            let currSquare = level[i][j];

            let row = _TRANSLATE_ROW[j];
            let col = _TRANSLATE_COL[i];
            switch (currSquare) {
                // Platform

                case 0:
                    // console.log(currSquare)
                    _addPlatform(config, row, col)
                    break;
                // Elevator Shaft
                case 1:
                    //Implement this if you find a good sprite
                    break;
                // Elevator
                case 2:
                    _addElevator(config, row, col);
                    break;
                // Elevator w/ Platform
                case 3:
                    _addPlatform(config, row, col);
                    _addElevator(config, row, col);
                    break;
            }

        }
    }
}

const _addPhysicsGroups = config => {
    config.flooring = config.physics.add.staticGroup();
    config.elevators = config.physics.add.group();
}

const _addPlatform = (config, row, col) => {
    const floor = config.flooring.create(row, col, 'ground').setScale(.55).refreshBody();
    floor.body.setSize(140, 70);
    floor.body.setOffset(0, 0)
}

const _addElevator = (config, row, col) => {
    const elevator = config.elevators.create(row, col, 'elevator').setScale(.55).refreshBody();
    elevator.body.setSize(270, 125);
    elevator.body.setOffset(-5, 0)
    elevator.body.allowGravity = false;
    elevator.body.immovable = true;
    _moveElevatorAutonomously(elevator, config);
}

export const _moveElevator = (elevator, config, direction) => {
    // Calculate new position
    let newY;
    const player = config.player;
    if (direction === 'up') {
        newY = elevator.y - 160
    } else {
        newY = elevator.y + 160
    }

    // Create a tween to smoothly move the elevator
    config.tweens.add({
        targets: elevator,
        y: newY,
        duration: 2000, // Duration in milliseconds
        ease: 'Linear', // Easing function
        onComplete: function () {
            // Optionally, you can add code to execute when the tween completes
        }
    });
    // elevator.y = newY

    // newY = (newY + (player.y - elevator.y));
    // config.tweens.add({
    //     targets: player,
    //     y: newY, // Adjust player's position relative to the elevator
    //     duration: 500,
    //     ease: 'Linear'
    // });

}

export const _moveElevatorAutonomously = (elevator, config) => {
    const startY = elevator.y;
    const endY = 600; // Adjust as needed for desired movement distance
    // config.elevatorTweens = [];
    // Create tween for elevator movement
    elevator.autoMovementTween = config.tweens.add({
        targets: elevator,
        y: endY,
        delay: 3000,
        yoyo: true,
        repeat: -1,
        duration: 10000, // Duration in milliseconds
        ease: 'Linear', // Linear easing for constant speed
        // onComplete: () => {
        //     console.log("TWEEN COMPLETED REVERSING DIRECTION")
        //     console.log("Elevator Y POS", elevator.y)
        //     // Reverse direction when reaching the end
        //     // console.log("elevator Y pos: ", elevator.y)

        //     elevator.autoMovementTween = config.tweens.add({
        //         targets: elevator,
        //         y: 1200,
        //         duration: 20000, // Duration in milliseconds
        //         ease: 'Linear',
        //         onComplete: () => _moveElevatorAutonomously(elevator, config) // Restart the movement
        //     });
        // }
    });
    // config.elevatorTweens.push(elevator.autoMovementTween)
}

// export const _moveElevators = config => {
//     config.elevators.children.iterate((elevator) => {
//         _moveElevatorAutonomously(elevator, config);
//     });
// }