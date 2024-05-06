export const _addStars = config => {
    config.stars = config.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    config.stars.children.iterate((child) => {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
}

export const _collectStar = (player, star, config) => {
    star.disableBody(true, true);
    console.log(config.score)
    config.score += 10;
    config.scoreText.setText('Score: ' + config.score)
}