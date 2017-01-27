import GridManager from 'managers/GridManager';
import InventoryManager from 'managers/InventoryManager';
import GUIManager from 'managers/GUIManager';
import WaveManager from 'managers/WaveManager';
import AudioManager from 'managers/AudioManager';
import CursorManager from 'managers/CursorManager';

import IntroScreen from 'states/IntroScreen';
import GameState from 'states/GameState';
import GameOverState from 'states/GameOverState';

class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, 'content', null);

        this.gridManager = new GridManager(this);
        this.inventoryManager = new InventoryManager(this);
        this.guiManager = new GUIManager(this);
        this.waveManager = new WaveManager(this);
        this.audioManager = new AudioManager(this);
        this.cursorManager = new CursorManager(this);

        this.state.add('IntroScreen', IntroScreen, false);
        this.state.add('GameState', GameState, false);
        this.state.add('GameOverState', GameOverState, false);
        this.state.start('IntroScreen');
    }

    create() {
        this.stage.backgroundColor = "#383838";
    }
}

new Game();
