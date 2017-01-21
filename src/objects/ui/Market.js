import InventoryManager from '../../managers/InventoryManager';
import BlockerButton from './BlockerButton'

class Market extends Phaser.Group {

    constructor(game) {
        super(game, null, 'market');
        this.game = game;

        let types = InventoryManager.BLOCKER_TYPES;
        let row = 0;
        for(let type in types) {
            let blockerButton = new BlockerButton(this.game, {x: 0, y: 64 * row}, types[type]);
            this.add(blockerButton);
            row += 1;
        }

        this.x = this.game.world.right + 25;
        this.y = this.game.world.top;

        this.game.stage.addChild(this);
    }

}

export default Market;