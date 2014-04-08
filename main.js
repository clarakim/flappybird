// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = {

    preload: function() { 
      // Function called first to load all the assets

     //change the background color of the game
     this.game.stage.backgroundColor = '#71c5cf'; 

     // Load the bird sprite
     this.game.load.image ('bird','assets/angry-bird-icon.png');

     // Load the pipe sprite 
     this.game.load.image('pipe', 'assets/pipe.png');

     //add sound 
     //this.game.load.audio('jump', 'assets/jump.wav');  
		
    },

    create: function() { 
    	// Fuction called after 'preload' to setup the game    
 
      //Display the bird on the screen
      this.bird = this.game.add.sprite (100, 245, 'bird')

      // Add gravity to the bird to make it fall
      this.bird.body.gravity.y= 1000;
      //anchor (center of rotation) 
      this.bird.anchor.setTo(-0.2, 0.5);  

      // Call the 'jump' function when the spacekey is hit
      var space_key =
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space_key.onDown.add(this.jump,this);

      // Create a group of pipes. 
      this.pipes = game.add.group();
      this.pipes.createMultiple(20, 'pipe')

      this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);  

      this.score= 0;
      var style = {font: "30px Arial", fill: "#ffffff" };
      this.label_score = this.game.add.text(20,20, "0", style);

    },
    
    update: function() {
		// Function called 60 times per second
      //If the bird is out of the world (too high or too low), call the 'restart_game' function
      if (this.bird.inWorld == false)
        this.restart_game();

      //restart game when bird collides with a pipe
      this.game.physics.overlap(this.bird, this.pipes,
      this.hit_pipe, null, this);

       // If the bird has already hit a pipe, we have nothing to do
      if (this.bird.angle < 20)
        this.bird.angle += 1;


    },

    hit_pipe: function() {
      if (this.bird.alive == false)
        return;
      // Set the alive property of the bird to false
       this.bird.alive = false; 

      // Prevent new pipes from appearing
      this.game.time.events.remove(this.timer)

      // Go through all the pipes, and stop their movement
      this.pipes.forEachAlive(function(p){
      p.body.velocity.x = 0;
      }, this);
      },

    

    // Make the bird jump

    jump: function() {  

    if (this.bird.alive == false)  
    return;   

    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -290;

    // create an animation on the bird  
    var animation = 
    this.game.add.tween(this.bird);

    // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
    animation.to({angle: -20}, 100);

    // And start the animation
    animation.start();  

    },


    // Restart the game
    restart_game: function() {  
    // Start the 'main' state, which restarts the game
    this.game.time.events.remove(this.timer);  
    this.game.state.start('main');

    },
    
    // Funcion to add a pipe in the game   

    add_one_pipe: function(x, y) {  
    // Get the first dead pipe of our group (dead pipe= pipe that runs out of the display screen)
    var pipe = this.pipes.getFirstDead();

    // Set the new position of the pipe
    pipe.reset(x,y);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200; 

    // Kill the pipe when it's no longer visible 
    pipe.outOfBoundsKill = true;
},

    add_row_of_pipes: function() {  
    var hole = Math.floor(Math.random()*5)+1;

    this.score += 1; 
    this.label_score.content = this.score; 

    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole +1) 
            this.add_one_pipe(400, i*60+10);   
},


};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 
