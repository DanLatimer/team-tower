import {Resources} from 'resources';

class GameState extends Phaser.State {
	preload() {
        Resources.images
            .forEach(image => this.game.load.image(image.name, image.path));
        Resources.fonts
            .forEach(font => this.game.load.bitmapFont(font.name, font.png, font.xml));
        Resources.spriteSheets
            .forEach(sheet => this.game.load.spritesheet(sheet.name, sheet.path, sheet.width, sheet.height, sheet.frames));
        Resources.audios.fx
            .forEach(audio => this.game.load.audio(audio.name, audio.path));
        Resources.audios.music
            .forEach(audio => this.game.load.audio(audio.name, audio.path));
	}

	create() {
        this.game.audio = {fx: {}, music: {}};

        Resources.audios.music
            .map(audio => this.game.add.audio(audio.name))
            .forEach(audioGameObject => this.game.audio.music[audioGameObject.name] = audioGameObject);

        Resources.audios.fx
            .map(audio => this.game.add.audio(audio.name))
            .forEach(audioGameObject => this.game.audio.fx[audioGameObject.name] = audioGameObject);

        const audios = Object.assign({}, this.game.audio.fx, this.game.audio.music);
        this.game.sound.setDecodedCallback(audios, this.setup, this);
    }

    setup() {
        this.game.gridManager.setup();
        this.game.guiManager.setup();
        this.game.waveManager.setup();
        this.game.inputManager.setup();
        this.game.inventoryManager.setup(20, 100);
        this.initialized = true;

        this.game.audio.music.ambiance.loop = true;
        this.game.audio.music.ambiance.play();
    }

    update() {
	    if (!this.initialized) {
	        return;
        }
        this.game.inputManager.update();
        this.game.gridManager.update();
        this.game.guiManager.update();
        this.game.waveManager.update();
        this.game.inventoryManager.update();
    }
}

export default GameState;
