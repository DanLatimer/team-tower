import Market from '../objects/ui/Market';

class GUIManager {

    constructor(game) {
        this.game = game;
    }

    setup() {
        this.market = new Market(this.game);
    }

    update() {
        this.market.update();
    }
}

export default GUIManager;