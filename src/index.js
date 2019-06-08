import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1200,
  height: 640,
  autoCenter: 1,
  backgroundColor: 'black',
  pixelArt: true,
  roundPixels: true,
  audio: {
    disableWebAudio: true,
    noAudio: false
  },
  fps: {
    target: 2,
    min: 2,
    forceSetTimeOut: true
  },
  physics: {
    default: 'arcade',
    arcade: {
        gravity: {y: 500},
        debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {

  this.load.tilemapTiledJSON('tilemap', 'src/assets/tilemap.json');
  this.load.image('tileset', 'src/assets/tileset.png');
  this.load.image('bg', 'src/assets/background.png');
  this.load.image('fg', 'src/assets/foreground.png');
  this.load.atlas('masterNinja', 'src/assets/Atlas/masterNinja.png', 'src/assets/Atlas/masterNinja.json');

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
  var player = this.physics.add.sprite(16, 576, 'masterNinja', 'src/assets/Atlas/images/ninja40.png');
  console.log(player);
  player.setCollideWorldBounds(true);
  player.anims.play('idle');

   //Add Player Animations
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('masterNinja', { prefix: 'ninja', suffix: '.png', start: 40, end: 43 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('masterNinja', { prefix: 'ninja', suffix: '.png', start: 1, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('masterNinja', { prefix: 'ninja', suffix: '.png', start: 8, end: 15 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'death',
    frames: this.anims.generateFrameNames('death', { prefix: 'ninja', suffix: '.png', start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

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
