
class RangedBlockerCursor extends Phaser.Group {

    constructor(game, blocker) {
        super(game, null, 'cursor_group');
        this.game = game;

        let graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(1, 0xff041c, 1);
        graphics.beginFill(0xff0044, 0.5);
        graphics.drawCircle(blocker.centerX, blocker.centerY, (blocker.range * 2) - 30);
        this.add(graphics);
        this.add(blocker);

        this.game.stage.addChild(this);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default RangedBlockerCursor;