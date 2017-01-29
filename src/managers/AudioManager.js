import PF from 'pathfinding';
import {Colors} from 'colors';

class AudioManager {
    constructor(game) {
        this.game = game;
    }

    setup() {
        this.currentFxVolume = 1;
        this.currentMusicVolume = 1;
        this.isFxMuted = localStorage.getItem("isFxMuted") === "true" || false;
        this.isMusicMuted = localStorage.getItem("isMusicMuted") === "true" || false;

        this._updateMusicVolume();
        this._updateFxVolume();
    }

    update() {

    }

    destroy() {

    }

    playSoundEffect(name, marker) {
        this.game.audio.fx[name].play(marker, 0, this._getFxVolume());
    }

    setMusicVolume(volume) {
        this.currentMusicVolume = volume;
        this._updateMusicVolume();
    }

    muteMusicVolume(isMuted) {
        localStorage.setItem("isMusicMuted", isMuted);

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
        localStorage.setItem("isFxMuted", isMuted);
        this.isFxMuted = isMuted;
        this._updateFxVolume();
    }

    _updateFxVolume() {
        Object.values(this.game.audio.fx)
            .forEach(fx => fx.volume = this._getFxVolume());
    }

    _getFxVolume() {
        return this.isFxMuted ? 0 : this.currentFxVolume;
    }
}

export default AudioManager;