export const _addPlayer = (config) => {
    config.player = config.physics.add.sprite(100, 450, 'dude');

    config.player.setBounce(0.2);
    config.player.setCollideWorldBounds(true);

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

export const _bindKeyHandlers = (config) => {
    const cursors = config.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        config.player.setVelocityX(-160);

        config.player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        config.player.setVelocityX(160);

        config.player.anims.play('right', true);
    }
    else {
        config.player.setVelocityX(0);

        config.player.anims.play('turn');
    }

    if (cursors.up.isDown && config.player.body.touching.down) {
        config.player.setVelocityY(-330);
    }
}