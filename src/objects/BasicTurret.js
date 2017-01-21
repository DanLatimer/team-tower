class BasicTurret extends Phaser.Sprite {

	constructor(game, spawn) {
		super(game, spawn.x, spawn.y, 'basicTurret');
		this.game = game;

		this.anchor.setTo(0.5, 0.5);
		this.rotateSpeed = 3;
		this.game.stage.addChild(this);
	}

	update() {
		this.angle += this.rotateSpeed;
	}

	move(x, y) {
		this.x = x;
		this.y = y;
	}
}

export default BasicTurret;