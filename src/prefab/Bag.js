class Bag extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 0.5;
    }

    update(){
        this.x += this.moveSpeed;
        if(this.x >= game.config.width){
            this.x = -5000;
        }
        this.y += this.moveSpeed;
        if(this.y >= game.config.height){
            this.y = 0;
        }
    }
}