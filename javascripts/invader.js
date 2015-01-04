var Invader = function( game, center ) {
  this.size    = { x:15, y:15 };
  this.game    = game;
  this.center  = center;
  this.patrolX = 0;
  this.speedX  = 0.3;
  this.fillColor = 'lime'; // aliens are green!
  this.bulletColor = 'red';
};

Invader.prototype = {
  update: function() {
    if (this.patrolX < 0 || this.patrolX > 40) {
      this.speedX = -(this.speedX);
    }

    this.center.x += this.speedX;
    this.patrolX  += this.speedX;

    if (!(this.game.invadersBelow(this)) && Math.random() > 0.995 ) {

      // fires a bullet
      var bullet = new Bullet( { x:this.center.x,
        y: this.center.y + (this.size.x / 2) },
      { x: Math.random() - 0.5, y: 2 },
      this.bulletColor
    );

    this.game.addBody(bullet);
  }
}
};

var createInvaders = function( game ) {
  var invaders = [];

  for (var i = 0; i < 24; i++) {
    var x = 30 + ((i % 8) * 30);
    var y = 30 + ((i % 3) * 30);
    invaders.push( new Invader( game, {x: x, y: y}) );
  }

  return invaders;
};
