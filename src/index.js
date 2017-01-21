import CollisionManager from 'managers/CollisionManager';
import InputManager from 'managers/InputManager';
import InventoryManager from 'managers/InventoryManager';
import GUIManager from 'managers/GUIManager';
import WaveManager from 'managers/WaveManager';
import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super(800, 600, Phaser.AUTO, 'content', null);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');

        this.collisionManager = new CollisionManager(this);
        this.inputManager = new InputManager(this);
        this.inventoryManager = new InventoryManager(this);
        this.guiManager = new GUIManager(this);
        this.waveManager = new WaveManager(this);
	}

}

new Game();
