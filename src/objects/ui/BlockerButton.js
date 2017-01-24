import Button from './Button';

class BlockerButton extends Button {
    constructor(game, position, blockerType) {
        super(game, position, blockerType);

        this.blockerType = blockerType;
        this.selected = false;
        this.alpha = 0.5;
    }

    update() {
        var isSelected = this.game.inventoryManager.selectedBlocker == this.blockerType;
        this.alpha = isSelected ? 1 : 0.5; 
    }

    onClick() {
        this.game.inventoryManager.selectBlocker(this.blockerType);
    }
}

export default BlockerButton;