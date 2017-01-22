class GameState extends Phaser.State {
    constructor() {
        this.win = false;
    }

    create() {
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };

        debugger;
        const gameOverStateSprite = this.game.win ? 'youwin' : 'youlose';

        var s = this.add.sprite(center.x, center.y, 'youwin');
        s.anchor.setTo(0.5, 0.5);
        //s.fixedToCamera = true;
    }
}

export default GameState;


/**


MainGame.GameOverState = function(game){
    
    this.win = false;
};

MainGame.GameOverState.prototype = {

    create: function(){
        if(this.win){

            var s = this.add.sprite(1024/2, 768/2, 'youwin');
            s.anchor.setTo(0.5, 0.5);
            s.fixedToCamera = true;
        }
        else{
            var s = this.add.sprite(1024/2, 768/2, 'youlose');
            s.anchor.setTo(0.5, 0.5);
            s.fixedToCamera = true;
        }

    },

    update: function(){

    }
};

*/