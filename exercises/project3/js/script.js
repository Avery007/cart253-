





// display information
let player1Info;


let killer=[];
let cathari;
let scrolls=[];
let ball;
let arrow;
let bcWidth=3000;
let scrollImg;

// display players and background by image
let catharImg; // player image
let arrowImg;
let killerImage; // attacker
let ballImage;
let mantraImg;
let coverImg;
let background; // background img
let frontImg; // front image
let instructionImg;
let catharsInfoImg;
let shieldImg;

let triImg;
let fireImg;
let ufo;

let killerNumber;
// add background musci
let backMusic;
let rotateTri=[];


let gameState = 0; // tracking game state






// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey

function preload() {
  // load umages used in this game
  catharImg = loadImage('./images/cathari.png'); // player
  killerImg = loadImage('./images/killer.png'); // killer
  background = loadImage('./images/casle.jpg'); // backgorund when game is active
  scrollImg = loadImage('./images/book.png');
  ballImage = loadImage('./images/ball.png');
  mantraImg = loadImage('./images/specialPower.png');
  coverImg = loadImage('./images/front.jpg');
  instructionImg = loadImage('./images/instruct.jpg');
  catharsInfoImg = loadImage('./images/cathars0.jpg');
  fireImg=loadImage("./images/fire.jpg"); // source:https://pixabay.com/photos/thunderbolt-lightning-thunderstorm-1905603/
  ufo=loadImage("./images/flying.png");
  triImg=loadImage("./images/tri.png");
  arrowImg=loadImage("./images/arrow.png");
  section2=loadImage("./images/bc.jpg");
  shieldImg=loadImage("./images/shield.png");
}

// function set up

function setupKiller(){

  killerNumber=3+floor(cathari.getCount/3);
   for (let i = 0; i < killerNumber; i++) {

     // Generate (mostly) random values for the arguments of the Voter constructor

     let killerSpeed = random(1, 5); // set vote move speed
     let killerRadius = random(30, 60); // set size
     // Create a new Prey objects with the random values
     let newKiller = new Killer(killerRadius, killerSpeed,killerImg);
     // Add the new vote object to the END of our array using push()
     killer.push(newKiller);
   }



}
function makeNewKiller(){
  //console.log(killerNumber);
  //

   //for (let i = killer.length; i <killer.length+killerNumber; i++) {

     // Generate (mostly) random values for the arguments of the Voter constructor

     let killerSpeed = random(1, 6); // set vote move speed
     let killerRadius = random(30, 60); // set size
     // Create a new Prey objects with the random values
     let newKiller = new Killer(killerRadius, killerSpeed,killerImg);
     // Add the new vote object to the END of our array using push()
     killer.push(newKiller);
  // }



}




function setup() {
  createCanvas(windowWidth, windowHeight);

      imageMode(CENTER);



      cathari = new Cathari(width - 200, 200, 10, 30, catharImg, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 13);
      ball=new Magicball(cathari.x,cathari.y,10,ballImage,87, 83, 65, 68); //wsad movement
      powerfulMantra=new Scrolls(random(0,width),random(0,height),10,50,2,mantraImg);
      //rotateTri=new RotateTriangle(10,50,triImg);
      arrow=new Arrows(5,arrowImg);

      setupKiller();

      for (let m = 0; m< 5; m++) {
        // Generate (mostly) random values for the arguments of the Voter constructor
        let bookX = random(0, width);
        let bookY = random(0, height);
        let bookSpeed = random(4, 10); // set vote move speed
        let bookRadius = random(30, 60); // set size
        let reduceVisible=random(0.5, 3);
        // Create a new Prey objects with the random values
        let newBook= new Scrolls(bookX,bookY, bookSpeed,bookRadius,reduceVisible,scrollImg);
        // Add the new vote object to the END of our array using push()
        scrolls.push(newBook);
      }

      for (let r = 0; r< 25; r++) {
        // Generate (mostly) random values for the arguments of the Voter constructor
        let speed = random(2, 6);
        let size = random(20, 50);
        let rate=random(1000,20000);
        // Create a new Prey objects with the random values
        let newRotateTri= new RotateTriangle(speed,size,rate,triImg);
        // Add the new vote object to the END of our array using push()
        rotateTri.push(newRotateTri);
      }


}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

       if(gameState===0){
  image(coverImg, width/2, height/2, windowWidth, windowHeight);


}


    else if(gameState===3){
    image(background, width/2, height/2, windowWidth, windowHeight); // display background
    fill(255);
    textSize(25);
    text("You have saved " + cathari.getCount,100,100 );

    for (let n = 0; n < killer.length; n++) {

      killer[n].normalMove();
      killer[n].display();
      killer[n].chaseCheck();
      killer[n].chaseCheck(floor(cathari.x),floor(cathari.y));
      killer[n].chase(cathari.x,cathari.y);
      killer[n].killCathari(cathari);
      ball.killercollision(killer[n],cathari,cathari.x,cathari.y);



    }

      // display votes
      for (let a = 0; a< scrolls.length; a++) {

        scrolls[a].move();
        scrolls[a].display();
        scrolls[a].appearChange();

        cathari.getScrolls(scrolls[a]);

      }


      cathari.handleInput();
      cathari.display();
      cathari.move();

    cathari.exit();

    powerfulMantra.display();
    powerfulMantra.move();
    powerfulMantra.mantraCollision(cathari,ball);
    ball.handleInput(cathari.x,cathari.y);
    cathari.energy(ball);

   }

   else if(gameState===4){
     clear();
     imageMode(CORNER);

     if(bcWidth>0&&!cathari.shieldActive){
     bcWidth=bcWidth-0.2;}


     image(section2,-bcWidth,0,width+3000,height);


     for (let a = 0; a< rotateTri.length; a++) {

       rotateTri[a].move();
       rotateTri[a].checkcollides(cathari);

     }

     arrow.move();
     arrow.display();
     cathari.handleInput();
      cathari.getShield(shieldImg,catharImg);
     cathari.display();
     cathari.move();
     arrow.collisionCheck(cathari);



   }

  }

  function mousePressed() {
    if (gameState === 0) {
      gameState = 1; // start the game when mouse is clicked
      image(catharsInfoImg,width/2,height/2,windowWidth,windowHeight);

    }
    // giving a choice to restart the game when it is over
    else if (gameState === 1) { // when game is over
      gameState = 2; // reset gamestate
     image(instructionImg,width/2,height/2,windowWidth,windowHeight);
    }
    else if (gameState === 2) {
      gameState=3;
    }
  }
