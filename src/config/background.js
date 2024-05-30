import { _TRANSLATE_COL, _TRANSLATE_ROW } from './platforms.js';

export const _addBackground = (config, level) => {
    config.add.image(800, 800, 'desert').setScale(3);
    for (let i = 0; i < level.length; i++) {
        for (let j = 0; j < level[i].length; j++) {
            let row = _TRANSLATE_ROW[j];
            let col = _TRANSLATE_COL[i];
            config.add.image(row, col, 'brickBackground').setScale(2)
            let neighborCoords = _getNeighborCoords(row, col);
            neighborCoords.forEach(coord => {
                [row, col] = coord;
                config.add.image(row, col, 'brickBackground').setScale(2)
            });

        }
    }
}

const _getNeighborCoords = (row, col) => {
    return [
        [row - 100, col],
        [row, col - 140],
        [row - 100, col - 140],
        [row - 200, col],
        [row, col - 280],
        [row - 200, col - 140]
    ]
}