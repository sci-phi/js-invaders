var Bullet = function( center, velocity, color ) {
  this.size = { x:3, y:3 };
  this.center = center;
  this.velocity = velocity;
  this.fillColor = color;
};

Bullet.prototype = {
  update: function() {
    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;
  }
};
