class Obstacle extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 1.5;
    }
    update(){
        this.x += this.moveSpeed;
        if(this.x >= game.config.width){
            this.x = -200;
        }
    }

    reset(){
        this.x = Phaser.Math.Between(-200, -5000);
    }
}