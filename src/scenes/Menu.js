class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.preload.image('bg', './assets/seabackgroun.jpg');
    }

    create(){
        leftClick = Phaser.Input.activePointer.leftButton
    }
}