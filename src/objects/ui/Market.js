import InventoryManager from '../../managers/InventoryManager';
import BlockerButton from './BlockerButton';
import BitmapText from '../BitmapText';

class Market extends Phaser.Group {

    constructor(game) {
        super(game, null, 'market');
        this.game = game;

        let types = InventoryManager.BLOCKER_TYPES;
        let row = 0;
        for(let type in types) {
            const blockerButton = new BlockerButton(this.game, {x: 0, y: 64 * row}, types[type]);
            this.add(blockerButton);
            const text = new BitmapText(this.game, 65, (64 * row) + 20, this.getBlockerText(type), 20);
            this.add(text.bmpText);
            row += 1;
        }

        this.x = this.game.world.right + 18;
        this.y = this.game.world.top;

        this.game.stage.addChild(this);
    }

    getBlockerText(type) {
        let blockerInfo = InventoryManager[type];
        return (blockerInfo) ? `${blockerInfo.name} ($${blockerInfo.cost})`  : "Unknown";
    }

    update() {
        
    }

}

export default Market;