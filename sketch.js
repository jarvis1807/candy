
var boy, boyRunning
var bg, bgimg
var candy, candy1img, candy2img, candy3img
var coin, coinimg
var worm, wormimg
var candyGroup, coinGroup, wormGroup
var Score = 0
var gameState = "Start"
var Ghost, Ghostimg
var Angel, Angelimg
var graveyard, graveyardimg



function preload(){
  boyRunning = loadAnimation("Images/Boy1.png", "Images/Boy2.png", "Images/Boy3.png", "Images/Boy4.png");
  bgimg = loadImage("Images/Background.png")
  
  candy1img = loadImage("Images/Candy1.png")
  candy2img = loadImage("Images/candy2.png")
  candy3img = loadImage("Images/candy3.png")
  
  coinimg = loadImage("Images/Coin.png")
  
  wormimg = loadImage("Images/Worm.png")
  
  Ghostimg = loadImage("Images/Ghost.png")
  
  Angelimg = loadImage("Images/Angel.png")
  
  graveyardimg = loadImage("Images/graveyard.jpg")
  
}

function setup(){
  createCanvas(600,800)
  bg = createSprite(300,400)
  bg.addImage(bgimg)
  bg.scale = 0.6
  
  graveyard = createSprite(300,400)
  graveyard.addImage(graveyardimg)
  graveyard.visible = false
  
  
  boy = createSprite(300, 750)
  boy.addAnimation("running", boyRunning)
  boy.scale = 1.1
  
  candyGroup = new Group()
  coinGroup = new Group()
  wormGroup = new Group()
  GhostGroup = new Group()
  AngelGroup = new Group()
  
  
}

function draw(){
  
  background("teal")
  if (gameState === "Start"){
    textSize(20)
    fill("BLACK")
    
    text("Instruction:-", 100,50)
    text("1) Click/touch up arrow to take the boy up", 40,100)
    text("2) Click/touch on right/left arrow to take the boy right and left", 40, 150)  
    text("3) There are two levels:" , 40,200)
    text("* 1st level is for 30 pts", 60, 230)
    text("* 2nd level is for 60 pts" , 60,260)
    text("4) Obstacles in the game:",40,300)
     text("* Avoid worms in level 1", 60, 330)
     text("* Avoid angels in level 2" , 60,360)
    textSize(30)
    fill("YELLOW")
    textStyle(BOLD)
    text("Press space/touch to start",150, 400)
    if(gameState === "Start" && (keyDown("SPACE")|| touches.length>0)){
      gameState = "Level1"
      touches =[]
    }
  }
    if(gameState === "Level1"){
  spawnCandy()
  Spawncoins()
  SpawnWorms()
  
  if(keyDown(UP_ARROW) || touches.length > 0){
    boy.velocityY = -10
    touches = []
  }
  boy.velocityY = boy.velocityY+1
  
    for(var i = 0; i<touches.length; i++){
      ellipse(touches[i].x, touches[i].y, 300, 300)
      
  if(keyDown(LEFT_ARROW) || touches[i].x < boy.x){
    boy.x = boy.x-5
  }
  if(keyDown(RIGHT_ARROW) || touches[i].x > boy.x){
    boy.x = boy.x+5
  }
    }
    
  for(var i = 0 ; i<candyGroup.length; i++){
   if(candyGroup.get(i).isTouching(boy)){
   candyGroup.get(i).destroy()
   Score += 1  
     
   }
  }
  
  for(var i = 0 ; i<coinGroup.length; i++){
   if(coinGroup.get(i).isTouching(boy)){
   coinGroup.get(i).destroy()
   Score += 2  
     
   }
  }
  
  for(var i = 0 ; i<wormGroup.length; i++){
   if(wormGroup.get(i).isTouching(boy)){
   wormGroup.get(i).destroy()
   Score = Score-2  
     
   }
  }
  
  Edges = createEdgeSprites()
  boy.collide(Edges)
  
  if(Score<0){
    gameState = "end"
  }
    
  if(Score>30){
    gameState = "Level2"
  }
  
 
  
  
  drawSprites()
  
  fill("Black")
  textSize(20)
  textStyle(BOLD)
  text("Score: " + Score, 450, 50)
  }
  if(gameState === "Level2"){
    
    bg.destroy()
    graveyard.visible = true
    SpawnGhost()
    SpawnAngel()
    candyGroup.destroyEach()
    coinGroup.destroyEach()
    wormGroup.destroyEach()
    boy.collide(Edges)
    
    
      
    
    if(keyDown(UP_ARROW)|| touches.length > 0){
    boy.velocityY = -10
  }
  boy.velocityY = boy.velocityY+1
    
  for(var i = 0; i<touches.length; i++){
      ellipse(touches[i].x, touches[i].y, 300, 300)
  if(keyDown(LEFT_ARROW)|| touches[i].x < boy.x){
    boy.x = boy.x-5
  }
  if(keyDown(RIGHT_ARROW)|| touches[i].x > boy.x){
    boy.x = boy.x+5
  }
  }
    for(var i = 0 ; i<GhostGroup.length; i++){
   if(GhostGroup.get(i).isTouching(boy)){
   GhostGroup.get(i).destroy()
   Score += 2  
     
   }
  }
  for(var i = 0 ; i<AngelGroup.length; i++){
   if(AngelGroup.get(i).isTouching(boy)){
   AngelGroup.get(i).destroy()
   Score = Score -2  
     
   }
  }
    if(Score<0){
      gameState = "end"
    }
    
    if(Score>60){
      gameState = "over"
    }
    drawSprites()
    
    fill("Red")
  textSize(20)
  textStyle(BOLD)
  text("Score: " + Score, 450, 50)
  }  
  
  
  if(gameState === "end"){
    candyGroup.destroyEach()
    coinGroup.destroyEach()
    wormGroup.destroyEach()
    AngelGroup.destroyEach()
    GhostGroup.destroyEach()
    
    fill("Black")
  textSize(50)
  textStyle(BOLD)
  text("GameOver!😔",200,400)
    
  }
  if(gameState === "over"){
    candyGroup.destroyEach()
    coinGroup.destroyEach()
    wormGroup.destroyEach()
    AngelGroup.destroyEach()
    GhostGroup.destroyEach()
    
    fill("Black")
  textSize(50)
  textStyle(BOLD)
  text("Congrats! You Won!🎉", 50,400)
    
  }
  
  
}

