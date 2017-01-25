import PF from 'pathfinding';
import {Colors} from 'colors';

class AudioManager {
    constructor(game) {
        this.game = game;

        this.currentFxVolume = 1;
        this.isFxMuted = false;
        this.currentMusicVolume = 1;
        this.isMusicMuted = false;
    }

    setup() {

    }

    update() {

    }

    destroy() {

    }

    playSoundEffect(name, marker) {
        this.game.audio.fx[name].play(marker);
    }

    setMusicVolume(volume) {
        this.currentMusicVolume = volume;
        this._updateMusicVolume();
    }

    muteMusicVolume(isMuted) {
        this.isMusicMuted = isMuted;
        this._updateMusicVolume();
    }

    _updateMusicVolume() {
        Object.values(this.game.audio.music)
            .forEach(music => music.volume = this.isMusicMuted ? 0 : this.currentMusicVolume);   
    }

    setFxVolume(volume) {
        this.currentFxVolume = volume;
        this._updateFxVolume();
    }

    muteFxVolume(isMuted) {
        this.isFxMuted = isMuted;
        this._updateFxVolume();
    }

    _updateFxVolume() {
        Object.values(this.game.audio.fx)
            .forEach(fx => fx.volume = this.isFxMuted ? 0 : this.currentFxVolume);
    }
}

export default AudioManager;