
class BlockerButton extends Phaser.Button {

    constructor(game, position, blockerType) {
        super(game, position.x, position.y, blockerType);
        this.game = game;
        this.blockerType = blockerType;
        this.onInputDown.add(this._selectBlocker, this);
    }

    update() {
        if (this.game.inventoryManager.selectedBlocker == this.blockerType) {
            // show selected
        } else {
            // show unselected
        }
    }

    _selectBlocker() {
        this.game.inventoryManager.selectBlocker(this.blockerType);
    }
}

export default BlockerButton;