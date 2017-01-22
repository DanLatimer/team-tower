class GameOverState extends Phaser.State {
    constructor() {
        super(...arguments);
        this.win = false;
    }

    create() {
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };

        const gameOverStateSprite = this.win ? 'youWin' : 'youLose';

        var s = this.add.sprite(center.x, center.y, gameOverStateSprite);
        s.anchor.setTo(0.5, 0.5);
        this.stage.backgroundColor = "#383838";
    }
}

export default GameOverState;