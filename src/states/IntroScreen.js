import {Resources} from 'resources';
import {Difficulties} from 'managers/WaveManager';

const difficultyTextHeight = 50;

class IntroScreen extends Phaser.State {
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
        let center = {x: this.game.world.centerX, y: this.game.world.centerY};
        this.stage.backgroundColor = "#383838";

        const topY = (this.game.world.centerY - (Difficulties.length * difficultyTextHeight / 2));

        this.add.bitmapText(center.x - 180, topY + (difficultyTextHeight * -2), 'desyrel', 'Murmuring Waters TD');

        Difficulties.forEach((difficulty, index) => {
            const bitmapText = this.add.bitmapText(center.x - 75, topY + (difficultyTextHeight * index), 'desyrel', difficulty.name);
            bitmapText.inputEnabled = true;
            bitmapText.events.onInputUp.add(() => {
                this.game.inventoryManager.lives = difficulty.lives;
                this.game.inventoryManager.coins = difficulty.coins;
                this.game.waveManager.startFirstRound(difficulty);

                this.game.state.start('GameState');
            });
        });
    }
}

export default IntroScreen;