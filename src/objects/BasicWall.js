import InventoryManager from 'managers/InventoryManager';

class BasicWall extends Phaser.Sprite {

    constructor(game, spawn, isCursor) {
        super(game, spawn.x, spawn.y, 'basicWall');
        this.game = game;

        this.anchor.setTo(0.5, 0.5);
        this.rotateSpeed = 3;
        this.game.stage.addChild(this);
        this.type = InventoryManager.BASIC_WALL;

        if (isCursor) {
            this.alpha = 0.3;
        }
    }

    update() {
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    setSpeed() {
        
    }

    sell() {
        this.InventoryManager.sell(this, this.type);
    }
}

export default BasicWall;