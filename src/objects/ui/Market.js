import InventoryManager from '../../managers/InventoryManager';
import BlockerButton from './BLockerButton'

class Market extends Phaser.Group {

    constructor(game) {
        let center = { x: game.world.centerX, y: game.world.centerY };
        super(game, null, 'market');
        this.game = game;

        let types = InventoryManager.BLOCKER_TYPES;
        let col = 0;
        for(let type in types) {
            let blockerButton = new BlockerButton(this.game, {x: 64 * col, y: 32}, types[type]);
            this.add(blockerButton);
            col += 1;
        }

        this.fixedToCamera = true;

        this.game.stage.addChild(this);
    }

}

export default Market;