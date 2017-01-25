class Tower extends Phaser.Sprite {
    static get cost() {
        throw {name : "NotImplementedError", message : "subclass must define this"}; 
    }
    static get sprite() {
        throw {name : "NotImplementedError", message : "subclass must define this"};
    }
    static get name() {
        throw {name : "NotImplementedError", message : "subclass must define this"};
    }

    constructor(game, spawn, isCursor, sprite) {
        super(game, spawn.x, spawn.y, sprite);
        this.game = game;
        this.isCursor = isCursor;
        this.speed = 1;

        this.anchor.setTo(0.5, 0.5);

        if (isCursor) {
            this.alpha = 0.3;
        }

        this.game.stage.addChild(this);
    }

    update() {
        super.update(...arguments);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    sell() {
        this.game.inventoryManager.sell(this.constructor.cost);
    }
}

export default Tower;