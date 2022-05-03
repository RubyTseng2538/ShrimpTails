class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('bg', './assets/seabackground.png');
        this.load.audio('bg_music', './assets/Background_Music_1.wav');
        this.load.audio('chomp', './assets/Chomp.wav');
        this.load.audio('fishing', './assets/Fishing.wav');
        this.load.audio('trash', './assets/Trash_Short.wav');
        this.load.audio('shock', './assets/Shock.wav');
    }

    create(){
        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        let music = this.sound.add('bg_music', musicConfig);
        music.play();
        let menuConfig = {
            fontFamily: 'monospace',
            fontSize: '28px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ↑↓ arrows to control the shrimp', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize+borderPadding, 'Press P to start', menuConfig).setOrigin(0.5);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyP)){
            this.scene.start("playScene");
        }
    }
}