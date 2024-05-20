import Phaser from 'phaser';
import { _moveElevator, _moveElevatorAutonomously } from './platforms.js'

export const _addPlayer = (config) => {
    _createAndConfigurePlayer(config);
    _createAndConfigurePlayerAnimations(config);
}

const _createAndConfigurePlayerAnimations = config => {
    config.anims.create({
        key: 'left',
        frames: config.anims.generateFrameNumbers('playerRun', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    config.anims.create({
        key: 'idle',
        frames: config.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }),
        frameRate: 20,
        repeat: -1
    });

    config.anims.create({
        key: 'right',
        frames: config.anims.generateFrameNumbers('playerRun', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    config.anims.create({
        key: 'down',
        frames: config.anims.generateFrameNumbers('playerLieDown', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: 0
    })
}

const _createAndConfigurePlayer = (config) => {
    config.player = config.physics.add.sprite(100, 1000, 'playerIdle').setScale(1.5).refreshBody();
    config.player.body.setSize(35, 60)
    config.player.body.setOffset(45, 68)
    config.player.body.setGravity(0, 10000);
    // config.player.setBounce(0.2);
    config.player.setCollideWorldBounds(true);
    config.player.isCrouching = false;
}

export const _bindKeyHandlers = (config) => {
    // TODO: Bind different key for jumping and crouching
    config.cursors = config.input.keyboard.createCursorKeys();
    const cursors = config.cursors;
    const player = config.player


    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.setFlipX(true);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.setFlipX(false);
        player.anims.play('right', true);
    }
    else if (cursors.down.isDown) {
        if (!player.isCrouching) {
            console.log("ANIMATION NOT PLAYED, STARTING ANIMATION:", player.isCrouching)
            player.anims.play('down', true)
            player.setVelocityX(0)
            player.on('animationcomplete-down', () => {
                player.setFrame(3);
                player.isCrouching = true;
                console.log("ANIMATION COMPLETED MARKED AS TRUE: ", player.isCrouching)
            }, this);
        }
    }
    else {

        player.isCrouching = false;
        console.log("ANIMATION RESET TO FALSE: ", player.isCrouching)
        player.setVelocityX(0);

        player.anims.play('idle');
    }

    if (player.body.touching.down) {
        player.body.setGravity(0, 10000)
    } else {
        player.body.setGravity(0, 0);
    }

    let [isOnElevator, currElevator] = _checkAllElevatorsForCollisions(config, player);

    config.playerIsOnElevator = isOnElevator;

    // Jump
    if (cursors.shift.isDown && player.body.touching.down && !player.isCrouching) {
        player.body.setGravity(0, 0);
        player.setVelocityY(-230);
    }

    //Move Elevator Up
    if (cursors.up.isDown && player.body.touching.down && isOnElevator) {
        // TODO: Make multiple button presses in a row a no-op
        if (currElevator.direction === 'up') return;
        console.log("ELEVATOR WAS MOVING DOWN, NOW MOVING UP")
        currElevator.autoMovementTween.stop();
        currElevator.direction = 'up'
        _moveElevator(currElevator, config, 'up')
    }

    //Move Elevator Down
    if (cursors.down.isDown && player.body.touching.down && isOnElevator) {
        // TODO: Make multiple button presses in a row a no-op
        if (currElevator.direction === 'down') return;
        currElevator.autoMovementTween.stop();
        currElevator.direction = 'down'
        _moveElevator(currElevator, config, 'down')
    }
}

const _checkAllElevatorsForCollisions = (config, player) => {
    let result = [false, []]
    config.elevators.children.each(elevator => {
        if (player.body.touching.down && _playerIsOnElevator(elevator, player)) {
            console.log("Player On Elevator")
            player.isOnElevator = true;
            result = [true, elevator];
        } else {
            player.isOnElevator = false;
        }
    });
    return result
}

const _playerIsOnElevator = (elevator, player) => {
    return player.body.touching.down && elevator.body.touching.up
    // return Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), elevator.getBounds());
}