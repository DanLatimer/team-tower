import InventoryManager from '../../managers/InventoryManager';
import TowerButton from './buttons/TowerButton';
import BitmapText from '../BitmapText';

class Market extends Phaser.Group {
    constructor(game) {
        super(game, null, 'market');
        this.game = game;

        this.inventoryButtons = InventoryManager.Inventory
            .map((inventoryItem, index) => new TowerButton(this.game, {x: 0, y: 64 * index}, inventoryItem));
        this.inventoryButtons.forEach(button => this.add(button));

        const buttonTexts = InventoryManager.Inventory
            .map((inventoryItem, index) => new BitmapText(this.game, 65, (64 * index) + 20, this.getInventoryText(inventoryItem), 20));
        buttonTexts.forEach(text => this.add(text.bmpText));

        this.x = this.game.world.right + 18;
        this.y = this.game.world.top + 100;

        this.game.stage.addChild(this);
    }

    getInventoryText(tower) {
        return `${tower.name} ($${tower.cost})`;
    }

    update() {
        this.inventoryButtons.forEach(button => button.update());
    }
}

export default Market;