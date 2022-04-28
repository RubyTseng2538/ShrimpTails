class Credit extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }
    preload(){
        this.load.image('bg', './assets/seabackground.jpg');
    }

    create(){
        let creditConfig = {
            fontFamily: 'monospace',
            fontSize: '28px',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixWidth: 0
        }
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/2-100, 'Game Over', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 -70, 'Your Score:'+game.config.point, creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 -30, 'Credit', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Design: Patrick Queiroz', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +30, 'Code: Ruby Tseng', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +60, 'Art: Emery Plyler', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +90, 'Music: Patrick Queiroz', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +130, 'Press R to restart', creditConfig).setOrigin(0.5);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.add.text(game.config.width/2, game.config.height/2 +160, 'Press M to menu', creditConfig).setOrigin(0.5);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }
    uprate(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("playScene");
        }if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene");
        }
    }
}