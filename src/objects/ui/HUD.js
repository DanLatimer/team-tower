import BitmapText from '../BitmapText';
import SpeedButton from './buttons/SpeedButton';
import FxButton from './buttons/FxButton';
import MusicButton from './buttons/MusicButton';
import WaveManager from '../../managers/WaveManager';

class HUD extends Phaser.Group {

    constructor(game) {
        super(game, null, 'hud');
        this.game = game;

        this.gameName = new BitmapText(game, 5, 5, 'Murmuring Waters TD');
        this.healthView = new BitmapText(game, 40, 45, this.getHealthViewText());
        this.coinsView = new BitmapText(game, 220, 45, this.getCoinsViewText());

        this.x = 50;

        Object.values(WaveManager.SPEEDS).forEach((speed, index) => {
            this.add(new SpeedButton(this.game, {x: 350 + (index * (30 + 10)), y: 60}, speed));
        });

        this.add(new FxButton(this.game, {x: 470, y: 60}));
        this.add(new MusicButton(this.game, {x: 510, y: 60}));

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