var Keyboarder = function() {
  var keyState = {};

  window.onkeydown = function( e ) {
    keyState[ e.keyCode ] = true;
  };

  window.onkeyup = function( e ) {
    keyState[ e.keyCode ] = false;
  };

  this.isDown = function( keyCode ){
    return (keyState[ keyCode ] === true);
  };

  this.KEYS = {LEFT: 37, RIGHT: 39, SPACE: 32};
};


var Player = function( game, gameSize ) {
  this.game = game;
  this.size = { x:15, y:15 };
  this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.x };
  this.keyboarder = new Keyboarder();
  this.firingDelay = 0;
  this.fillColor = 'black';
  this.bulletColor = 'blue';
};

Player.prototype = {
  update: function() {

    if (this.firingDelay > 0) {
      this.firingDelay -= 1;
    }

    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2;
    }

    if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
      if ( this.firingDelay === 0 ) {
        var bullet = new Bullet( { x: this.center.x,
          y: (this.center.y - this.center.x / 2)},
        {x: 0, y: -6},
        this.bulletColor
      );

      this.game.addBody( bullet );
      this.game.shootSound.load();
      this.game.shootSound.play();
      this.firingDelay = 20;
    }
  }
}
};
