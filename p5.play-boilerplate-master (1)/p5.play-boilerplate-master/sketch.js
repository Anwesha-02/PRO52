var bg
var apple, banana, grapes, peach, pear, strawberry, watermelon, lemon, cherry
var ninja 
var fruitGroup
var ninjaAni, ninjaAni1, ninjaR, ninjaR1
var score
var gameState = "play"

function preload(){
  bg = loadImage("assets/bg.jpg");
  apple = loadImage("assets/apple.png");
  banana = loadImage("assets/banana.png");
  cherry = loadImage("assets/cherry.png");
  grapes = loadImage("assets/grapes.png");
  lemon = loadImage("assets/lemon.png");
  peach = loadImage("assets/peach.png");
  pear = loadImage("assets/pear.png");
  strawberry = loadImage("assets/strawberry.png");
  watermelon = loadImage("assets/watermelon.png");
  ninjaAni = loadAnimation("assets/character1.png");
  ninjaAni1 = loadAnimation("assets/character2.png");
  ninjaR = loadAnimation("assets/character1reverse.png");
  ninjaR1 = loadAnimation("assets/character2r.png");
  }


 function setup() {
  createCanvas(800,400);
  ninja = createSprite(400,300,50,50);
  ninja.addAnimation("ninja",ninjaAni);
  ninja.addAnimation("ninja1",ninjaAni1);
  ninja.addAnimation("ninjaR",ninjaR);
  ninja.addAnimation("ninjaR1",ninjaR1);

  ninja.scale = 2.5
  score = 0

  fruitGroup = new Group()
}

function draw() {
  background(bg);  

  if(gameState === "play"){
  drawSprites();
  handleFruits();


  if (keyDown(LEFT_ARROW)){
    ninja.x -=3 
    ninja.changeAnimation("ninjaR",ninjaR);
  
  }
  if(keyDown(RIGHT_ARROW)){
    ninja.x +=3
    ninja.changeAnimation("ninja",ninjaAni);
  }
  if (keyWentDown("space") && ninja.x>=400 && ninja.isTouching(fruitGroup)){
    ninja.changeAnimation("ninja1",ninjaAni1)
    fruitGroup[0].destroy();
    score +=1
  }
  if (keyWentUp("space")&& ninja.x>=400){
    ninja.changeAnimation("ninja",ninjaAni)
  }
  
  if (keyWentDown("space") && ninja.x<=400 && ninja.isTouching(fruitGroup)){
    ninja.changeAnimation("ninjaR1",ninjaR1)
    fruitGroup[0].destroy();
    score +=1
  }
  if (keyWentUp("space")&& ninja.x<=400){
    ninja.changeAnimation("ninjaR",ninjaR)
  }
  if(score == 10){
    gameState = "end"
  }
  }
  
  
  fill("white")
  textSize(25)
  text("Score:"+score,650,50)

  if(gameState === "end"){
    fruitGroup.destroyEach();
    background(0)
    fill("white")
    text("Game Over", 400,200)
  }



  
}

function handleFruits(){
  if (frameCount%80===0){
   var fruits = createSprite(Math.round(random(100,700)),0,20,20);
   fruits.velocityY = 2
   fruits.scale = 0.5
   fruits.lifetime = 600
   var rand = Math.round(random(1,9));
   switch (rand) {
    case 1: fruits.addImage(apple)
    break
    case 2: fruits.addImage(banana)
    break
    case 3: fruits.addImage(cherry)
    break
    case 4: fruits.addImage(grapes)
    break
    case 5: fruits.addImage(lemon)
    break
    case 6: fruits.addImage(peach)
    break
    case 7: fruits.addImage(pear)
    break 
    case 8: fruits.addImage(strawberry)
    break
    case 9: fruits.addImage(watermelon)
    break
    default: break
    
  }
  fruitGroup.add(fruits)
}}
