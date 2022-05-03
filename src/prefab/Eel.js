class Eel extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 1.5;
        this.down = false;
    }
    update(){
        this.x += this.moveSpeed;
        if(this.x >= game.config.width){
            this.x = -1000;
        }
        if(this.y <= game.config.height && this.down == false){
            this.y -= 1.0;
        }if(this.y <= 240){
            this.down = true;
        }if(this.down == true){
            this.y += 1.0;
        }if(this.y >= game.config.height){
            this.down = false;
        }

    }
    reset(){
        this.x = Phaser.Math.Between(-300, -1200);
    }
}