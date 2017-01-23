import {Colors} from 'colors';
import SellButton from 'objects/ui/SellButton';

class RangedBlockerCursor extends Phaser.Group {

    constructor(game, blocker, cell, purchased) {
        super(game, null, 'cursor_group');
        this.game = game;
        this.blocker = blocker;

        if (blocker.range) {
            this.graphics = this.game.add.graphics(0, 0);

            let rangeColors = purchased ? Colors.purchasedRange : Colors.prospectiveRange;

            this.graphics.lineStyle(1, rangeColors.outline, 1);
            this.graphics.beginFill(rangeColors.fill, 0.14);
            this.graphics.drawCircle(this.blocker.centerX, this.blocker.centerY, (this.blocker.range * 2) - 30);
            this.add(this.graphics);
        }
        
        this.add(this.blocker);    

        if (purchased) {
            this.sellButton = new SellButton(this.game, {x: this.x-20, y: this.x-20}, cell);
            this.add(this.sellButton);    
        }

        this.game.stage.addChild(this);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default RangedBlockerCursor;