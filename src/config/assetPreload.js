export const _preloadAssets = (config) => {
    config.load.image('desert', 'assets/desertBG.png');
    config.load.image('elevator', 'assets/elevator_floor.png');
    config.load.image('ground', 'assets/floor.png');
    config.load.image('brickBackground', 'assets/BrickFour.png');
    config.load.spritesheet('door', 'assets/verticalDoor.png',
        { frameWidth: 32, frameHeight: 40 }
    );
    config.load.image('bomb', 'assets/bomb.png');
    config.load.spritesheet('playerIdle',
        'assets/player/playerIdle.png',
        { frameWidth: 128, frameHeight: 128 }
    );
    config.load.spritesheet('playerRun',
        'assets/player/playerRun.png',
        { frameWidth: 128, frameHeight: 128 }
    );
    config.load.spritesheet('playerLieDown',
        'assets/player/playerLieDown.png',
        { frameWidth: 128, frameHeight: 128 }
    );
    config.load.spritesheet('playerShot',
        'assets/player/playerShot1.png',
        { frameWidth: 128, frameHeight: 128 }
    );
}