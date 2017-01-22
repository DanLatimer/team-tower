
class RangedBlockerCursor extends Phaser.Group {

    constructor(game, blocker, purchased) {
        super(game, null, 'cursor_group');
        this.game = game;
        this.blocker = blocker;

        this.graphics = this.game.add.graphics(0, 0);
        let fillColor = 0xff0044;
        let lineColor = 0xff041c;
        if (purchased) {
            fillColor = 0x91908B;
            lineColor = 0x000000;
        }
        this.graphics.lineStyle(1, lineColor, 1);
        this.graphics.beginFill(fillColor, 0.5);
        this.graphics.drawCircle(blocker.centerX, blocker.centerY, (blocker.range * 2) - 30);
        this.add(this.graphics);
        this.add(this.blocker);

        this.game.stage.addChild(this);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default RangedBlockerCursor;