import {Resources} from 'resources';

class GameState extends Phaser.State {
    create() {
        this.game.audio = {fx: {}, music: {}};

        Resources.audios.music
            .map(audio => this.game.add.audio(audio.name))
            .forEach(audioGameObject => this.game.audio.music[audioGameObject.name] = audioGameObject);

        Resources.audios.fx
            .map(audio => {
                const audioHandle = this.game.add.audio(audio.name);

                if (audio.marker) {
                    const {name, start, duration} = audio.marker;
                    const markerHandle = audioHandle.addMarker(name, start, duration);
                }

                return audioHandle;
            })
            .forEach(audioGameObject => this.game.audio.fx[audioGameObject.name] = audioGameObject);

        const audios = Object.assign({}, this.game.audio.fx, this.game.audio.music);
        this.game.sound.setDecodedCallback(audios, this.setup, this);

        this.stage.backgroundColor = "#383838";
    }

    setup() {
        this.game.audioManager.setup();
        this.game.gridManager.setup();
        this.game.guiManager.setup();
        this.game.waveManager.setup();
        this.game.inventoryManager.setup();
        this.game.cursorManager.setup();
        this.initialized = true;

        this.game.audio.music.ambiance.loop = true;
        this.game.audio.music.ambiance.play();
    }

    update() {
        if (!this.initialized) {
            return;
        }
        this.game.gridManager.update();
        this.game.guiManager.update();
        this.game.waveManager.update();
        this.game.inventoryManager.update();
    }

    destroy() {
        this.initialized = false;
        this.game.waveManager.destroy();
        this.game.guiManager.destroy();
        this.game.gridManager.destroy();
    }
}

export default GameState;
