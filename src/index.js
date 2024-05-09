import Phaser from 'phaser';
import { _addPlayer, _bindKeyHandlers } from '../src/config/player.js';
import { _configurePhysics } from '../src/config/physics.js';
import { _addBackground } from '../src/config/background.js';
import { _addStars } from '../src/config/stars.js';
import { _constructMap } from '../src/config/platforms.js';
import { _preloadAssets } from '../src/config/assetPreload.js';
import { _configureScore } from '../src/config/score.js'
import { level0 } from './config/maps/level0.js'

export const GAME_WIDTH = 1400;
export const GAME_HEIGHT = 1200;

class ExampleScene extends Phaser.Scene {
    constructor() {
        super();
        this.player;
        this.flooring;
        this.elevators;
        this.stars;
        this.score = 0;
        this.scoreText;
        this.playerIsOnElevator = false;
    }

    preload() {
        _preloadAssets(this);
    }

    create() {
        _addBackground(this);

        _addStars(this);

        _configureScore(this);

        _constructMap(this, level0);

        _addPlayer(this);

        _configurePhysics(this);
    }

    update() {
        _bindKeyHandlers(this);
        this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;
    }
}

const config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: ExampleScene
};

const game = new Phaser.Game(config);