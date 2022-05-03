class Rod extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 1.5;
        this.up = false;
        this.timer = 0;
        this.anims.play('hookmove');
    }
    update(){
        this.x += this.moveSpeed;
        if(this.x >= game.config.width){
            this.x = Phaser.Math.Between(-1500, -1800);
        }
        if(this.y <= 0 && this.up == false){
            this.y += 3.0;
        }if(this.y > 0){
            this.y += 0;
            this.timer += 1;
            if(this.timer >= 100){
                this.up = true;
                this.timer = 0;
            }
        }if(this.up == true){
            this.y -= 3.0;
        }if(this.y <= -240){
               this.up = false;
        }

    }
    reset(){
        this.x = Phaser.Math.Between(-1500, -1800);
    }
}