import BitmapText from '../BitmapText';
import SpeedButton from './SpeedButton';
import WaveManager from '../../managers/WaveManager';

class HUD extends Phaser.Group {

    constructor(game) {
        super(game, null, 'market');
        this.game = game;

        this.gameName = new BitmapText(game, 5, 5, 'Murmuring Waters TD');
        this.healthView = new BitmapText(game, 40, 45, this.getHealthViewText());
        this.coinsView = new BitmapText(game, 220, 45, this.getCoinsViewText());

        this.x = 50;

        Object.values(WaveManager.SPEEDS).forEach((speed, index) => {
            this.add(new SpeedButton(this.game, {x: 540 + (index * 64 + 8), y: 20}, speed));
        });

        this.game.stage.addChild(this);
    }

    update() {
        this.healthView.setText(this.getHealthViewText());
        this.coinsView.setText(this.getCoinsViewText());
    }

    getCoinsViewText() {
        return `Coins: ${this.game.inventoryManager.coins}`;
    }

    getHealthViewText() {
        return `Health: ${this.game.inventoryManager.health}`;
    }
}

export default HUD;