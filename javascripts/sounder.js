var loadSound = function( url, callback ) {
  var loaded = function(){
    callback(sound);
    sound.removeEventListener('canplaythrough', loaded);
  };

  var sound = new Audio( url );
  sound.addEventListener( 'canplaythrough', loaded );
  sound.load();
};

// loadSound( "audio/shoot.mp3", function( shootSound ) {
//   self.shootSound = shootSound;
//   self.tick();
// });
