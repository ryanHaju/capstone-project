var racetrack,racetrackImg;
var car,carImg;
var score = 0;
var tire,tireImg;
var end,endImg;
var coin,coinImg;


var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  racetrackImg = loadImage("road.png");
  carImg = loadImage("car.png");
  tireImg = loadImage("tire.png");
  endImg = loadImage("gameOver.png")
  coinImg = loadImage("coin.png")
  }

function setup(){
  createCanvas(windowWidth,windowHeight);

racetrack=createSprite(width/2,height/2);
racetrack.addImage(racetrackImg);
//racetrack.velocityY = 4;

car = createSprite(width/2,700,20,20);
car.addImage(carImg);
car.scale=0.8;
car.setCollider("circle",0,0,40);

end = createSprite(width/2,height/2);
end.addImage(endImg);
end.scale=2;
end.visible=false;

tiresG = new Group;
coinsG = new Group;
}

function draw(){
  background(255);

  if(gameState===PLAY){
  if(keyDown("RIGHT_ARROW")){
    car.x+=4;
  }

  if(keyDown("LEFT_ARROW")){
    car.x-=4;
  }
  
  edges= createEdgeSprites();
  car.collide(edges);
  
  racetrack.velocityY = 4;
  if(racetrack.y > height ){
     racetrack.y = height/4;
   }
     
   end.visible=false;

   if(coinsG.isTouching(car)){
    coinsG.destroyEach();
    score+=50;
   }

   if(tiresG.isTouching(car)){
    gameState=END;
    }
  }
      else if(gameState===END){
        end.visible = true;
        car.velocityY=0;
        car.velocityX=0;
        racetrack.velocityY=0;
        
        tiresG.destroyEach();
        coinsG.destroyEach();
        
        tiresG.setVelocityYEach(0);
        coinsG.setVelocityYEach(0);
      }
    
  if(keyDown("ENTER")){
    reset();
  }
  createTire(); 
  createCoins();
  drawSprites();
  textSize(70);
  fill(255);
  text("SCORE: "+ score,width-150,30);

    
  }


function createTire() {
  if (frameCount % 100 === 0) {
 tire = createSprite(Math.round(random(700,1200),40, 10, 10));
  tire.addImage(tireImg);
  tire.scale=0.3;
  tire.velocityY = 5;
  tire.lifetime = 200;
  tiresG.add(tire)
  }
}

function createCoins() {
  if (frameCount % 100 === 0) {
  coin = createSprite(Math.round(random(600,1300),40, 10, 10));
  coin.addImage(coinImg);
  coin.scale=0.1;
  coin.velocityY = 5;
  coin.lifetime = 200;
  coinsG.add(coin);
}
}

function reset(){
  gameState=PLAY;
}