class Shrimp extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 1;
    }

    update(){
        if(keyUp.isDown && this.y >= this.height - borderUISize - borderPadding){
            this.y -= this.moveSpeed
        }else if(keyDown.isDown && this.y <= game.config.height - borderUISize - this.height){
            this.y += this.moveSpeed
        }
    }
}