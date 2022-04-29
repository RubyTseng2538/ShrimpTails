class Rod extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 1.5;
        this.up = false;
    }
    update(){
        this.x += this.moveSpeed;
        if(this.x >= game.config.width){
            this.x = -1500;
        }
        if(this.y <= -240 && this.up == false){
            this.y += 1.5;
        }if(this.y >= 0){
            this.up = true;
        }if(this.up == true){
            this.y -= 1.5;
        }if(this.y <= -240){
            this.up = false;
        }

    }
    reset(){
        this.x = -1000;
    }
}