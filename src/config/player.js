import Phaser from 'phaser';
import { _moveElevator, _moveElevatorAutonomously } from './platforms.js'

export const _addPlayer = (config) => {
    _createAndConfigurePlayer(config);
    _createAndConfigurePlayerAnimations(config);
}

const _createAndConfigurePlayerAnimations = config => {
    config.anims.create({
        key: 'left',
        frames: config.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    config.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    config.anims.create({
        key: 'right',
        frames: config.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
}

const _createAndConfigurePlayer = (config) => {
    config.player = config.physics.add.sprite(100, 1100, 'dude');

    // config.player.setBounce(0.2);
    config.player.setCollideWorldBounds(true);
}

export const _bindKeyHandlers = (config) => {
    config.cursors = config.input.keyboard.createCursorKeys();
    const cursors = config.cursors;
    const player = config.player

    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    let [isOnElevator, currElevator] = _checkAllElevatorsForCollisions(config, player);

    config.playerIsOnElevator = isOnElevator;

    // Jump
    if (cursors.up.isDown && player.body.touching.down && !isOnElevator) {
        player.setVelocityY(-230);
    }

    //Move Elevator Up
    if (cursors.up.isDown && player.body.touching.down && isOnElevator) {
        currElevator.autoMovementTween.stop();
        _moveElevator(currElevator, config, 'up')
    }

    //Move Elevator Down
    if (cursors.down.isDown && player.body.touching.down && isOnElevator) {
        currElevator.autoMovementTween.stop();
        _moveElevator(currElevator, config, 'down')
    }
}

const _checkAllElevatorsForCollisions = (config, player) => {
    let result = [false, []]
    config.elevators.children.each(elevator => {
        if (player.body.touching.down && _playerIsOnElevator(elevator, player)) {
            // console.log("Collision Detected:", config.elevatorTweens)

            result = [true, elevator];
        } else {
            if (elevator.autoMovementTween.isDestroyed()) {
                _moveElevatorAutonomously(elevator, config)
            }

        }
    });
    return result
}

const _playerIsOnElevator = (elevator, player) => {
    return Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), elevator.getBounds());
}