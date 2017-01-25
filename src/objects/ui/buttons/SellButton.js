import Button from './Button';

class SellButton extends Button {
    constructor(game, position, cell) {
        super(game, position, 'sell', {x: 15, y:15});
        this.cell = cell;
    }

    update() {

    }

    onClick() {
        const cell = this.cell;
        const game = this.game;

        setTimeout(() => {
            if (cell.contents === null || cell.contents === undefined) {
                return;
            }
            game.inventoryManager.sell(cell.contents);
            cell.destroyContents();
        }, 500);
    }
}

export default SellButton;