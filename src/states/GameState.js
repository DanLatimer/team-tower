import RainbowText from 'objects/RainbowText';
import BasicTurret from 'objects/BasicTurret';
import {Resources} from 'resources';

class GameState extends Phaser.State {
	preload() {
		// IMAGES
		Resources.images
			.forEach(image => this.game.load.image(image.name, image.path));
	}

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		var turret = new BasicTurret(this.game, {x: 200, y: 200});
	}
}

export default GameState;
