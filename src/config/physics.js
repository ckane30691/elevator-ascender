import { _collectStar } from './stars.js'

export const _configurePhysics = (config) => {
    config.physics.add.collider(config.player, config.platforms);
    config.physics.add.collider(config.stars, config.platforms);
    config.physics.add.overlap(config.player,
        config.stars,
        (player, star) => _collectStar(player, star, config),
        null,
        config
    );
}