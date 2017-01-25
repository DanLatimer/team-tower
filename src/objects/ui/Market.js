import InventoryManager from '../../managers/InventoryManager';
import BlockerButton from './buttons/BlockerButton';
import BitmapText from '../BitmapText';

class Market extends Phaser.Group {

    constructor(game) {
        super(game, null, 'market');
        this.game = game;

        let types = InventoryManager.BLOCKER_TYPES;
        let row = 0;
        this.blockerButtons = [];
        for(let type in types) {
            const blockerButton = new BlockerButton(this.game, {x: 0, y: 64 * row}, types[type]);
            this.blockerButtons.push(blockerButton);
            this.add(blockerButton);
            const text = new BitmapText(this.game, 65, (64 * row) + 20, this.getBlockerText(type), 20);
            this.add(text.bmpText);
            row += 1;
        }

        this.x = this.game.world.right + 18;
        this.y = this.game.world.top + 100;

        this.game.stage.addChild(this);
    }

    getBlockerText(type) {
        let blockerInfo = InventoryManager[type];
        return (blockerInfo) ? `${blockerInfo.name} ($${blockerInfo.cost})`  : "Unknown";
    }

    update() {
        this.blockerButtons.forEach(blocker => { blocker.update(); });
    }

}

export default Market;