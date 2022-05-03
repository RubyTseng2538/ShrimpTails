class Obstacle extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 1.5;
        this.anims.play('fishmove');
    }
    update(){
        this.x += this.moveSpeed;
        if(this.x >= game.config.width){
            this.x = Phaser.Math.Between(-200, -5000);
            this.y = Phaser.Math.Between(0, game.config.height);
        }
    }

    reset(){
        this.x = Phaser.Math.Between(-200, -5000);
    }
}