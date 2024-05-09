export const _preloadAssets = (config) => {
    config.load.image('sky', 'assets/sky.png');
    config.load.image('elevator', 'assets/elevator_floor.png');
    config.load.image('ground', 'assets/floor.png');
    config.load.image('star', 'assets/star.png');
    config.load.image('bomb', 'assets/bomb.png');
    config.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}