import { _collectStar } from './stars.js'
import { GAME_WIDTH, GAME_HEIGHT } from '../index.js';

export const _configurePhysics = (config) => {
    //Sets boundries for left and right but not up and down
    config.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT, true, true, false, true);

    config.physics.add.collider(config.player, config.platforms);
    config.physics.add.collider(config.stars, config.platforms);
    config.physics.add.overlap(config.player,
        config.stars,
        (player, star) => _collectStar(player, star, config),
        null,
        config
    );
}