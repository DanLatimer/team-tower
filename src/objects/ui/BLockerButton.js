
class BlockerButton extends Phaser.Button {

    constructor(game, position, item_type) {
        super(game, position.x, position.y, item_type);
        this.game = game;
        this.item_type = item_type;
        this.onInputDown.add(this._selectBlocker, this);
    }

    update() {
        if (this.game.inventoryManager.selectedItem == this.item_type) {
            // show selected
        } else {
            // show unselected
        }
    }

    _selectBlocker() {
        this.game.inventoryManager.selectBlocker(this.item_type);
    }
}

export default BlockerButton;