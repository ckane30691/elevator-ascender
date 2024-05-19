import Phaser from 'phaser';
import { _addPlayer, _bindKeyHandlers } from '../src/config/player.js';
import { _configurePhysics } from '../src/config/physics.js';
import { _addBackground } from '../src/config/background.js';
// import { _addStars } from '../src/config/stars.js';
import { _constructMap } from '../src/config/platforms.js';
import { _preloadAssets } from '../src/config/assetPreload.js';
import { _configureScore } from '../src/config/score.js'
import { level0 } from './config/maps/level0.js'

export const GAME_WIDTH = 1400;
export const GAME_HEIGHT = 1200;

// TODO: Setup Doors for enemies to come out of [done]
// TODO: Find sprite for main char [done]
// TODO: Find sprites for enemies and implement all of their animations [hard]
// TODO: Find sprites for doors [done]
// TODO: Implement enemy AI [hard]
// TODO: Implement crouching functionality [medium]
// TODO: Weapons and powerups [hard]
// TDOO: Background images [medium]
// TODO: Setup multiple levels [medium]
// TODO: Soundfx [medium]
// TODO: Main menu and instructions [medium]
// TODO: Rebind movement keys to wasd [easy]
// TODO: Setup menu to let user bind their own keys [medium]

class ExampleScene extends Phaser.Scene {
    constructor() {
        super();
        this.player;
        this.flooring;
        this.elevators;
        this.doors;
        this.score = 0;
        this.scoreText;
        this.playerIsOnElevator = false;
    }

    preload() {
        _preloadAssets(this);
    }

    create() {
        _addBackground(this);

        // _addStars(this);

        // TODO: Write add doors function

        // _configureScore(this);

        _constructMap(this, level0);

        _addPlayer(this);

        _configurePhysics(this);
    }

    update() {
        _bindKeyHandlers(this);
        // Set Camera
        this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;
        // Check Collisions
        // Open Doors
        // Summon Enemies
        //TODO: Move check collisions function up to the top level outside of bindkeyhandlers
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