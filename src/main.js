let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    gameStartSpeed: 0.5,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
let keyUp, keyDown, keyP;