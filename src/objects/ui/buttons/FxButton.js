import Button from './Button';

function getSprite(isMuted) {
    return isMuted ? 'no_fx_icon' : 'fx_icon';
}

class FxButton extends Button {
    constructor(game, position) {
        const isMuted = game.audioManager.isFxMuted;
        super(game, position, getSprite(isMuted), {x: 30, y: 30});
        this.isMuted = isMuted;
    }

    update() {

    }

    onClick() {
        this.isMuted = !this.isMuted;

        this.loadTexture(getSprite(this.isMuted), 0);

        this.game.audioManager.muteFxVolume(this.isMuted);
    }
}

export default FxButton;