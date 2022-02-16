var player1, player2;
var gamestate = "select";
var edges, scene;
var isCrouching1 = false, isCrouching2 = false;
var isJumping1 = false, isJumping2 = false;
var player1health = 100, player2health = 100;
var isBlocking1 = false, isBlocking2 = false;
var left1 = false, right1 = true, left2 = true, right2 = false;
var backgroundimg, redselectbox, redselectboximg, blueselectbox, blueselectboximg,
birdanm, birdanm2, 
ding1anm, ding2anm, donganm, 
trexidleanm, trexidleanm2, trexrunanm, trexrunanm2, trexidleanm2, trexcollided, trexcollided2, 
fantasmaidle1, fantasmaidle2, fantasmajump1, fantasmajump2;
var ghostbutton, trexbutton, ding1button, ding2button, dongbutton, birdbutton,
ghostbuttonover1 = true, trexbuttonover1 = false, ding1buttonover1 = false, 
ding2buttonover1 = false, dongbuttonover1 = false, birdbuttonover1 = false, 
ghostbuttonover2 = true, trexbuttonover2 = false, ding1buttonover2 = false, 
ding2buttonover2 = false, dongbuttonover2 = false, birdbuttonover2 = false;
var character1selected = "notselected", character2selected = "notselected";

function preload(){
  backgroundimg = loadImage("background.png");
  birdanm = loadAnimation("./Personagens/Trex-Dinossauros/bird1.png", 
  "./Personagens/Trex-Dinossauros/bird2.png");
  birdanm2 = loadAnimation("./Personagens/Trex-Dinossauros/bird1_2.png", 
  "./Personagens/Trex-Dinossauros/bird2_2.png");
  donganm = loadAnimation("./Personagens/O Jogo Mais Difícil Do Mundo/enemy.png");
  ding1anm = loadAnimation("./Personagens/O Jogo Mais Difícil Do Mundo/friendOG.png");//temporário
  ding2anm = loadAnimation("./Personagens/O Jogo Mais Difícil Do Mundo/friend2OG.png");//temporário
  trexrunanm = loadAnimation("./Personagens/Trex-Dinossauros/trex1.png",
  "./Personagens/Trex-Dinossauros/trex3.png",
  "./Personagens/Trex-Dinossauros/trex4.png");
  trexidleanm = loadAnimation("./Personagens/Trex-Dinossauros/trex_idle.png");
  trexidleanm2 = loadAnimation("./Personagens/Trex-Dinossauros/trex_idle_2.png");
  trexcollided = loadAnimation("./Personagens/Trex-Dinossauros/trex_collided.png");
  trexcollided2 = loadAnimation("./Personagens/Trex-Dinossauros/trex_collided_2.png");
  fantasmaidle1 = loadAnimation("./Personagens/Fantasma/ghost-standing.png");
  fantasmaidle2 = loadAnimation("./Personagens/Fantasma/ghost-standing_2.png");
  fantasmajump1 = loadAnimation("./Personagens/Fantasma/ghost-jumping.png");
  fantasmajump2 = loadAnimation("./Personagens/Fantasma/ghost-jumping_2.png")
  redselectboximg = loadImage("redhalfselectbox.png");
  blueselectboximg = loadImage("bluehalfselectbox.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  scene = createSprite(width/2, height/2, width, height);
  scene.visible = false;
  
  redselectbox = createSprite(45, 45, 15, 15);
  redselectbox.addImage("redbox", redselectboximg);
  redselectbox.scale = 0.1;
  //redselectbox.x = ghostbutton.x;
  //redselectbox.y = ghostbutton.y;

  blueselectbox = createSprite(45, 45, 15, 15);
  blueselectbox.addImage("bluebox", blueselectboximg);
  blueselectbox.scale = 0.1;
  //blueselectbox.x = ghostbutton.x;
  //blueselectbox.y = ghostbutton.y;
  
  ghostbutton = createSprite(45, 45, 15, 15);
  ghostbutton.addAnimation("ghost", fantasmaidle2);
  ghostbutton.scale = 0.17;
  
  trexbutton = createSprite(85, 45, 15, 15);
  trexbutton.addAnimation("trex", trexrunanm);//soon changing to idle
  trexbutton.scale = 0.5;
  
  birdbutton = createSprite(125, 45, 15, 15);
  birdbutton.addAnimation("bird", birdanm2);
  birdbutton.scale = 0.51;
  
  ding1button = createSprite(165, 45, 15, 15);
  ding1button.addAnimation("ding1", ding1anm);
  ding1button.scale = 1.2;
  
  ding2button = createSprite(205, 45, 15, 15);
  ding2button.addAnimation("ding2", ding2anm);
  ding2button.scale = 1.2;
  
  dongbutton = createSprite(245, 45, 15, 15);
  dongbutton.addAnimation("dong", donganm);
  dongbutton.scale = 1.2;
  
  player1 = createSprite(width/2 - width/2/2, windowHeight - 55, 20, 20);
  player2 = createSprite(width/2 + width/2/2, windowHeight - 55, 20, 20);
  player1.visible = false;
  player2.visible = false;
  //player1.debug = true;
  //player2.debug = true;
  
  edges = createEdgeSprites();
}

function draw(){
  background('white');
  image(backgroundimg, 0, 0, width, height);
  
  textSize(35);
  
  if(player2.x < player1.x){
    right1 = false;
    left1 = true;
    right2 = true;
    left2 = false;
  }
  if(player2.x > player1.x){
    right1 = true;
    left1 = false;
    right2 = false;
    left2 = true;
  }
  if(left1 == true&&isJumping1 == false){
    if(character1selected == "ghost"){
      player1.changeAnimation("ghost", fantasmaidle1);
      player1.setCollider("rectangle", -15, 30, 185, 245);//ghost collision (left)
    }
  }
  if(right1 == true&&isJumping1 == false){
    if(character1selected == "ghost"){
      player1.changeAnimation("ghost", fantasmaidle2);
      player1.setCollider("rectangle", 15, 30, 185, 245);//ghost collision (right)
    }
  }
  if(left2 == true&&isJumping2 == false){
    if(character2selected == "ghost"){
      player2.changeAnimation("ghost", fantasmaidle1);
      player2.setCollider("rectangle", -15, 30, 185, 245);//ghost collision (left)
    }
  }
  if(right2 == true&&isJumping2 == false){
    if(character2selected == "ghost"){
      player2.changeAnimation("ghost", fantasmaidle2);
      player2.setCollider("rectangle", 15, 30, 185, 245);//ghost collision (right)
    }
  }
  if(gamestate == "select"){
    console.log(character1selected, character2selected);
    console.log(ghostbuttonover1, trexbuttonover1, ding1buttonover1, 
    ding2buttonover1 , dongbuttonover1, birdbuttonover1);
    console.log(ghostbuttonover2, trexbuttonover2, ding1buttonover2, 
    ding2buttonover2, dongbuttonover2, birdbuttonover2);
    if(/*character1selected == "Fantasma" && character2selected == "Fantasma"
    ||character1selected == "Trex"&&character2selected == "Trex"
    ||character1selected == "Pterodáctilo"&&character2selected == "Pterodáctilo"
    ||character1selected == "Ding"&&character2selected == "Ding"
    ||character1selected == "Amigo Do Ding"&&character2selected == "Amigo Do Ding"
    ||character1selected == "dong"&&character2selected == "Dong"){*/
    character1selected !== "notselected" && character2selected !== "notselected"){
      gamestate = "play";
    }
    if(character1selected !== "notselected"){
      fill('cyan');
      stroke('green');
      textAlign("center");
      text(character1selected+" Selecionado Para Jogador 1", width/2, 75);
    }
    if(character2selected !== "notselected"){
      fill('cyan');
      stroke('green');
      textAlign("center");
      text(character2selected+" Selecionado Para Jogador 2", width/2, 75);
    }
    if(character1selected == "Fantasma"&&keyWentDown("Y")
    ||character1selected == "Trex"&&keyWentDown("Y")
    ||character1selected == "Pterodáctilo"&&keyWentDown("Y")
    ||character1selected == "Ding"&&keyWentDown("Y")
    ||character1selected == "Amigo Do Ding"&&keyWentDown("Y")
    ||character1selected == "Dong"&&keyWentDown("Y")){
      character1selected = "notselected";
      player1.visible = false;
    }
    if(character2selected == "Fantasma"&&keyWentDown("O")
    ||character2selected == "Trex"&&keyWentDown("O")
    ||character2selected == "Pterodáctilo"&&keyWentDown("O")
    ||character2selected == "Ding"&&keyWentDown("O")
    ||character2selected == "Amigo Do Ding"&&keyWentDown("O")
    ||character2selected == "Dong"&&keyWentDown("O")){
      character2selected = "notselected";
      player2.visible = false;
    }
    if(ghostbuttonover1 == true&&character1selected == "notselected"){
      if(keyWentDown("D")){
        ghostbuttonover1 = false;
        trexbuttonover1 = true;
      }
      if(keyWentDown("space")){
        character1();
      }
      redselectbox.x = ghostbutton.x;
      redselectbox.y = ghostbutton.y;
    }
    if(ghostbuttonover2 == true&&character2selected == "notselected"){
      if(keyWentDown(RIGHT_ARROW)){
        ghostbuttonover2 = false;
        trexbuttonover2 = true;
      }
      if(keyWentDown("P")){
        character2();
      }
      blueselectbox.x = ghostbutton.x;
      blueselectbox.y = ghostbutton.y;
    }
    if(trexbuttonover1 == true&&character1selected == "notselected"){
      if(keyWentDown("D")){
        trexbuttonover1 = false;
        birdbuttonover1 = true;
      }
      if(keyWentDown("A")){
        trexbuttonover1 = false;
        ghostbuttonover1 = true;
      }
      if(keyWentDown("space")){
        character1();
      }
      redselectbox.x = trexbutton.x;
      redselectbox.y = trexbutton.y;
    }
    if(trexbuttonover2 == true&&character2selected == "notselected"){
      if(keyWentDown(RIGHT_ARROW)){
        trexbuttonover2 = false;
        birdbuttonover2 = true;
      }
      if(keyWentDown(LEFT_ARROW)){
        trexbuttonover2 = false;
        ghostbuttonover2 = true;
      }
      if(keyWentDown("P")){
        character2();
      }
      blueselectbox.x = trexbutton.x;
      blueselectbox.y = trexbutton.y;
    } 
    if(birdbuttonover1 == true&&character1selected == "notselected"){
      if(keyWentDown("D")){
        ding1buttonover1 = true;
        birdbuttonover1 = false;
      }
      if(keyWentDown("A")){
        trexbuttonover1 = true;
        birdbuttonover1 = false;
      }
      if(keyWentDown("space")){
        character1();
      }
      redselectbox.x = birdbutton.x;
      redselectbox.y = birdbutton.y;
    }
    if(birdbuttonover2 == true&&character2selected == "notselected"){
      if(keyWentDown(RIGHT_ARROW)){
        ding1buttonover2 = true;
        birdbuttonover2 = false;
      }
      if(keyWentDown(LEFT_ARROW)){
        trexbuttonover2 = true;
        birdbuttonover2 = false;
      }
      if(keyWentDown("P")){
        character2();
      }
      blueselectbox.x = birdbutton.x;
      blueselectbox.y = birdbutton.y;
    }
    if(ding1buttonover1 == true&&character1selected == "notselected"){
      if(keyWentDown("D")){
        ding1buttonover1 = false;
        ding2buttonover1 = true;
      }
      if(keyWentDown("A")){
        birdbuttonover1 = true;
        ding1buttonover1 = false;
      }
      if(keyWentDown("space")){
        character1();
      }
      redselectbox.x = ding1button.x;
      redselectbox.y = ding1button.y;
    }
    if(ding1buttonover2 == true&&character2selected == "notselected"){
      if(keyWentDown(RIGHT_ARROW)){
        ding1buttonover2 = false;
        ding2buttonover2 = true;
      }
      if(keyWentDown(LEFT_ARROW)){
        birdbuttonover2 = true;
        ding1buttonover2 = false;
      }
      if(keyWentDown("P")){
        character2();
      }
      blueselectbox.x = ding1button.x;
      blueselectbox.y = ding1button.y;
    }
    if(ding2buttonover1 == true&&character1selected == "notselected"){
      if(keyWentDown("D")){
        ding2buttonover1 = false;
        dongbuttonover1 = true;
      }
      if(keyWentDown("A")){
        ding2buttonover1 = false;
        ding1buttonover1 = true;
      }
      if(keyWentDown("space")){
        character1();
      }
      redselectbox.x = ding2button.x;
      redselectbox.y = ding2button.y;
    }
    if(ding2buttonover2 == true&&character2selected == "notselected"){
      if(keyWentDown(LEFT_ARROW)){
        ding2buttonover2 = false;
        ding1buttonover2 = true;
      }
      if(keyWentDown(RIGHT_ARROW)){
        ding2buttonover2 = false;
        dongbuttonover2 = true;
      }
      if(keyWentDown("P")){
        character2();
      }
      blueselectbox.x = ding2button.x;
      blueselectbox.y = ding2button.y;
    }
    if(dongbuttonover1 == true&&character1selected == "notselected"){
      if(keyWentDown("A")){
        dongbuttonover1 = false;
        ding2buttonover1 = true;
      }
      if(keyWentDown("space")){
        character1();
      }
      redselectbox.x = dongbutton.x;
      redselectbox.y = dongbutton.y;
    }
    if(dongbuttonover2 == true&&character2selected == "notselected"){
      if(keyWentDown(LEFT_ARROW)){
        dongbuttonover2 = false;
        ding2buttonover2 = true;
      }
      if(keyWentDown("P")){
        character2();
      }
    blueselectbox.x = dongbutton.x;
    blueselectbox.y = dongbutton.y;
    }

  }
  
  //console.log(windowHeight-10);
  if(gamestate == "play"){
  fill('lightgreen');
  stroke('lime')
  text("Jogador 1 "+player1health, 45, 45);
  text("Jogador 2 "+player2health, 45, 75);
  console.log("C, J, H, B 1: ", isCrouching1, isJumping1, player1health, isBlocking1);
  console.log("C, J, H, B 2: ", isCrouching2, isJumping2, player2health, isBlocking2);
    ghostbutton.visible = false;
    trexbutton.visible = false;
    birdbutton.visible = false;
    ding1button.visible = false;
    ding2button.visible = false;
    dongbutton.visible = false;
    redselectbox.visible = false;
    blueselectbox.visible = false;
    if(player1health <=0
    ||player2health <=0){
      gamestate = "gameover";
    }

    if(player1.isTouching(player2)
    &&keyWentDown("F")&&!keyWentDown("K")
    &&isBlocking1 == false&&isBlocking2 == false){
      player2health = player2health-10;
    }
    
    if(keyWentDown("R")&&isJumping1 == false){
      isBlocking1 = true;
    }
    
    if(keyWentUp("R")){
      isBlocking1 = false;
    }
    
    if(keyWentDown("I")&&isJumping2 == false){
      isBlocking2 = true;
    }
    
    if(keyWentUp("I")){
      isBlocking2 = false;
    }
    
    if(player2.isTouching(player1)
    &&keyWentDown("K")&&!keyWentDown("F")
    &&isBlocking1 == false&&isBlocking2 == false){
      player1health = player1health-10;
    }
    
    if(keyDown("W")&&player1.y >= windowHeight -55
    &&isCrouching1 == false&&isBlocking1 == false){
      player1.velocityY = -10;
      isJumping1 = true;
      if(character2selected == "Fantasma"){
        if(left1 == true){
          player1.changeAnimation("ghost", fantasmajump1);
        }
        if(right1 == true){
          player1.changeAnimation("ghost", fantasmajump2);
        }
      }
    }

    if(player1.y >= windowHeight-10){
      isJumping1 = false;
    }
    
    if(keyDown("A")&&isBlocking1 == false&&isCrouching1 == false){
      player1.x = player1.x-4;
    }

    if(keyDown("D")&&isBlocking1 == false&&isCrouching1 == false){
      player1.x = player1.x+4;
    }

    if(keyWentDown("S")&&isJumping1 == false&&isBlocking1 == false){
      isCrouching1 = true;
    }

    if(keyWentUp("S")){
      isCrouching1 = false;
    }

    if(keyDown(UP_ARROW)&&player2.y >= windowHeight-55
    &&isCrouching2 == false&&isBlocking1 == false){
      player2.velocityY = -10;
      isJumping2 = true;
      if(character2selected == "ghost"){
        if(left2 == true){
          player2.changeAnimation("ghost", fantasmajump1);
        }
        if(right2 == true){
          player2.changeAnimation("ghost", fantasmajump2);
        }
      }
    }
    
    if(player2.y >= windowHeight-10){
      isJumping2 = false;
    }
    
    if(keyDown(LEFT_ARROW)&&isBlocking2 == false&&isCrouching1 == false){
      player2.x = player2.x-4;
    }

    if(keyDown(RIGHT_ARROW)&&isBlocking2 == false&&isCrouching1 == false){
      player2.x = player2.x+4;
    }
    
    if(keyWentDown(DOWN_ARROW)&&isJumping2 == false&&isBlocking2 == false){
      isCrouching2 = true;
    }

    if(keyWentUp(DOWN_ARROW)){
      isCrouching2 = false;
    }
    
    player1.velocityY = player1.velocityY+0.8;
    player2.velocityY = player2.velocityY+0.8;
  }
  
  if(gamestate == "gameover"){
    fill('red');
    stroke('darkred');
    textAlign("center");
    text("Fim De Jogo!", width/2, height/2);
    fill('cyan');
    stroke('green');
    text("Clique/Toque Para Jogar De Novo!", width/2, height/2+35);
    if(mousePressedOver(player1)
    ||mousePressedOver(player2)
    ||mousePressedOver(ghostbutton)
    ||mousePressedOver(trexbutton)
    ||mousePressedOver(birdbutton)
    ||mousePressedOver(ding1button)
    ||mousePressedOver(ding2button)
    ||mousePressedOver(dongbutton)
    ||mousePressedOver(scene)){
      reset();
    }
  }
  player1.collide(edges);
  //player1.collide(player2);
  //player1.collide(edges[1]);
  //player1.collide(edges[3]);
  
  player2.collide(edges);
  //player2.collide(player1);
  //player2.collide(edges[1]);
  //player2.collide(edges[3]);
  
  

  drawSprites();
}

/*function mouseClicked(){
  if(gamestate == "select"){
    if(mouseIsOver(ghostbutton)){
      gamestate = "play";
    }
    if(mouseIsOver(trexbutton)){
      gamestate = "play";
    }
    if(mouseIsOver(birdbutton)){
      gamestate = "play";
    }
    if(mouseIsOver(ding1button)){
      gamestate = "play";
    }
    if(mouseIsOver(ding2button)){
      gamestate = "play";
    }
    if(mouseIsOver(dongbutton)){
      gamestate = "play";
    }
  }
}*/

function character1(){
  if(ghostbuttonover1 == true){
    player1.addAnimation("ghost", fantasmaidle1);
    player1.addAnimation("ghost", fantasmajump1);
    player1.addAnimation("ghost", fantasmajump2);
    player1.addAnimation("ghost", fantasmaidle2);
    player1.changeAnimation("ghost", fantasmaidle2);
    //player1.setCollider("rectangle", 15, 30, 185, 245);//ghost collision (right) 
    //soon when all collisions are finished
    player1.scale = 0.3;
    character1selected = "Fantasma";
  }
  if(trexbuttonover1 == true){
    player1.addAnimation("trex", trexrunanm);
    player1.addAnimation("trex_collided", trexcollided);
    player1.addAnimation("trex_collided2", trexcollided2);
    player1.addAnimation("trex_idle", trexidleanm);
    player1.addAnimation("trex_idle2", trexidleanm2);
    player1.changeAnimation("trex", trexrunanm);
    player1.scale = 0.5;
    character1selected = "Trex";
  }
  if(birdbuttonover1 == true){
    player1.addAnimation("bird", birdanm);//left
    player1.addAnimation("bird", birdanm2);//right
    player1.changeAnimation("bird", birdanm2);//right
    player1.scale = 0.51;
    character1selected = "Pterodáctilo";
  }
  if(ding1buttonover1 == true){
    player1.addAnimation("ding1", ding1anm);
    player1.changeAnimation("ding1", ding1anm);
    player1.scale = 1.2;
    character1selected = "Ding";
  }
  if(ding2buttonover1 == true){
    player1.addAnimation("ding2", ding2anm);
    player1.changeAnimation("ding2", ding2anm);
    player1.scale = 1.2;
    character1selected = "Amigo Do Ding";
  }
  if(dongbuttonover1 == true){
    player1.addAnimation("dong", donganm);
    player1.changeAnimation("dong", donganm);
    player1.scale = 1.2;
    character1selected = "Dong";
  }
  player1.visible = true;
}

function character2(){
  if(ghostbuttonover2 == true){
    player2.addAnimation("ghost", fantasmaidle2);
    player2.addAnimation("ghost", fantasmajump1);
    player2.addAnimation("ghost", fantasmajump2);
    player2.addAnimation("ghost", fantasmaidle1);
    player2.changeAnimation("ghost", fantasmaidle1);
    //player2.setCollider("rectangle", -15, 30, 185, 245);//ghost collision (left)
    //soon when all collisions are finished
    player2.scale = 0.3;
    character2selected = "Fantasma";
  }
  if(trexbuttonover2 == true){
    player2.addAnimation("trex", trexrunanm);
    player2.addAnimation("trex_collided", trexcollided);
    player2.addAnimation("trex_collided2", trexcollided2);
    player2.addAnimation("trex_idle", trexidleanm);
    player2.addAnimation("trex_idle2", trexidleanm2);
    player2.changeAnimation("trex", trexrunanm);
    player2.scale = 0.5;
    character2selected = "Trex";
  }
  if(birdbuttonover2 == true){
    player2.addAnimation("bird", birdanm);//left
    player2.addAnimation("bird2", birdanm2);//right
    player2.changeAnimation("bird", birdanm);//left
    player2.scale = 0.51;
    character2selected = "Pterodáctilo";
  }
  if(ding1buttonover2 == true){
    player2.addAnimation("ding1", ding1anm);
    player2.changeAnimation("ding1", ding1anm);
    player2.scale = 1.2;
    character2selected = "Ding";
  }
  if(ding2buttonover2 == true){
    player2.addAnimation("ding2", ding2anm);
    player2.changeAnimation("ding2", ding2anm);
    player2.scale = 1.2;
    character2selected = "Amigo Do Ding";
  }
  if(dongbuttonover2 == true){
    player2.addAnimation("dong", donganm);
    player2.changeAnimation("dong", donganm);
    player2.scale = 1.2;
    character2selected = "Dong";
  }
  player2.visible = true;
}

function reset(){
  gamestate = "select";
  character1selected = "notselected";
  character2selected = "notselected";
  player1.visible = false;
  player2.visible = false;
  ghostbutton.visible = true;
  trexbutton.visible = true;
  birdbutton.visible = true;
  ding1button.visible = true;
  ding2button.visible = true;
  dongbutton.visible = true;
  player1health = 100;
  player2health = 100;
  player1.x = width/2 - width/2/2;
  player1.y = windowHeight - 55;
  player2.x = width/2 + width/2/2;
  player2.y = windowHeight - 55;
}