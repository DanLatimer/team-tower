import Button from './Button';

function getSprite(isMuted) {
    return isMuted ? 'no_music_icon' : 'music_icon';
}

class MusicButton extends Button {
    constructor(game, position) {
        const isMuted = game.audioManager.isMusicMuted;
        super(game, position, getSprite(isMuted), {x: 30, y: 30});
        this.isMuted = isMuted;
    }

    update() {

    }

    onClick() {
        this.isMuted = !this.isMuted;

        this.loadTexture(getSprite(this.isMuted), 0);

        this.game.audioManager.muteMusicVolume(this.isMuted);
    }
}

export default MusicButton;