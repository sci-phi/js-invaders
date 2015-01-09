colliding = function( b1, b2 ) {
  return !( (b1 === b2) ||
  (b1.center.x + (b1.size.x / 2)) < (b2.center.x - (b2.size.x / 2)) ||
  (b1.center.y + (b1.size.y / 2)) < (b2.center.y - (b2.size.y / 2)) ||
  (b1.center.x - (b1.size.x / 2)) > (b2.center.x + (b2.size.x / 2)) ||
  (b1.center.y - (b1.size.y / 2)) > (b2.center.y + (b2.size.y / 2)) );
};

drawRect = function( screen, body ) {
  screen.fillStyle = body.fillColor ;
  screen.fillRect( (body.center.x - (body.size.x / 2)),
    (body.center.y - (body.size.y / 2)), body.size.x, body.size.y );
};

;(function(){

  // starts the game
  window.onload = function(){
    window.game = {jsInvaders: new Game("screen")};
    // game object can now be referenced via "window.game.jsInvaders"
    //window.game.jsInvaders.tick();
    window.game.jsInvaders.startOver();
  };

})();
