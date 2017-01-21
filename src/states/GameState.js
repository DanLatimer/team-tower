import RainbowText from 'objects/RainbowText';
import BasicTurret from 'objects/BasicTurret';
import {Resources} from 'resources';

class GameState extends Phaser.State {
	preload() {
		debugger;
		// IMAGES
		Resources.images
			.forEach(image => this.game.load.image(image.name, image.path));

	}

	create() {
		debugger;
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		//let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");

		var turret = new BasicTurret(this.game, {x: 200, y: 200});
		//text.anchor.set(0.5);
	}

}

export default GameState;
