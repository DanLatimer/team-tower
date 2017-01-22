
class BlockerButton extends Phaser.Button {

    constructor(game, position, blockerType) {
        super(game, position.x, position.y, blockerType);
        this.game = game;
        this.blockerType = blockerType;
        this.onInputDown.add(this._selectBlocker, this);
        this.selected = false;
        this.alpha = 0.5;
    }

    update() {
        if (this.game.inventoryManager.selectedBlocker == this.blockerType) {
            // show selected
            this.alpha = 1;
        } else {
            // show unselected
            this.alpha = 0.5;
        }
    }

    _selectBlocker() {
        this.game.inventoryManager.selectBlocker(this.blockerType);
    }
}

export default BlockerButton;