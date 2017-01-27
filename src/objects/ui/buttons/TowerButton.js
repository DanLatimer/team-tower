import Button from './Button';

class TowerButtonButton extends Button {
    constructor(game, position, inventoryItem) {
        super(game, position, inventoryItem.sprite);

        this.inventoryItem = inventoryItem;
        this.selected = false;
        this.alpha = 0.5;
    }

    update() {
        var isSelected = this.game.inventoryManager.getSelectedInventoryItem() === this.inventoryItem;
        this.alpha = isSelected ? 1 : 0.5; 
    }

    onClick() {
        this.game.inventoryManager.selectTower(this.inventoryItem);
    }
}

export default TowerButtonButton;