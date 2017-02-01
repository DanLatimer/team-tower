import {getScale} from './Scaler';

const StatusSprites = {
    SLOW: 'slow_status',
    CRIT: 'crit_status',
}

const SpriteSize = 15;
const Margin = 2;
const HealthBarHeight = 16;

class StatusGroup extends Phaser.Group {
    constructor(game, minion) {
        super(game, null, 'status_group');
        this.game = game;
        this.minion = minion;

        this.statusSprites = [];

        this.game.stage.addChild(this);
    }

    move(x, y) {
        this.x = x + 4;
        this.y = y - HealthBarHeight + Margin;
        this._updatePositions();
    }

    addSlowStatus() {
        if (this._alreadyHasStatus(StatusSprites.SLOW)) {
            return;
        }
        this._addStatus(StatusSprites.SLOW);
    }

    setVisible(isVisible) {
        this.visible = isVisible;
        if (this.statusSprites) {
            this.statusSprites.forEach(sprite => sprite.visible = isVisible);    
        }
    }

    _alreadyHasStatus(spriteName) {
        return this.statusSprites.some(sprite => sprite.spriteName === spriteName);
    }

    _addStatus(spriteName) {
        const sprite = new Status(this.game, spriteName);
        this.statusSprites.push(sprite);
        this.add(sprite);
        this._updatePositions();
    }

    _updatePositions() {
        this.statusSprites.forEach((sprite, index) => {
            debugger;
            sprite.x = 0;
            sprite.y = (SpriteSize + Margin) * index;
        });
    }
}

class Status extends Phaser.Sprite {
    constructor(game, sprite) {
        super(game, 0, 0, sprite);
        this.game = game;
        this.spriteName = sprite;
        this.scale = getScale(this.width, this.height, SpriteSize, SpriteSize);
        this.animations.add('animate', [0, 1, 2, 3, 4, 5, 0]);  
        this.animations.play('animate', 12, true);    
        this.game.stage.addChild(this);
    }
}

export default StatusGroup;