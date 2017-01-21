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

        this.game.guiManager.setup();
        this.game.waveManager.setup();
        this.game.inputManager.setup();
    }

    update() {
        this.game.inputManager.update();
        this.game.collisionManager.update();
        this.game.guiManager.update();
        this.game.waveManager.update();
    }

	buyBasicTurret() {
		var {x, y} = this.input.activePointer;
		console.log(`clicked ${x}, ${y}`);
		var turret = new BasicTurret(this.game, {x, y});
	}
}

export default GameState;
