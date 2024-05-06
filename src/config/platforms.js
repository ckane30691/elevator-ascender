export const _addPlatforms = config => {
    config.platforms = config.physics.add.staticGroup();

    config.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    config.platforms.create(600, 400, 'ground');
    config.platforms.create(50, 400, 'ground');
    config.platforms.create(600, 240, 'ground');
    config.platforms.create(50, 240, 'ground');
    config.platforms.create(600, 80, 'ground');
    config.platforms.create(50, 80, 'ground');
}