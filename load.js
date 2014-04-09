var load_state = {

preload: function() { 
      // Function called first to load all the assets

     //change the background color of the game
     this.game.stage.backgroundColor = '#71c5cf'; 

     // Load the bird sprite
     this.game.load.image ('bird','assets/angry-bird-icon.png');

     // Load the pipe sprite 
     this.game.load.image('pipe', 'assets/pipe.png');

     //add sound 
     this.game.load.audio('jump', 'assets/jump.wav');  
    
    },

    create: function () {
        //when all assets are loaded, go to the 'menu' state 
        this.game.state.start('menu');
    }
};