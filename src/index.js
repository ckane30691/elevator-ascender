import Phaser from 'phaser';
import { _addPlayer, _bindKeyHandlers } from '../src/config/player.js';
import { _configurePhysics } from '../src/config/physics.js';
import { _addBackground } from '../src/config/background.js';
import { _addStars } from '../src/config/stars.js';
import { _addPlatforms } from '../src/config/platforms.js';
import { _preloadAssets } from '../src/config/assetPreload.js';
import { _configureScore } from '../src/config/score.js'

class ExampleScene extends Phaser.Scene {
    constructor() {
        super();
        this.player;
        this.platforms;
        this.stars;
        this.score = 0;
        this.scoreText;
    }

    preload() {
        _preloadAssets(this);
    }

    create() {
        _addBackground(this);

        _addStars(this);

        _configureScore(this);

        _addPlatforms(this);

        _addPlayer(this);

        _configurePhysics(this);
    }

    update() {
        _bindKeyHandlers(this);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: ExampleScene
};

const game = new Phaser.Game(config);