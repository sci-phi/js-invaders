var Game = function(canvasId) {

  var canvas = document.getElementById(canvasId);
  var screen = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height };
  var playerOne = new Player(this, gameSize);

  var self = this;

  loadSound( "audio/shoot.mp3", function( shootSound ) {
    self.shootSound = shootSound;
  });

  loadSound( "audio/kaboo.mp3", function( kabooSound ) {
    self.boomSound = kabooSound;
  });

  self.startOver = function() {
    document.getElementById('start-over').style.display = 'none';
    self.bodies = createInvaders(self).concat( playerOne );
    self.tick();
  };

  self.tick = function() {
    self.update();
    self.draw(screen, gameSize);
    if (self.invaderBodies().length === 0){
      self.levelCleared( screen, gameSize );
    } else if (self.playerBodies().length === 0){
      self.gameOver( screen, gameSize );
    } else {
      // Key Callback Loop
      requestAnimationFrame( self.tick );
    }
  };

};

Game.prototype = {
  update: function(){
    var bodies = this.bodies;
    var notCollidingWithAnything = function( b1 ) {
      return bodies.filter( function( b2 ){ return colliding( b1, b2); } ).length === 0;
    };

    this.bodies = this.bodies.filter( notCollidingWithAnything );

    for (var i = 0; i < this.bodies.length; i++ ) {
      this.bodies[i].update();
    }
  },

  draw: function( screen, gameSize ) {
    screen.clearRect( 0, 0, gameSize.x, gameSize.y );

    for (var i = 0; i < this.bodies.length; i++ ) {
      drawRect(screen, this.bodies[i]);
    }
  },

  addBody: function( body ) {
    this.bodies.push( body );
  },

  invadersBelow: function( invader ) {
    return this.bodies.filter( function( b ) {
      return b instanceof Invader &&
        (b.center.y > invader.center.y) &&
        ((b.center.x - invader.center.x) < invader.size.x);
      }).length > 0;
  },

  invaderBodies: function() {
    return this.bodies.filter( function( b ){ return b instanceof Invader;} );
  },

  playerBodies: function() {
    return this.bodies.filter( function( b ){ return b instanceof Player; } );
  },

  levelCleared: function( screen, gameSize ) {
    console.log("Level Cleared!!!" );
    screen.clearRect( 0, 0, gameSize.x, gameSize.y );
    screen.fillText( "Level Cleared!", (gameSize.x / 2), (gameSize.y / 2) );
    document.getElementById('start-over').style.display = 'inline';
  },

  gameOver: function( screen, gameSize ) {
    console.log("Game Over" );
    this.boomSound.load();
    this.boomSound.play();
    screen.clearRect( 0, 0, gameSize.x, gameSize.y );
    screen.fillText( "GAME OVER", (gameSize.x / 2), (gameSize.y / 2) );
    document.getElementById('start-over').style.display = 'inline';
  }
};
