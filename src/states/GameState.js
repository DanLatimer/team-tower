
import BasicTurret from 'objects/BasicTurret';
import {Resources} from 'resources';

class GameState extends Phaser.State {
	preload() {
        // IMAGES
        Resources.images
            .forEach(image => this. game.load.image(image.name, image.path));
	}

	create() {
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        var turret = new BasicTurret(this.game, {x: center.x, y: center.y});

        this.game.gridManager.setup();
        this.game.guiManager.setup();
        this.game.waveManager.setup();
        this.game.inputManager.setup(); 
        this.game.inventoryManager.setup(100);
    }

    update() {
        this.game.inputManager.update();
        this.game.gridManager.update();
        this.game.guiManager.update();
        this.game.waveManager.update();
        this.game.inventoryManager.update();
    }
}

export default GameState;
