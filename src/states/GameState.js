import CollisionManager from 'managers/CollisionManager';
import InputManager from 'managers/InputManager';
import InventoryManager from 'managers/InventoryManager';
import GUIManager from 'managers/GUIManager';
import WaveManager from 'managers/WaveManager';
import BasicTurret from 'objects/BasicTurret';
import {Resources} from 'resources';

class GameState extends Phaser.State {
	preload() {
        // IMAGES
        Resources.images
            .forEach(image => this.game.load.image(image.name, image.path));
	}

	create() {
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        var turret = new BasicTurret(this.game, {x: center.x, y: center.y});

        this.collisionManager = new CollisionManager(this.game);
        this.inputManager = new InputManager(this.game);
        this.inventoryManager = new InventoryManager(this.game);
        this.guiManager = new GUIManager(this.game);
        this.waveManager = new WaveManager(this.game);

        this.guiManager.setup();
        this.inputManager.setup();
        this.waveManager.setup();
    }

    update() {
        this.inputManager.update();
        this.collisionManager.update();
        this.guiManager.update();
        this.waveManager.update();
    }

}

export default GameState;
