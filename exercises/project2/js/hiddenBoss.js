class HiddenBoss {


  // constructor
  constructor( power, name, img) {
    // Position

    // Velocity and speed
    this.x = 0;
    this.y = 0;

    this.img = img;


    // creat a black box which can be generated by calling the boss and use to get more points
    this.power=power;
    this.size=100; // link the size with boss'power
    this.bossManipulation = false; // used to track if the black box is active
    this.name = name;
    this.bossEat=0;
    this.bossCall=86; // Space key to call the hidden boss, same for both player
    this.callCount=0;

  }

// function to count how mnay times the boss is called
  bossPower(){
    if(this.bossManipulation){

      this.callCount=this.callCount+1;
     this.power=floor(this.callCount-this.callCount/1.1);


    }


  }



bossGain(prey){
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.size/2 + prey.radius) {

    //  prey.health=prey.health-20;

      // Check if the prey died and reset it if so
    //  if (prey.health < 0) {

        this.bossEat = this.bossEat + 1; // track how mnay preys the player eat


        prey.reset();


}


}

keyControl(){

if(keyIsDown(this.bossCall)){
  this.bossManipulation=true;}
else{this.bossManipulation=false;}
//console.log(this.isCalled);

}


  display() { // display boss and black box

    if (this.bossManipulation) {
      //imageMode(CENTER);
      this.size=this.power +100 ;
       this.x= random(0,1000);
       boss.y = random(0,500);
       imageMode(CENTER);
       image(this.img, this.x, this.y, this.size, this.size);
      fill(255);
      textSize(60);
      text(this.name, 500, 100);
      console.log(this.size);

    }
  else{this.x=-this.size; this.y=0;}

  }
}
