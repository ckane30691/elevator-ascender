export const _addPlatforms = config => {
    config.platforms = config.physics.add.staticGroup();

    config.platforms.create(400, 1200, 'ground').setScale(2).refreshBody();

    config.platforms.create(600, 1040, 'ground');
    config.platforms.create(50, 1040, 'ground');
    config.platforms.create(600, 880, 'ground');
    config.platforms.create(50, 880, 'ground');
    config.platforms.create(600, 720, 'ground');
    config.platforms.create(50, 720, 'ground');
    config.platforms.create(600, 560, 'ground');
    config.platforms.create(50, 560, 'ground');
}