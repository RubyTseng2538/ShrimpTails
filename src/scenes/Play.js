class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('bg', './assets/seabackground.png');
        this.load.image('shrimp', './assets/shrimp.png');
        this.load.image('fg', './assets/seaweed.png');
        this.load.image('fish', './assets/fish2.png');
        this.load.image('eel', './assets/eel.png');
        this.load.image('bag', './assets/plasticbag2.png');
        this.load.image('hook', './assets/hook2.png');
        // load animations
        this.load.spritesheet('shrimpswim', './assets/shrip.png',
                    {frameWidth: 100, frameHeight: 75, startFrame: 0, endFrame: 2});
        this.load.spritesheet('eelwiggle', './assets/eelanimated.png', 
                    {frameWidth: 128, frameHeight: 376, startFrame: 0, endFrame: 1});
        this.load.spritesheet('trashfloat', './assets/plasticbag.png', 
                    {frameWidth: 80, frameHeight: 89, startFrame: 0, endFrame: 1});
        this.load.spritesheet('hookup', './assets/hook.png', 
                    {frameWidth: 35, frameHeight: 250, startFrame: 0, endFrame: 1});
        this.load.spritesheet('fishswim', './assets/fish.png', 
                    {frameWidth: 180, frameHeight: 82, startFrame: 0, endFrame: 1});
        this.load.spritesheet('shrimpdie', './assets/shripdie.png', 
                    {frameWidth: 100, frameHeight: 75, startFrame: 0, endFrame: 7});
    }

    create(){
        let musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        let music = this.sound.add('bg_music', musicConfig);
        music.play();
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);
        this.fg = this.add.tileSprite(0, 0, 640, 480, 'fg').setOrigin(0, 0); // seaweed
        // set up animations
        this.anims.create({
            key: 'shrimpmove',
            frames: this.anims.generateFrameNumbers('shrimpswim', {start: 0, end: 2, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'eelmove',
            frames: this.anims.generateFrameNumbers('eelwiggle', {start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'trashmove',
            frames: this.anims.generateFrameNumbers('trashfloat', {start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'hookmove',
            frames: this.anims.generateFrameNumbers('hookup', {start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'fishmove',
            frames: this.anims.generateFrameNumbers('fishswim', {start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'shrimpdeath',
            frames: this.anims.generateFrameNumbers('shrimpdie', {start: 0, end: 7, first: 0}),
            frameRate: 9
        });

        this.pShrimp = new Shrimp(this, game.config.width-borderPadding-borderUISize, game.config.height/2, 'shrimp').setOrigin(1, 0);
        this.rockObs = new Obstacle(this, 0, 100, 'fish').setOrigin(0, 0);
        this.eel = new Eel(this, -100, game.config.height, 'eel').setOrigin(0, 0);
        this.rod = new Rod(this, -200, -250, 'hook').setOrigin(0, 0);
        this.bag = new Bag(this, -300, 0, 'bag').setOrigin(0, 0);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.gameOver = false;
        this.speed = 0.5;
        this.point = 0;
        this.time = 0;
        this.pause = 0;

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

        // if(this.gameOver){
        //     //gameover screen
        // }
    }
    update(){
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
                this.pShrimp.moveSpeed += 0.5;
                this.rockObs.moveSpeed += 0.5;
                this.eel.moveSpeed += 0.5;
                this.bag.moveSpeed += 0.5;
            }
        }
        if(this.checkCollision(this.pShrimp, this.rockObs)){
            this.sound.play('chomp');
            // this.shrimpDeath(this.pShrimp);
            this.gameOver = true;
        }if(this.checkCollision(this.pShrimp, this.eel)){
            this.sound.play('shock');
            // this.shrimpDeath(this.pShrimp);
            this.gameOver = true;
        }if(this.checkCollision(this.pShrimp, this.bag)){
            this.sound.play('trash');
            // this.shrimpDeath(this.pShrimp);
            this.gameOver = true;
        }if(this.checkCollision(this.pShrimp, this.rod)){
            this.sound.play('fishing');
            // this.shrimpDeath(this.pShrimp);
            this.gameOver = true;
        }
        
        /*if(this.checkAdj(this.eel, this.rockObs)){
            this.rockObs.reset();
        }if(this.checkAdj(this.eel, this.bag)){
            this.eel.reset();
        }if(this.checkAdj(this.bag, this.rockObs)){
            this.rockObs.reset();
        }*/
        if(this.gameOver == true){
            
            game.config.point = this.point;
            this.scene.start("creditScene");
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
    // just plays death animation at shrimp's location
    shrimpDeath(shrimp) {
        // temporarily hide shrimp
        shrimp.alpha = 0;
        // play death animation on location
        let die = this.add.sprite(shrimp.x, shrimp.y, 'shrimpdie').setOrigin(0, 0); // create a sprite on location
        die.anims.play('shrimpdeath'); // have sprite play the animation
        die.on('animationcomplete', () => {
            shrimp.reset();
            shrimp.alpha = 1;
            die.destroy();
            this.gameOver = true;
        });
        
    }
}