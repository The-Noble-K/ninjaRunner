import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1200,
  height: 640,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {

  this.load.tilemapTiledJSON('tilemap', 'assets/tilemap.json');
  this.load.image('tileset', 'assets/tileset.png');
  this.load.image('bg', 'assets/background.png');
  this.load.image('fg', 'assets/foreground.png');
  this.load.atlas('masterNinja', 'assets/Atlas/masterNinja.png', 'assets/Atlas/masterNinja.json');

}

function create() {

  //Create Background
  this.background = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 1200, 640, 'bg');
  this.foreground = this.add.tileSprite(this.game.config.width/2, this.game.config.height/2, 1200, 640, 'fg');
  
  //Create Map & Layer
  var map = this.make.tilemap({key: 'tilemap'});
  var tileset = map.addTilesetImage('tileset');
  var layer = map.createStaticLayer(0, tileset, 0, 0)
  layer.setCollisionByExclusion([-1]);

  //Set Boundaries
  this.physics.world.bounds.width = layer.width;
  this.physics.world.bounds.height = layer.height;

  //Instantiate Player
  var player = this.add.sprite(16, 576, 'masterNinja', 'assets/Atlas/images/ninja40.png');
  console.log(player);

   //Add Player Animations
  var idleFrames = this.anims.generateFrameNames('masterNinja', { start: 40, end: 43, zeroPad: 2, prefix: 'images/ninja', suffix: '.png' });
  this.anims.create({ key: 'idle', frames: idleFrames, frameRate: 10, repeat: -1 });
  player.anims.play('idle');

  this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

}

function update() {

  this.background.tilePositionX += 2;
  this.foreground.tilePositionX += 4;

}
