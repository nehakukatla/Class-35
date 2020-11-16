var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedTime, lastFed;
var foodObj;

function preload(){
   dogImg=loadImage("dogImg.png");
   dogImg1=loadImage("dogImg1.png");
  }

//Function to set initial environment
function setup() {
  
  feed=createButton("Feed the Dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background(46,139,87);
 
  //if(keyWentDown(UP_ARROW)){
 //   writeStock(foodS);
//    dog.addImage(dogImg1);
 // }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  fill(255,255,254);
  textSize(15);

fedTime=database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
});

  if(lastFed>=12){
    text("Last Feed:"+ lastFed%12 + "PM", 350, 30);
  }
  else if(lastFed ===0){
    text("Last Feed: 12 AM", 350,30);
  }
  else{
    text("Last Feed:"+ lastFeed + "AM", 350, 30);
  }
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog(){
  dog.addImage(dogImg1);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}