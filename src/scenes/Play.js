class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('bg', './assets/seabackground.jpg');
        this.load.image('shrimp', './assets/shrimp.png');
        this.load.image('rock', './assets/rock.png');
    }

    create(){
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);
        this.pShrimp = new Shrimp(this, game.config.width-borderPadding-borderUISize, game.config.height/2, 'shrimp').setOrigin(1, 0);
        this.rockObs = new Obstacle(this, 0, game.config.height-borderUISize-borderPadding-30, 'rock').setOrigin(0, 0);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.gameOver = false;
        this.speed = 0.5;
        this.point = 0;
        this.time = 0;

        let scoreConfig = {
            fontFamily: 'monospace',
            fontSize: '28px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize+borderPadding, borderUISize+borderPadding*2, this.point, scoreConfig);

        if(this.gameOver){
            //gameover screen
        }
    }
    update(){
        if(this.gameOver){
            this.scene.start("menuScene");
        }
        if(!this.gameOver){
            this.bg.tilePositionX -= this.speed;
            this.pShrimp.update();
            this.rockObs.update();
            this.time += 50;
            if(this.time % 10000 == 0){
                this.point +=10;
                this.scoreLeft.text = this.point;
            }
        }
        if(this.checkCollision(this.pShrimp, this.rockObs)){
            this.gameOver = true;
        }
    }

    checkCollision(shrimp, obs){
        if(shrimp.x<obs.x+obs.width &&
           shrimp.x + shrimp.width > obs.x &&
           shrimp.y < obs.y + obs.height &&
           shrimp.height + shrimp.y > obs.y){
               return true;
        }else{
            return false;
        }
    }
}