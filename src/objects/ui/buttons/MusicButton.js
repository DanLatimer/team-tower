import Button from './Button';

class MusicButton extends Button {
    constructor(game, position) {
        super(game, position, 'music_icon', {x: 30, y: 30});
        this.isMuted = false;
    }

    update() {

    }

    onClick() {
        this.isMuted = !this.isMuted;

        var sprite = this.isMuted ? 'no_music_icon' : 'music_icon';
        this.loadTexture(sprite, 0);

        this.game.audioManager.muteMusicVolume(this.isMuted);
    }
}

export default MusicButton;