import Market from '../objects/ui/Market';
import HUD from '../objects/ui/HUD';

class GUIManager {

    constructor(game) {
        this.game = game;
    }

    setup() {
        this.market = new Market(this.game);
        this.hud = new HUD(this.game);
    }

    update() {
        this.market.update();
        this.hud.update();
    }
}

export default GUIManager;