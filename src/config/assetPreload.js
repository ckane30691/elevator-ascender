export const _preloadAssets = (config) => {
    config.load.image('sky', 'assets/sky.png');
    config.load.image('elevator', 'assets/elevator_floor.png');
    config.load.image('ground', 'assets/floor.png');
    config.load.spritesheet('door', 'assets/verticalDoor.png',
        { frameWidth: 32, frameHeight: 40 }
    );
    config.load.image('bomb', 'assets/bomb.png');
    config.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}