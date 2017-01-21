import RainbowText from '../RainbowText';

class HUD extends Phaser.Group {

    constructor(game) {
        super(game, null, 'market');
        this.game = game;

        this.healthView = new RainbowText(game, 0, 15, this.getHealthViewText());
        this.coinsView = new RainbowText(game, 250, 15, this.getCoinsViewText());
        this.add(this.healthView);
        this.add(this.coinsView);

        this.x = 50;

        this.game.stage.addChild(this);
    }

    update() {
        if (this.healthView.text != this.getHealthViewText()) {
            this.healthView.setText(this.getHealthViewText());
        }
        if (this.coinsView.text != this.getCoinsViewText()) {
            this.coinsView.setText(this.getCoinsViewText());
        }
    }

    getCoinsViewText() {
        return `Coins: ${this.game.inventoryManager.coins}`;
    }

    getHealthViewText() {
        return `Health: ${this.game.inventoryManager.health}`;
    }
}

export default HUD;