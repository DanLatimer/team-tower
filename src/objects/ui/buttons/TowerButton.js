import Button from './Button';

class TowerButtonButton extends Button {
    constructor(game, position, towerClass) {
        super(game, position, towerClass.sprite);

        this.towerClass = towerClass;
        this.selected = false;
        this.alpha = 0.5;
    }

    update() {
        var isSelected = this.game.inventoryManager.getSelectedTowerClass() === this.towerClass;
        this.alpha = isSelected ? 1 : 0.5; 
    }

    onClick() {
        this.game.inventoryManager.selectTower(this.towerClass);
    }
}

export default TowerButtonButton;