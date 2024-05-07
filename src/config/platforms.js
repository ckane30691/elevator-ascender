export const _addPlatforms = config => {
    _constructFlooring(config);
    _addElevators(config);
}

const _constructFlooring = config => {
    config.flooring = config.physics.add.staticGroup();

    config.flooring.create(400, 1200, 'ground').setScale(2).refreshBody();

    config.flooring.create(600, 1040, 'ground');
    config.flooring.create(50, 1040, 'ground');
    config.flooring.create(600, 880, 'ground');
    config.flooring.create(50, 880, 'ground');
    config.flooring.create(600, 720, 'ground');
    config.flooring.create(50, 720, 'ground');
    config.flooring.create(600, 560, 'ground');
    config.flooring.create(50, 560, 'ground');
}

const _addElevators = config => {
    config.elevators = config.physics.add.group();
    config.elevators.create(325, 1230, 'elevator').setScale(.55).refreshBody();
    config.elevators.children.iterate((elevator) => {
        // Set allowGravity to false for each elevator
        elevator.body.setSize(270, 125);
        elevator.body.setOffset(-5, 0)
        elevator.body.allowGravity = false;
        elevator.body.immovable = true;
        _moveElevatorAutonomously(elevator, config);
    });
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
    const endY = 560; // Adjust as needed for desired movement distance
    // config.elevatorTweens = [];
    // Create tween for elevator movement
    elevator.autoMovementTween = config.tweens.add({
        targets: elevator,
        y: endY,
        yoyo: true,
        repeat: -1,
        duration: 20000, // Duration in milliseconds
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