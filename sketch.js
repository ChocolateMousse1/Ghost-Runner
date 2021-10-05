var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;
}

function draw() {
  background("black");

  if(gameState == "play") {
  
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("Space")) {
    ghost.velocityY = -5;
  }

  if(keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x - 3;
  }

  if(keyDown("RIGHT_ARROW")) {
    ghost.x = ghost.x + 3;
  }
  ghost.velocityY = ghost.velocityY + 0.8;

  if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
    ghost.velocityX = 0;
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
  }


  
 spawnDoors();
 drawSprites();
}

if(gameState == "end") {
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over", 230, 250);
  
}
}

function spawnDoors() {

  if(frameCount%240 === 0) {
  door = createSprite(200,0);
  door.x = Math.round(random(100,500));
  door.addImage("door", doorImg);
  door.velocityY = 1;
  door.lifetime = 600;
  doorsGroup.add(door);

  climber = createSprite(200,60);
  climber.x = door.x;
  climber.addImage("climber", climberImg);
  climber.velocityY = 1;
  climber.lifetime = 600;
  climbersGroup.add(climber);

  ghost.depth = door.depth;
  ghost.depth = ghost.depth + 1;

  invisibleBlock = createSprite(200,60);
  invisibleBlock.debug = true;
  invisibleBlock.x = door.x;
  invisibleBlock.velocityY = 1;
  invisibleBlock.lifetime = 600;
  invisibleBlock.visible = false;
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2
  invisibleBlockGroup.add(invisibleBlock);
  }

  
}