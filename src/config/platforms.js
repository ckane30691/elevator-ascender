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

// TODO: Need to come up with a way to set the elevators y endpoint within the level

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
                    _addElevator(config, row, col, level, i, j);
                    break;
                // Elevator w/ Platform
                case 3:
                    _addPlatform(config, row, col, level);
                    _addElevator(config, row, col, level, i, j);
                    break;
                // Top of Elevator Shaft
                case 4:
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

const _addElevator = (config, row, col, level, i, j) => {
    // TODO: Adjust Speeds
    // TODO: Fix Bug Where Game Freezes when you walk off elevator after pressing up key
    const elevator = config.elevators.create(row, col, 'elevator').setScale(.55).refreshBody();
    elevator.body.setSize(270, 125);
    elevator.body.setOffset(-5, 0)
    elevator.body.allowGravity = false;
    elevator.body.immovable = true;
    const [endPosX, endPosY] = _calculateEndPos(level, i, j)
    let translatedY = _TRANSLATE_COL[endPosX];
    _moveElevatorAutonomously(elevator, config, translatedY);
}

const _calculateEndPos = (level, i, j) => {
    let endPos;
    const stack = [[i, j]]
    while (stack.length) {

        let [x, y] = stack.pop(); //[i,j]
        let nextPos = [x - 1, y]
        let nextNeighbor = level[nextPos[0]][nextPos[1]]
        if (nextNeighbor === 4) {
            endPos = nextPos;
            return endPos
        } else {
            stack.push(nextPos)
        }
    }
    throw new Error("Top of elevator shaft not marked on level")
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
}

export const _moveElevatorAutonomously = (elevator, config, endPosY) => {
    const startY = elevator.y;
    // config.elevatorTweens = [];
    // Create tween for elevator movement
    elevator.autoMovementTween = config.tweens.add({
        targets: elevator,
        y: endPosY,
        delay: 3000,
        yoyo: true,
        repeat: -1,
        duration: 10000, // Duration in milliseconds
        ease: 'Linear', // Linear easing for constant speed
    });
}

// export const _moveElevators = config => {
//     config.elevators.children.iterate((elevator) => {
//         _moveElevatorAutonomously(elevator, config);
//     });
// }