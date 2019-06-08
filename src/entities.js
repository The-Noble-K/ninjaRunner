export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key) {
        super(scene, x, y, key, 'masterNinja');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData('isDead', false);
        this.setData('speed', 200);
    }
  
    death(canDie) {
      if(!this.getData('isDead')) {
        this.setTexture('death');
        this.play('death');
        this.setAngle(0);
        this.body.setVelocity(0, 0);
  
        this.on('animationcomplete', function() {
            if(canDie) {
                this.destroy();
            } else {
                this.setVisible(false);
            }
        }, this);
        this.setData('isDead', true);
      }
    }
  
    jump() {
  
      this.body.velocity.y = -this.getData('speed');
      this.setTexture('jump');
      this.play('jump');
  
  }
  
    moveRight() {
  
      this.body.velocity.x = this.getData('speed');
      this.setTexture('run');
      this.play('run');
  
    }
  
    moveLeft() {
  
      this.body.velocity.x = -this.getData('speed');
      this.body.flipX;
      this.setTexture('run');
      this.play('run');
  
    }
  
    update() {
  
      this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
      this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
    
    }
  }