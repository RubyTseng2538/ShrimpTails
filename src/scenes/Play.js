class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('bg', './assets/seabackground.png');
        this.load.image('fg', './assets/seaweed.png');
        this.load.image('shrimp', './assets/shrimp.png');
        this.load.image('rock', './assets/rock.png');
        this.load.image('eel', './assets/eel.png');
        this.load.image('bag', './assets/rock.png');
        // load animations
        this.load.spritesheet('shrimpswim', './assets/shrimpanimated.png',
                    {frameWidth: 100, frameHeight: 75, startFrame: 0, endFrame: 1});
        this.load.spritesheet('eelwiggle', './assets/eelanimated.png', 
                    {frameWidth: 70, frameHeight: 200, startFrame: 0, endFrame: 1});
    }

    create(){
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);
        this.fg = this.add.tileSprite(0, 0, 640, 480, 'fg').setOrigin(0, 0); // seaweed
        // set up animations
        this.anims.create({
            key: 'shrimpmove',
            frames: this.anims.generateFrameNumbers('shrimpswim', {start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'eelmove',
            frames: this.anims.generateFrameNumbers('eelwiggle', {start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        
        this.pShrimp = new Shrimp(this, game.config.width-borderPadding-borderUISize, game.config.height/2, 'shrimp').setOrigin(1, 0);
        this.rockObs = new Obstacle(this, 0, game.config.height-borderUISize-borderPadding-30, 'rock').setOrigin(0, 0);
        this.eel = new Eel(this, -100, game.config.height, 'eel').setOrigin(0, 0);
        this.rod = new Rod(this, -200, -250, 'eel').setOrigin(0, 0);
        this.bag = new Bag(this, -300, 0, 'bag').setOrigin(0, 0);
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
            game.config.point = this.point;
            this.scene.start("creditScene");
        }
        if(!this.gameOver){
            this.bg.tilePositionX -= this.speed;
            this.fg.tilePositionX -= this.speed * 2;
            this.pShrimp.update();
            this.rockObs.update();
            this.bag.update();
            this.eel.update();
            this.rod.update();
            this.time += 50;
            if(this.time % 10000 == 0){
                this.point +=10;
                this.scoreLeft.text = this.point;
            }
            if(this.time %200000 == 0 && this.time<1000000){
                this.speed += 1;
                this.pShrimp.moveSpeed += 1;
                this.rockObs.moveSpeed += 1;
                this.eel.moveSpeed += 1;
                this.bag.moveSpeed += 1;
            }
        }
        if(this.checkCollision(this.pShrimp, this.rockObs)){
            this.gameOver = true;
        }if(this.checkCollision(this.pShrimp, this.eel)){
            this.sound.play('chomp');
            this.gameOver = true;
        }if(this.checkCollision(this.pShrimp, this.bag)){
            this.sound.play('trash');
            this.gameOver = true;
        }if(this.checkCollision(this.pShrimp, this.rod)){
            this.sound.play('fishing');
            this.gameOver = true;
        }
        if(this.checkAdj(this.eel, this.rockObs)){
            this.rockObs.reset();
        }/*if(this.checkAdj(this.eel, this.bag)){
            this.eel.reset();
        }if(this.checkAdj(this.bag, this.rockObs)){
            this.rockObs.reset();
        }*/
        
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
    checkAdj(shrimp, obs){
        if(shrimp.x<obs.x+obs.width +50&&
           shrimp.x + shrimp.width +50 > obs.x &&
           shrimp.y < obs.y + obs.height +50&&
           shrimp.height + shrimp.y +50> obs.y){
               return true;
        }else{
            return false;
        }
    }
}