import RainbowText from '../RainbowText';

class HUD extends Phaser.Group {

    constructor(game) {
        super(game, null, 'market');
        this.game = game;

        this.coinsView = new RainbowText(game, 0, 15, this.getCoinsViewText());
        this.healthView = new RainbowText(game, 300, 15, this.getHealthViewText());
        this.add(this.coinsView);
        this.add(this.healthView);

        this.x = 50;

        this.game.stage.addChild(this);
    }

    update() {
        if (this.coinsView.text != this.getCoinsViewText()) {
            this.coinsView.setText(this.getCoinsViewText());
        }
        if (this.healthView.text != this.getHealthViewText()) {
            this.healthView.setText(this.getHealthViewText());
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