function spawnCandy(){
  if(frameCount % 180===0){
  candy = createSprite(0,0)
  candy.scale = 0.3
    
  candy.x = Math.round(random(200,400))
  candy.velocityY = 3
  
  var r = Math.round(random(1,3))
  switch(r){
    case 1: candy.addImage(candy1img) 
      break
    case 2: candy.addImage(candy2img)
      break
    case 3: candy.addImage(candy3img)
      break
    default : break
    
  }
    candy.lifetime = 270
    candyGroup.add(candy) 
}
  }
  
  function Spawncoins(){
    if(frameCount % 200===0){
      coin = createSprite(0,0)
      coin.addImage(coinimg)
      coin.velocityY = 3
      coin.x = Math.round(random(200,400))
      coin.scale = 0.2
      
    
    coin.lifetime = 270
    coinGroup.add(coin)
    }
  }
  
  function SpawnWorms(){
    if(frameCount % 300===0){
      worm = createSprite(0,0)
      worm.addImage(wormimg)
      worm.velocityY = 3
      worm.x = Math.round(random(200,400))
      worm.scale = 0.25
    
    worm.lifetime = 270
    wormGroup.add(worm)
    }
  }
  
  function SpawnGhost(){
    if(frameCount % 200===0){
      Ghost = createSprite(0,0)
      Ghost.addImage(Ghostimg)
      Ghost.velocityY = 3
      Ghost.x = Math.round(random(200,400))
      Ghost.scale = 0.3
      
      
    
    Ghost.lifetime = 270
    GhostGroup.add(Ghost)
    }
  }
  
  function SpawnAngel(){
    if(frameCount % 300===0){
      Angel = createSprite(0,0)
      Angel.addImage(Angelimg)
      Angel.velocityY = 3
      Angel.x = Math.round(random(200,400))
      Angel.scale = 0.4
    
    Angel.lifetime = 270
    AngelGroup.add(Angel)
    }
  }
  
  
  
  
