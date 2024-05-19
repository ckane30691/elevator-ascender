export const _addDoor = (config, row, col, level) => {
    const floorOffset = 140;
    // const doorContainer = config.add.container(row, col - floorOffset);

    const door = config.doors.create(row, col - floorOffset, 'door').setScale(3.5).refreshBody()
    door.row = row
    door.col = col - floorOffset
    door.body.setOffset(-8, 0)
    door.setFrame(0)
}

export const _createDoorAnimations = (config) => {

    config.anims.create({
        key: 'openDoor',  // Animation key
        frames: config.anims.generateFrameNumbers('door', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0, // Do not repeat
        // onComplete: () => {

        // }
    });
    config.doors.children.each(door => {
        door.play('openDoor')

    })


}