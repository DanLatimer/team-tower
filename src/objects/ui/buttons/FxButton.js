import Button from './Button';

class FxButton extends Button {
    constructor(game, position) {
        super(game, position, 'fx_icon', {x: 30, y: 30});
        this.isMuted = false;
    }

    update() {

    }

    onClick() {
        this.isMuted = !this.isMuted;

        var sprite = this.isMuted ? 'no_fx_icon' : 'fx_icon';
        this.loadTexture(sprite, 0);

        this.game.audioManager.muteFxVolume(this.isMuted);
    }
}

export default FxButton;