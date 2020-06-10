let prizes_config = {
    count: 12,
    prizes_names: ["3000 Credits", "35% Off", "Hard Luck", "70% Off", "Swagpack", "100% Off", "Netflix", "50% Off", "Amazon Voucher", "2 Extra Spin", "CB Tshirt", "CB Book"],
}



let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: 0xffcc00,
    
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    
};

let game = new Phaser.Game(config);


 let theWheel = new Phaser.Game({
     'animation' :
        {
            'type'          : 'spinToStop',
            'duration'      : 10,
            'spins'         : 5,
            'callbackSound' : playSound,    // Specify function to call when sound is to be triggered
        }
 });

function preload(){
    console.log("Preload");
    
    //load audio 
    this.load.audio('audio', '../Assets/gameAudio.mp3');  

    //load object, load some images
    this.load.image('background', '../Assets/back.jpg');
    console.log(this);
   
    this.load.image('wheel', '../Assets/wheel.png');
    this.load.image('pin', '../Assets/pin.png');
    this.load.image('stand', '../Assets/stand.png');
    this.load.image('button', '../Assets/spin.png');
    
  
}



function create(){
    
    console.log("Create");
    
    //create audio
    audio = this.sound.add('audio');
    
    //creat the background image
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(0, 0, 'background');
    background.setPosition(W/2, H/2);
    background.setScale(0.20);
    
    //let's create stand
    let stand = this.add.sprite(W/2, H/2 + 250, 'stand');
    stand.setScale(0.25);
    
    
    //lets's create a pin
    let pin = this.add.sprite(W/2, H/2-250, 'pin');
    pin.setScale(0.25);
    pin.depth = 1;
    
   
    //let's create wheel
     this.wheel = this.add.sprite(W/2, H/2, 'wheel');
     this.wheel.setScale(0.25);
    
    // the game has just started = we can spin the wheel
    this.canSpin = true;
    
    //event listener for mouse click
    //this.input.on("pointerdown", spinwheel, this);
    
    //let's create text object
    font_style = {
        font: "bold 30px Arial",
        align: "center",
        color: "red",
    }
    this.game_text = this.add.text(10, 10, "Welcome to Spin & Win", font_style);
    
     
    //let's create spin button
    this.button = this.add.sprite(W/2, H/2, 'button');
    this.button.setScale(0.45);
    
      //this.button.onInputOver.add(over, this);
    this.input.on("pointerdown", spinwheel, this);
    
        
}


//Game loop
function update(){
    console.log("Inside Update");
    //this.wheel.angle += 1;
    
}

  
function spinwheel() {
     if(this.canSpin){
         
        playSound(); 
         
         
        console.log("you clicked the mouse");
        console.log("Wheel is spinning");
    
    let rounds = Phaser.Math.Between(2, 4);
    let degrees = Phaser.Math.Between(0,11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count)); 
    
    // now the wheel cannot spin because it's already spinning
     this.canSpin = false;
 
         
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope: this,
        onComplete:function() {
           this.game_text.setText("You won " + prizes_config.prizes_names[idx]);
           // player can spin again
           this.canSpin = true;
        },
    });
    
     }
        
 
    
}

function playSound()
    {
        // Stop and rewind the sound (stops it if already playing).
        audio.pause();

        audio.currentTime = 0;

        // Play the sound.
        audio.play();
    }

   