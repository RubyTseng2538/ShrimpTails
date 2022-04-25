class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        thid.load.image('bg', './assets/seabackground.jpg');
    }

    create(){
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }
    update(){
        this.bg.tilePositionX -= game.config.gameStartSpeed;
    }
}