var player1, player2;
var gamestate = "select";
var edges, scene;
var isCrouching1 = false, isCrouching2 = false;
var isJumping1 = false, isJumping2 = false;
var player1health = 100, player2health = 100;
var isBlocking1 = false, isBlocking2 = false;
var left1 = false, right1 = true, left2 = true, right2 = false;
var backgroundplanetimg, backgroundsnowimg, backgroundforestimg, backgroundbattlezoneimg, baseimg, 
backgroundpacmanimg, pacmanfloor, backgroundmarioimg, 
redselectbox, redselectboximg, blueselectbox, blueselectboximg,
birdanm, birdanm2, 
ding1anm, ding2anm, donganm, stackeddongsanm, 
snowmanidleanm, snowmanidleanm2, fireanm, fire2anm, 
trexidleanm, trexidleanm2, trexrunanm, trexrunanm2, trexidleanm2, trexcollided, trexcollided2, 
fantasmaidle1, fantasmaidle2, fantasmajump1, fantasmajump2;
var ghostbutton, trexbutton, ding1button, ding2button, dongbutton, birdbutton, 
snowmanbutton, fire1button, fire2button, 
ghostbuttonover1 = true, trexbuttonover1 = false, ding1buttonover1 = false, 
ding2buttonover1 = false, dongbuttonover1 = false, birdbuttonover1 = false, 
snowmanbuttonover1 = false, fire1buttonover1 = false, fire2buttonover1 = false, 
zombiebuttonover1 = false, ghostbuttonover2 = true, trexbuttonover2 = false, 
ding1buttonover2 = false, ding2buttonover2 = false, dongbuttonover2 = false, 
birdbuttonover2 = false, snowmanbuttonover2 = false, fire1buttonover2 = false, 
fire2buttonover2 = false, zombiebuttonover2 = false;
var character1selected = "notselected", character2selected = "notselected";
var mapselected = "notselected", selectrandommap;
var basesG, basesactive = false;
var wallsG, mazeactive = false, 
teleportleft, teleportright, 
powerup1, powerup2, powerup3, powerup4, 
powerup1Taken, powerup2Taken, powerup3Taken, powerup4Taken;
var bricksG, marioactive = false, 
luckyblock1, luckyblock1activated = false, 
luckyblock2, luckyblock2activated = false, pipe;//, mushroom;
var player1baseY, player2baseY;
var jumplimit, jumplimit2;
var player1victory = false, player2victory = false;
var hitbox1, hitbox2;
var leftarrow, leftarrowimg, 
rightarrow, rightarrowimg;
var WW, WH;

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function preload(){
  leftarrowimg = loadImage("left_arrow.png");
  rightarrowimg = loadImage("right_arrow.png");
  backgroundplanetimg = loadImage("backgroundplanet.png");
  backgroundsnowimg = loadImage("./Mundos/Desviando De Fogo/backgroundsnow.png");
  backgroundforestimg = loadImage("./Mundos/Arqueiro Épico/backgroundforest.png");
  baseimg = loadAnimation("./Mundos/Arqueiro Épico/base.png");
  backgroundbattlezoneimg = loadImage("./Mundos/Invasão Pirata/backgroundbattlezone.gif");
  backgroundpacmanimg = loadImage("backgroundpacman.jpg");
  backgroundmarioimg = loadImage("backgroundmario.jpg");
  birdanm = loadAnimation("./Mundos/Trex-Dinossauros/bird1.png", 
  "./Mundos/Trex-Dinossauros/bird2.png");
  birdanm2 = loadAnimation("./Mundos/Trex-Dinossauros/bird1_2.png", 
  "./Mundos/Trex-Dinossauros/bird2_2.png");
  donganm = loadAnimation("./Mundos/O Jogo Mais Difícil Do Mundo/enemy.png");
  stackeddongsanm = loadAnimation("./Mundos/O Jogo Mais Difícil Do Mundo/stackedenemies.png");
  ding1anm = loadAnimation("./Mundos/O Jogo Mais Difícil Do Mundo/friendOG.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friendOG.png",
  "./Mundos/O Jogo Mais Difícil Do Mundo/friendOG.png",  
  "./Mundos/O Jogo Mais Difícil Do Mundo/friendOG.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friendOG.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friendOG.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friendOG.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friend-closingeyes1.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friend-closingeyes2.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friend-closedeyes.png", );
  ding2anm = loadAnimation("./Mundos/O Jogo Mais Difícil Do Mundo/friend2OG.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friend2OG.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friend2OG.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friend2OG.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friend2OG.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friend2OG.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friend2-closingeyes1.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friend2-closingeyes2.png", 
  "./Mundos/O Jogo Mais Difícil Do Mundo/friend2-closedeyes.png");
  trexrunanm = loadAnimation("./Mundos/Trex-Dinossauros/trex1.png", 
  "./Mundos/Trex-Dinossauros/trex3.png", 
  "./Mundos/Trex-Dinossauros/trex4.png");
  trexidleanm = loadAnimation("./Mundos/Trex-Dinossauros/trex_idle.png");
  trexidleanm2 = loadAnimation("./Mundos/Trex-Dinossauros/trex_idle_2.png");
  trexcollided = loadAnimation("./Mundos/Trex-Dinossauros/trex_collided.png");
  trexcollided2 = loadAnimation("./Mundos/Trex-Dinossauros/trex_collided_2.png");
  fantasmaidle1 = loadAnimation("./Mundos/Fantasma/ghost-standing.png");
  fantasmaidle2 = loadAnimation("./Mundos/Fantasma/ghost-standing_2.png");
  fantasmajump1 = loadAnimation("./Mundos/Fantasma/ghost-jumping.png");
  fantasmajump2 = loadAnimation("./Mundos/Fantasma/ghost-jumping_2.png");
  redselectboximg = loadImage("redhalfselectbox.png");
  blueselectboximg = loadImage("bluehalfselectbox.png");
  snowmanidleanm = loadAnimation("./Mundos/Desviando De Fogo/Snowman.png");
  snowmanidleanm2 = loadAnimation("./Mundos/Desviando De Fogo/Snowman_2.png");
  fireanm = loadAnimation("./Mundos/Desviando De Fogo/fire1small.png");
  fire2anm = loadAnimation("./Mundos/Desviando De Fogo/fire2small.png");
  pacmanfloor = loadImage("pacmanfloor.jpg");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  WW = windowWidth;
  WH = windowHeight;

  powerup1Taken = createSprite(windowWidth + 1000, windowHeight);
  //windowWidth - 51, windowHeight / 2 + 185, 30, 25);
  powerup1Taken.shapeColor = "black";
  powerup1Taken.visible = false;
  powerup1Taken.addImage("floor", pacmanfloor);
  powerup1Taken.scale = 0.7;

  powerup2Taken = createSprite(windowWidth + 1000, windowHeight);
  //windowWidth - 51, windowHeight / 2 + 185, 30, 25);
  powerup2Taken.shapeColor = "black";
  powerup2Taken.visible = false;
  powerup2Taken.addImage("floor", pacmanfloor);
  powerup2Taken.scale = 0.7;

  powerup3Taken = createSprite(windowWidth + 1000, windowHeight);
  //windowWidth - 51, windowHeight / 2 + 185, 30, 25);
  powerup3Taken.shapeColor = "black";
  powerup3Taken.visible = false;
  powerup3Taken.addImage("floor", pacmanfloor);
  powerup3Taken.scale = 0.7;

  powerup4Taken = createSprite(windowWidth + 1000, windowHeight);
  //windowWidth - 51, windowHeight / 2 + 185, 30, 25);
  powerup4Taken.shapeColor = "black";
  powerup4Taken.visible = false;
  powerup4Taken.addImage("floor", pacmanfloor);
  powerup4Taken.scale = 0.7;
  
  luckyblock1 = createSprite(width/2+130, height/2+45, 91, 25);
  luckyblock2 = createSprite(width/2+37, 89, 77, 25);
  pipe = createSprite(width/2+660, windowHeight - 265, 161, 25);
  luckyblock1.visible = false;
  luckyblock2.visible = false;
  pipe.visible = false;
  
  leftarrow = createSprite(width/2 - 95, windowHeight - 45);
  leftarrow.addImage("leftarrow", leftarrowimg);
  
  rightarrow = createSprite(width/2 + 95, windowHeight - 45)
  rightarrow.addImage("rightarrow", rightarrowimg);
  
  hitbox1 = createSprite(width/2 - width/2/2, windowHeight - 55, 20, 20);
  hitbox2 = createSprite(width/2 + width/2/2, windowHeight - 55, 20, 20);
  hitbox1.setCollider("rectangle", 0, 0, 120, 120);
  hitbox2.setCollider("rectangle", 0, 0, 120, 120);
  hitbox1.visible = false;
  hitbox2.visible = false;
  //hitbox1.debug = true;
  //hitbox1.debug = true;
  
  jumplimit = windowHeight - 55;
  jumplimit2 = windowHeight + 50;

  basesG = new Group();
  wallsG = new Group();
  bricksG = new Group();
  
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
  birdbutton.addAnimation("bird2", birdanm2);
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
  
  snowmanbutton = createSprite(285, 45, 15, 15);
  snowmanbutton.addAnimation("snowman", snowmanidleanm2);
  snowmanbutton.scale = 0.1;
  
  fire1button = createSprite(325, 45, 15, 15);
  fire1button.addAnimation("fire1", fireanm);
  fire1button.scale = 0.055;
  
  fire2button = createSprite(365, 45, 15, 15);
  fire2button.addAnimation("fire2", fire2anm);
  fire2button.scale = 0.075;
  
  player1 = createSprite(width/2 - width/2/2, windowHeight - 55, 20, 20);
  player2 = createSprite(width/2 + width/2/2, windowHeight - 55, 20, 20);
  player1.visible = false;
  player2.visible = false;
  //player1.debug = true;
  //player2.debug = true;

  //Adding Animations For Player 1.
  //Fantasma.
  player1.addAnimation("ghost", fantasmaidle1);
  player1.addAnimation("ghost", fantasmajump1);
  player1.addAnimation("ghost", fantasmajump2);
  player1.addAnimation("ghost", fantasmaidle2);
  //Trex.
  player1.addAnimation("trex", trexrunanm);
  player1.addAnimation("trex_collided", trexcollided);
  player1.addAnimation("trex_collided2", trexcollided2);
  player1.addAnimation("trex_idle", trexidleanm);
  player1.addAnimation("trex_idle2", trexidleanm2);
  //Pterodáctilo.
  player1.addAnimation("bird", birdanm);//left
  player1.addAnimation("bird2", birdanm2);//right
  //Adding Animations For Player 2.
  //Fantasma.
  player2.addAnimation("ghost", fantasmaidle2);
  player2.addAnimation("ghost", fantasmajump1);
  player2.addAnimation("ghost", fantasmajump2);
  player2.addAnimation("ghost", fantasmaidle1);
  //Trex.
  player2.addAnimation("trex", trexrunanm);
  player2.addAnimation("trex_collided", trexcollided);
  player2.addAnimation("trex_collided2", trexcollided2);
  player2.addAnimation("trex_idle", trexidleanm);
  player2.addAnimation("trex_idle2", trexidleanm2);
  //Pterodáctilo.
  player2.addAnimation("bird", birdanm);//left
  player2.addAnimation("bird2", birdanm2);//right

  edges = createEdgeSprites();
}

function draw(){
  background('white');
  
  hitbox1.x = player1.x;
  hitbox1.y = player1.y;
  hitbox2.x = player2.x;
  hitbox2.y = player2.y;
  
  //soon
  //if(character1selected == "Fantasma"){
  //  player1.setCollider("rectangle", +13, +3, 25, 85);//right
  //}
  //soon
  //if(character2selected == "Fantasma"){
  //  player2.setCollider("rectangle", -13, +3, 25, 85);//left
  //}
  
  if(mapselected == "Espaço"){
    image(backgroundplanetimg, 0, 0, width, height);
  }
  
  if(mapselected == "Floresta De Neve"){
    image(backgroundsnowimg, 0, 0, width, height);
  }
  
  if(mapselected == "Floresta Chuvosa"){
    image(backgroundforestimg, 0, 0, width, height);
    if(basesactive == false){
      activateBases();
    }
    if(player1.isTouching(edges[3])){
      player1health = 0;
      player2victory = true;
      player1.visible = false;
    }
    if(player2.isTouching(edges[3])){
      player2health = 0;
      player1victory = true;
      player2.visible = false;
    }
    player1.collide(basesG);
    player2.collide(basesG);
  }
  
  if(mapselected == "Zona De Batalha"){
    image(backgroundbattlezoneimg, 0, 0, width, height);
  }
  if(mapselected == "Labirinto Do Pac Man"){
    image(backgroundpacmanimg, 0, 0, width, height);
    if(mazeactive == false){
      activateMaze();
    }
    if(player1.isTouching(powerup1) && powerup1Taken.visible == false){
      powerup1Taken.visible = true;
    }
    if(player2.isTouching(powerup1) && powerup1Taken.visible == false){
      powerup1Taken.visible = true;
    }
    if(player1.isTouching(powerup2) && powerup2Taken.visible == false){
      powerup2Taken.visible = true;
    }
    if(player2.isTouching(powerup2) && powerup2Taken.visible == false){
      powerup2Taken.visible = true;
    }
    if(player1.isTouching(powerup3) && powerup3Taken.visible == false){
      powerup3Taken.visible = true;
    }
    if(player2.isTouching(powerup3) && powerup3Taken.visible == false){
      powerup3Taken.visible = true;
    }
    if(player1.isTouching(powerup4) && powerup4Taken.visible == false){
      powerup4Taken.visible = true;
    }
    if(player2.isTouching(powerup4) && powerup4Taken.visible == false){
      powerup4Taken.visible = true;
    }
    if(player1.isTouching(teleportleft)){
      player1.x = WW - 50;
      console.log("Player1touched=teleportleft")
    }
    if(player2.isTouching(teleportleft)){
      player2.x = WW - 50;
      console.log("Player2touched=teleportleft")
    }
    if(player1.isTouching(teleportright)){
      player1.x = 50;
      console.log("Player1touched=teleportright")
    }
    if(player2.isTouching(teleportright)){
      player2.x = 50;
      console.log("Player2touched=teleportright")
    }
    player1.collide(wallsG);
    player2.collide(wallsG);
  }
  if(mapselected == "Mario"){
    image(backgroundmarioimg, 0, 0, width, height);
    if(marioactive == false){
      activateMario();
    }
    player1.collide(bricksG);
    player2.collide(bricksG);
    if(marioactive == true){
      if(player1.isTouching(luckyblock1) && luckyblock1activated == false){
        player1health = player1health + 10;
        luckyblock1activated = true;
        //bricksG.add(luckyblock1);
      }
      if(player1.isTouching(luckyblock2) && luckyblock2activated == false){
        player1health = player1health + 10;
        luckyblock2activated = true;
        //bricksG.add(luckyblock2);
      }
      if(player2.isTouching(luckyblock1) && luckyblock1activated == false){
        player2health = player2health + 10;
        luckyblock1activated = true;
        //bricksG.add(luckyblock1);
      }
      if(player2.isTouching(luckyblock2) && luckyblock2activated == false){
        player2health = player2health + 10;
        luckyblock2activated = true;
        //bricksG.add(luckyblock2);
      }
      if(player1.isTouching(pipe) && keyWentDown("S")){
        
      }
      if(player2.isTouching(pipe) && keyWentDown(DOWN_ARROW)){
        
      }
    }
  }
  
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
  /*if(left1 == true && isJumping1 == false){
    if(character1selected == "Fantasma"){
      player1.changeAnimation("ghost", fantasmaidle1);
      player1.setCollider("rectangle", -15, 30, 185, 245);//ghost collision (left)
    }
  }
  if(right1 == true && isJumping1 == false){
    if(character1selected == "Fantasma"){
      player1.changeAnimation("ghost", fantasmaidle2);
      player1.setCollider("rectangle", 15, 30, 185, 245);//ghost collision (right)
    }
  }
  if(left2 == true && isJumping2 == false){
    if(character2selected == "Fantasma"){
      player2.changeAnimation("ghost", fantasmaidle1);
      player2.setCollider("rectangle", -15, 30, 185, 245);//ghost collision (left)
    }
  }
  if(right2 == true && isJumping2 == false){
    if(character2selected == "Fantasma"){
      player2.changeAnimation("ghost", fantasmaidle2);
      player2.setCollider("rectangle", 15, 30, 185, 245);//ghost collision (right)
    }
  }*/
  if(gamestate == "select"){
    if(isMobile){
      leftarrow.y = windowHeight - 45;
      rightarrow.y = windowHeight - 45;
    }
    if(mapselected == "Floresta Chuvosa"){
      player1.y = player1baseY - 55;
      player2.y = player2baseY - 55;
    }
    if(mapselected == "Labirinto Do Pac Man"){
      player1.y = player1baseY - 55;
      player2.y = player2baseY - 55;
    }
    if(mapselected !== "notselected"){
      fill('cyan');
      stroke('green');
      textAlign("center");
      text("Mapa Selecionado: "+mapselected+".", width/2, 125);
    }
    console.log(character1selected, character2selected);
    console.log(ghostbuttonover1, trexbuttonover1, birdbuttonover1, ding1buttonover1, 
    ding2buttonover1, dongbuttonover1, 
    snowmanbuttonover1, fire1buttonover1, fire2buttonover1);
    console.log(ghostbuttonover2, trexbuttonover2, birdbuttonover2, ding1buttonover2, 
    ding2buttonover2, dongbuttonover2, 
    snowmanbuttonover1, fire1buttonover1, fire2buttonover1);
    selectmap();
    if(/*character1selected == "Fantasma" && character2selected == "Fantasma"
    ||character1selected == "Trex"&&character2selected == "Trex"
    ||character1selected == "Pterodáctilo"&&character2selected == "Pterodáctilo"
    ||character1selected == "Ding"&&character2selected == "Ding"
    ||character1selected == "Amigo Do Ding"&&character2selected == "Amigo Do Ding"
    ||character1selected == "dong"&&character2selected == "Dong"){*/
    character1selected !== "notselected" && character2selected !== "notselected"){
      fill('cyan');
      stroke('green');
      textAlign("center");
      if(isMobile){
        text("Toque Na Tela Para Começar!", width/2, height/2);
      }else{
        text("Clique Na Tela Para Começar!", width/2, height/2);
      }
      
      if(mousePressedOver(player1)
      ||mousePressedOver(player2)
      ||mousePressedOver(ghostbutton)
      ||mousePressedOver(trexbutton)
      ||mousePressedOver(birdbutton)
      ||mousePressedOver(ding1button)
      ||mousePressedOver(ding2button)
      ||mousePressedOver(dongbutton)
      ||mousePressedOver(snowmanbutton)
      ||mousePressedOver(fire1button)
      ||mousePressedOver(fire2button)
      ||mousePressedOver(scene)){
        gamestate = "play";
      }
    }
    if(character1selected !== "notselected" && character2selected == "notselected"){
      fill('cyan');
      stroke('green');
      textAlign("center");
      text(character1selected+" Selecionado Para Jogador 1.", width/2, 95);
    }
    if(character2selected !== "notselected" && character1selected == "notselected"){
      fill('cyan');
      stroke('green');
      textAlign("center");
      text(character2selected+" Selecionado Para Jogador 2.", width/2, 95);
    }
    if(character1selected !== "notselected" && character2selected !== "notselected"){
      fill('cyan');
      stroke('green');
      textAlign("center");
      text(character1selected+ " E "+ character2selected+" Selecionado Para Os Jogadores.", width/2, 155);
    }  
    
    if(/*character1selected == "Fantasma" && keyWentDown("Y")
    ||character1selected == "Trex" && keyWentDown("Y")
    ||character1selected == "Pterodáctilo" && keyWentDown("Y")
    ||character1selected == "Ding" && keyWentDown("Y")
    ||character1selected == "Amigo Do Ding" && keyWentDown("Y")
    ||character1selected == "Dong" && keyWentDown("Y")
    ||character1selected == "Boneco De Neve" && keyWentDown("Y")
    ||character1selected == "Fogo Laranja" && keyWentDown("Y")
    ||character1selected == "Fogo Vermelho" && keyWentDown("Y")*/
    character1selected !== "notselected" && keyWentDown("Y")){
      character1selected = "notselected";
      player1.visible = false;
    }
    if(/*character2selected == "Fantasma" && keyWentDown("O")
    ||character2selected == "Trex" && keyWentDown("O")
    ||character2selected == "Pterodáctilo" && keyWentDown("O")
    ||character2selected == "Ding" && keyWentDown("O")
    ||character2selected == "Amigo Do Ding" && keyWentDown("O")
    ||character2selected == "Dong" && keyWentDown("O")
    ||character2selected == "Boneco De Neve" && keyWentDown("O")
    ||character2selected == "Fogo Laranja" && keyWentDown("O")
    ||character2selected == "Fogo Vermelho" && keyWentDown("O")*/
    character2selected !== "notselected" && keyWentDown("O")){
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
      if(keyWentDown("D")){
        dongbuttonover1 = false;
        snowmanbuttonover1 = true;
      }
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
    if(dongbuttonover2 == true && character2selected == "notselected"){
      if(keyWentDown(RIGHT_ARROW)){
        dongbuttonover2 = false;
        snowmanbuttonover2 = true;
      }
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
    if(snowmanbuttonover1 == true && character1selected == "notselected"){
      if(keyWentDown("D")){
        fire1buttonover1 = true;
        snowmanbuttonover1 = false;
      }
      if(keyWentDown("A")){
        dongbuttonover1 = true;
        snowmanbuttonover1 = false;
      }
      if(keyWentDown("space")){
        character1();
      }
      redselectbox.x = snowmanbutton.x;
      redselectbox.y = snowmanbutton.y;
    }
    if(snowmanbuttonover2 == true && character2selected == "notselected"){
      if(keyWentDown(RIGHT_ARROW)){
        fire1buttonover2 = true;
        snowmanbuttonover2 = false;
      }
      if(keyWentDown(LEFT_ARROW)){
        dongbuttonover2 = true;
        snowmanbuttonover2 = false;
      }
      if(keyWentDown("P")){
        character2();
      }
      blueselectbox.x = snowmanbutton.x;
      blueselectbox.y = snowmanbutton.y;
    }
    if(fire1buttonover1 == true && character1selected == "notselected"){
      if(keyWentDown("D")){
        fire2buttonover1 = true;
        fire1buttonover1 = false;
      }
      if(keyWentDown("A")){
        snowmanbuttonover1 = true;
        fire1buttonover1 = false;
      }
      if(keyWentDown("space")){
        character1();
      }
      redselectbox.x = fire1button.x;
      redselectbox.y = fire1button.y;
    }
    if(fire1buttonover2 == true && character2selected == "notselected"){
      if(keyWentDown(RIGHT_ARROW)){
        fire2buttonover2 = true;
        fire1buttonover2 = false;
      }
      if(keyWentDown(LEFT_ARROW)){
        snowmanbuttonover2 = true;
        fire1buttonover2 = false;
      }
      if(keyWentDown("P")){
        character2();
      }
      blueselectbox.x = fire1button.x;
      blueselectbox.y = fire1button.y;
    }
    if(fire2buttonover1 == true && character1selected == "notselected"){
      if(keyWentDown("A")){
        fire1buttonover1 = true;
        fire2buttonover1 = false;
      }
      if(keyWentDown("space")){
        character1();
      }
      redselectbox.x = fire2button.x;
      redselectbox.y = fire2button.y;
    }
    if(fire2buttonover2 == true && character2selected == "notselected"){
      if(keyWentDown(LEFT_ARROW)){
        fire1buttonover2 = true;
        fire2buttonover2 = false;
      }
      if(keyWentDown("P")){
        character2();
      }
      blueselectbox.x = fire2button.x;
      blueselectbox.y = fire2button.y;
    }
    
  }
  
  //console.log(windowHeight-10);
  if(gamestate == "play"){
    if(isMobile){
      leftarrow.y = 45;
      rightarrow.y = 45;
    }
    fill('lightgreen');
    stroke('lime')
    text("Jogador 1 "+player1health, 45, 45);
    text("Jogador 2 "+player2health, width - 305, 45);//45, 75
    console.log("C, J, H, B 1: ", isCrouching1, isJumping1, player1health, isBlocking1);
    console.log("C, J, H, B 2: ", isCrouching2, isJumping2, player2health, isBlocking2);
    ghostbutton.visible = false;
    trexbutton.visible = false;
    birdbutton.visible = false;
    ding1button.visible = false;
    ding2button.visible = false;
    dongbutton.visible = false;
    snowmanbutton.visible = false;
    fire1button.visible = false;
    fire2button.visible = false;
    redselectbox.visible = false;
    blueselectbox.visible = false;
    if(player2health <= 0){
      if(player2victory == false){
        player1victory = true;
      }
      gamestate = "gameover";
    }
    if(player1health <= 0){
      if(player1victory == false){
        player2victory = true;
      }
      gamestate = "gameover";
    }
    
    if(//hitbox1.isTouching(hitbox2)
    player1.isTouching(player2)
    &&keyWentDown("F")&&!keyWentDown("K")
    &&isBlocking1 == false&&isBlocking2 == false){
      player2health = player2health-10;
    }
    
    if(keyWentDown("R")&&isJumping1 == false){
      isBlocking1 = true;
      if(character1selected == "Dong"){
        player1.changeAnimation("Dong", donganm);
      }
    }
    
    if(keyWentUp("R")){
      isBlocking1 = false;
      if(character1selected == "Dong"){
        player1.changeAnimation("Dongs", stackeddongsanm);
      }
    }
    
    if(keyWentDown("I")&&isJumping2 == false){
      isBlocking2 = true;
    }
    
    if(keyWentUp("I")){
      isBlocking2 = false;
    }
    
    if(//hitbox2.isTouching(hitbox1)
    player2.isTouching(player1)
    &&keyWentDown("K")&&!keyWentDown("F")
    &&isBlocking1 == false&&isBlocking2 == false){
      player1health = player1health-10;
    }
    if(keyDown("W") && player1.y >= jumplimit && jumplimit2 >= player1.y
    && isCrouching1 == false && isBlocking1 == false){
      if(mapselected !== "Labirinto Do Pac Man"){
        player1.velocityY = -15;
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
      if(mapselected == "Labirinto Do Pac Man"){
        player1.y = player1.y - 4;
      }
    }
    
    if(player1.y >= windowHeight-10){
      isJumping1 = false;
    }
    
    if(keyDown("A") && isBlocking1 == false && isCrouching1 == false){
      player1.x = player1.x - 4;
    }

    if(keyDown("D") && isBlocking1 == false && isCrouching1 == false){
      player1.x = player1.x + 4;
    }

    if(keyWentDown("S") && isJumping1 == false && isBlocking1 == false 
    && mapselected !== "Labirinto Do Pac Man"){
      isCrouching1 = true;
      if(character1selected == "Dong"){
        player1.changeAnimation("dong", donganm);
      }
    }
    if(keyDown("S") && mapselected == "Labirinto Do Pac Man"){
      player1.y = player1.y+4;
    }

    if(keyWentUp("S") && mapselected !== "Labirinto Do Pac Man"){
      isCrouching1 = false;
      if(character1selected == "Dong"){
        player1.changeAnimation("dongs", stackeddongsanm);
      }
    }
    if(keyDown(UP_ARROW) && player2.y >= jumplimit && jumplimit2 >= player2.y
      && isCrouching2 == false && isBlocking1 == false){
        if(mapselected !== "Labirinto Do Pac Man"){
          player2.velocityY = -15;
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
      if(mapselected == "Labirinto Do Pac Man"){
        player2.y = player2.y - 4;
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
    
    if(keyWentDown(DOWN_ARROW)&&isJumping2 == false&&isBlocking2 == false
    && mapselected !== "Labirinto Do Pac Man"){
      isCrouching2 = true;
      if(character1selected == "Dong"){
        player2.changeAnimation("dong", donganm);
      }
    }
    if(keyDown(DOWN_ARROW) && mapselected == "Labirinto Do Pac Man"){
      player2.y = player2.y+4;
    }
    if(keyWentUp(DOWN_ARROW) && mapselected !== "Labirinto Do Pac Man"){
      isCrouching2 = false;
      if(character2selected == "Dong"){
        player2.changeAnimation("dongs", stackeddongsanm);
      }
    }
    
    if(mapselected !== "Labirinto Do Pac Man"){
      player1.velocityY = player1.velocityY + 0.8;
      player2.velocityY = player2.velocityY + 0.8;
    }
    

  }
  
  if(gamestate == "gameover"){
    leftarrow.visible = false;
    leftarrow.y = windowHeight - 45;
    rightarrow.visible = false;
    rightarrow.y = windowHeight - 45;
    if(player1health <= 0 && player1victory == true){
      player1health = 10;
    }
    if(player2health <= 0 && player2victory == true){
      player2health = 10;
    }
    fill('red');
    stroke('darkred');
    textAlign("center");
    text("Fim De Jogo!", width/2, height/2);
    fill('gold');
    stroke('green');
    player1.velocityY = 0;
    player2.velocityY = 0;
    if(player1health <= 0){
      text("Jogador 2 Ganhou!", width/2, height/2+65);
    }
    if(player2health <= 0){
      text("Jogador 1 Ganhou!", width/2, height/2+65);
    }
    fill('cyan');
    text("Clique/Toque Para Jogar De Novo!", width/2, height/2+35);
    if(mousePressedOver(player1)
    ||mousePressedOver(player2)
    ||mousePressedOver(ghostbutton)
    ||mousePressedOver(trexbutton)
    ||mousePressedOver(birdbutton)
    ||mousePressedOver(ding1button)
    ||mousePressedOver(ding2button)
    ||mousePressedOver(dongbutton)
    ||mousePressedOver(snowmanbutton)
    ||mousePressedOver(fire1button)
    ||mousePressedOver(fire2button)
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
    /*
    player1.addAnimation("ghost", fantasmaidle1);
    player1.addAnimation("ghost", fantasmajump1);
    player1.addAnimation("ghost", fantasmajump2);
    player1.addAnimation("ghost", fantasmaidle2);
    */
    player1.changeAnimation("ghost", fantasmaidle2);
    //player1.setCollider("rectangle", 15, 30, 185, 245);//ghost collision (right) 
    //soon when all collisions are finished
    player1.scale = 0.3;
    character1selected = "Fantasma";
  }
  if(trexbuttonover1 == true){
    /*
    player1.addAnimation("trex", trexrunanm);
    player1.addAnimation("trex_collided", trexcollided);
    player1.addAnimation("trex_collided2", trexcollided2);
    player1.addAnimation("trex_idle", trexidleanm);
    player1.addAnimation("trex_idle2", trexidleanm2);
    */
    player1.changeAnimation("trex", trexrunanm);
    player1.scale = 0.5;
    character1selected = "Trex";
  }
  if(birdbuttonover1 == true){
    /*
    player1.addAnimation("bird", birdanm);//left
    player1.addAnimation("bird2", birdanm2);//right
    */
    player1.changeAnimation("bird2", birdanm2);//right
    //player1.setCollider("rectangle", 0, 0, 90, 185);//bird collision
    //soon when all collisions are finished
    player1.scale = 0.58;
    character1selected = "Pterodáctilo";
  }
  if(ding1buttonover1 == true){
    player1.addAnimation("ding1", ding1anm);
    player1.changeAnimation("ding1", ding1anm);
    player1.scale = 2.2;
    character1selected = "Ding";
  }
  if(ding2buttonover1 == true){
    player1.addAnimation("ding2", ding2anm);
    player1.changeAnimation("ding2", ding2anm);
    player1.scale = 2.2;
    character1selected = "Amigo Do Ding";
  }
  if(dongbuttonover1 == true){
    player1.addAnimation("dong", donganm);
    player1.addAnimation("dongs", stackeddongsanm);
    player1.changeAnimation("dongs", stackeddongsanm);
    player1.scale = 2.2;
    character1selected = "Dong";
  }
  if(snowmanbuttonover1 == true){
    player2.addAnimation("snowman", snowmanidleanm);//left
    player1.addAnimation("snowman", snowmanidleanm2);//right
    player1.changeAnimation("snowman", snowmanidleanm2);//right
    player1.scale = 0.2;
    character1selected = "Boneco De Neve";
  }
  if(fire1buttonover1 == true){
    player1.addAnimation("fire1", fireanm);
    player1.changeAnimation("fire1", fireanm);
    player1.scale = 0.055;
    character1selected = "Fogo Laranja";
  }
  if(fire2buttonover1 == true){
    player1.addAnimation("fire2", fire2anm);
    player1.changeAnimation("fire2", fire2anm);
    player1.scale = 0.075;
    character1selected = "Fogo Vermelho";
  }
  player1.visible = true;
  if(mapselected == "Labirinto Do Pac Man"){
    player1.scale = player1.scale / 2;
  }
}

function character2(){
  if(ghostbuttonover2 == true){
    /*
    player2.addAnimation("ghost", fantasmaidle2);
    player2.addAnimation("ghost", fantasmajump1);
    player2.addAnimation("ghost", fantasmajump2);
    player2.addAnimation("ghost", fantasmaidle1);
    */
    player2.changeAnimation("ghost", fantasmaidle1);
    //player2.setCollider("rectangle", -15, 30, 185, 245);//ghost collision (left)
    //soon when all collisions are finished
    player2.scale = 0.3;
    character2selected = "Fantasma";
  }
  if(trexbuttonover2 == true){
    /*
    player2.addAnimation("trex", trexrunanm);
    player2.addAnimation("trex_collided", trexcollided);
    player2.addAnimation("trex_collided2", trexcollided2);
    player2.addAnimation("trex_idle", trexidleanm);
    player2.addAnimation("trex_idle2", trexidleanm2);
    */
    //player2.changeAnimation("trex", trexrunanm);
    player2.scale = 0.5;
    character2selected = "Trex";
  }
  if(birdbuttonover2 == true){
    /*
    player2.addAnimation("bird", birdanm);//left
    player2.addAnimation("bird2", birdanm2);//right
    */
    player2.changeAnimation("bird", birdanm);//left
    //player2.setCollider("rectangle", 0, 0, 90, 185);//bird collision
    //soon when all collisions are finished
    player2.scale = 0.58;
    character2selected = "Pterodáctilo";
  }
  if(ding1buttonover2 == true){
    player2.addAnimation("ding1", ding1anm);
    player2.changeAnimation("ding1", ding1anm);
    player2.scale = 2.2;
    character2selected = "Ding";
  }
  if(ding2buttonover2 == true){
    player2.addAnimation("ding2", ding2anm);
    player2.changeAnimation("ding2", ding2anm);
    player2.scale = 2.2;
    character2selected = "Amigo Do Ding";
  }
  if(dongbuttonover2 == true){
    player2.addAnimation("dong", donganm);
    player2.addAnimation("dongs", stackeddongsanm);
    player2.changeAnimation("dongs", stackeddongsanm);
    player2.scale = 2.2;
    character2selected = "Dong";
  }
  if(snowmanbuttonover2 == true){
    player2.addAnimation("snowman", snowmanidleanm2);//right
    player2.addAnimation("snowman", snowmanidleanm);//left
    player2.changeAnimation("snowman", snowmanidleanm);//left
    player2.scale = 0.2;
    character2selected = "Boneco De Neve";
  }
  if(fire1buttonover2 == true){
    player2.addAnimation("fire1", fireanm);
    player2.changeAnimation("fire1", fireanm);
    player2.scale = 0.055;
    character2selected = "Fogo Laranja";
  }
  if(fire2buttonover2 == true){
    player2.addAnimation("fire2", fire2anm);
    player2.changeAnimation("fire2", fire2anm);
    player2.scale = 0.075;
    character2selected = "Fogo Vermelho";
  }
  if(zombiebuttonover2 == true){
    character2selected = "Zumbi";
  }
  player2.visible = true;
  if(mapselected == "Labirinto Do Pac Man"){
    player2.scale = player2.scale / 2;
  }
}

function reset(){
  leftarrow.visible = true;
  leftarrow.y = windowHeight - 45;
  rightarrow.visible = true;
  rightarrow.y = windowHeight - 45;
  basesG.destroyEach();
  bricksG.destroyEach();
  wallsG.destroyEach();
  player1victory = false;
  player2victory = false;
  jumplimit = windowHeight - 55;
  jumplimit2 = windowHeight + 50;
  basesactive = false;
  mazeactive = false;
  gamestate = "select";
  mapselected = "notselected";
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
  snowmanbutton.visible = true;
  fire1button.visible = true;
  fire2button.visible = true;
  redselectbox.visible = true;
  blueselectbox.visible = true;
  player1health = 100;
  player2health = 100;
  player1.x = width/2 - width/2/2;
  player1.y = windowHeight - 55;
  player2.x = width/2 + width/2/2;
  player2.y = windowHeight - 55;
}

function selectmap(){
  selectrandommap = 5;//Math.round(random(1, 6));
  if(selectrandommap == 1 && frameCount%0.5 == 0 
    && gamestate == "select" && mapselected == "notselected"){
    //image(backgroundplanetimg, 0, 0, width, height);
    mapselected = "Espaço";
  }
  if(selectrandommap == 2 && frameCount%1 == 0 
    && gamestate == "select" && mapselected == "notselected"){
    //image(backgroundsnowimg, 0, 0, width, height);
    mapselected = "Floresta De Neve";
  }
  if(selectrandommap == 3 && frameCount%1 == 0 
    && gamestate == "select" && mapselected == "notselected"){
    //image(backgroundforestimg, 0, 0, width, height);
    mapselected = "Floresta Chuvosa";
  }
  if(selectrandommap == 4 && frameCount%1 == 0 
    && gamestate == "select" && mapselected == "notselected"){
    //image(backgroundbattlezoneimg, 0, 0, width, height);
    mapselected = "Zona De Batalha";
  }
  if(selectrandommap == 5 && frameCount%1 == 0 
    && gamestate == "select" && mapselected == "notselected"){
    //image(backgroundbattlezoneimg, 0, 0, width, height);
    mapselected = "Labirinto Do Pac Man";
  }
  if(selectrandommap == 6 && frameCount%1 == 0 
    && gamestate == "select" && mapselected == "notselected"){
    //image(backgroundbattlezoneimg, 0, 0, width, height);
    mapselected = "Mario";
  }
}

function activateBases(){
  var player1base = createSprite(width/2 - width/2/2, windowHeight - 185);
  var player2base = createSprite(width/2 + width/2/2, windowHeight - 185);
  var centralbase = createSprite(width/2, windowHeight - 165);
  jumplimit = windowHeight - 315;//windowHeight - 355
  jumplimit2 = centralbase.y - 55;
  //player1base.debug = true;
  //player2base.debug = true;
  //centralbase.debug = true;
  player1base.setCollider("rectangle", 0, -500, 2650, 650);
  player2base.setCollider("rectangle", 0, -500, 2650, 650);
  centralbase.setCollider("rectangle", 0, -500, 2650, 650);
  player1baseY = player1base.y - 80;
  player2baseY = player2base.y - 80;
  player1base.addAnimation("base", baseimg);
  player2base.addAnimation("base", baseimg);
  centralbase.addAnimation("base", baseimg);
  player1base.scale = 0.09;
  player2base.scale = 0.09;
  centralbase.scale = 0.09;
  basesG.add(centralbase);
  basesG.add(player1base);
  basesG.add(player2base);
  basesactive = true;
  
}

function activateMaze(){
  var center = createSprite(windowWidth / 2, windowHeight / 2 - 25, 200, 80);
  var BottomEdge = createSprite(windowWidth / 2, windowHeight, windowWidth, 60);
  var TopEdge = createSprite(windowWidth / 2, 0, windowWidth, 60);
  var LeftEdge = createSprite(-10, windowHeight / 2, 60, windowHeight);
  var RightEdge = createSprite(windowWidth + 10, windowHeight / 2, 60, windowHeight);
  var wall2 = createSprite(60, windowHeight / 2 - 95, 200, 80);
  var wall3 = createSprite(60, windowHeight / 2 + 45, 200, 80);
  var wall4 = createSprite(windowWidth - 60, windowHeight / 2 - 95, 200, 80);
  var wall5 = createSprite(windowWidth - 60, windowHeight / 2 + 45, 200, 80);
  var wall6 = createSprite(windowWidth - 39, windowHeight / 2 + 220, 55, 20);
  var wall7 = createSprite(39, windowHeight / 2 + 220, 55, 20);
  var wall8 = createSprite(windowWidth / 2, 55, 28, 105);
  var wall9 = createSprite(windowWidth / 2 / 2 + 33, 55, 28, 105);
  var wall10 = createSprite(windowWidth / 2 + windowWidth / 2 / 2 - 33, 55, 28, 105);
  var wall11 = createSprite(windowWidth / 2 - 175, 100, 200, 33);
  var wall12 = createSprite(windowWidth / 2 + 175, 100, 200, 33);
  var wall13 = createSprite(windowWidth / 2 - 483, 100, 110, 34);
  var wall14 = createSprite(windowWidth / 2 + 483, 100, 110, 34);
  var wall15 = createSprite(windowWidth / 2 - 643, 100, 80, 34);
  var wall16 = createSprite(windowWidth / 2 + 643, 100, 80, 34);
  var wall17 = createSprite(windowWidth / 2 - 643, 182, 80, 19);
  var wall18 = createSprite(windowWidth / 2 + 644, 182, 80, 19);
  var wall19 = createSprite(windowWidth / 2 - 526, 251, 26, 150);
  var wall20 = createSprite(windowWidth / 2 + 527, 251, 26, 150);
  var wall21 = createSprite(windowWidth / 2 - 438, 285, 26, 83);
  var wall22 = createSprite(windowWidth / 2 + 439, 285, 26, 83);
  var wall23 = createSprite(windowWidth / 2 - 526, 425, 26, 83);
  var wall24 = createSprite(windowWidth / 2 + 527, 425, 26, 83);
  var wall25 = createSprite(windowWidth / 2 - 482, 530, 108, 19);
  var wall26 = createSprite(windowWidth / 2 + 483, 530, 108, 19);
  var wall27 = createSprite(windowWidth / 2 - 175, 529, 198, 18);
  var wall28 = createSprite(windowWidth / 2 + 176, 529, 198, 18);
  var wall29 = createSprite(windowWidth / 2 - 175, 251, 200, 18);
  var wall30 = createSprite(windowWidth / 2 - 175, 251, 24, 150);
  var wall31 = createSprite(windowWidth / 2 + 176, 251, 200, 18);
  var wall32 = createSprite(windowWidth / 2 + 176, 251, 24, 150);
  var wall33 = createSprite(windowWidth / 2, 215, 25, 84);
  var wall34 = createSprite(windowWidth / 2, 181, 197, 18);
  var wall35 = createSprite(windowWidth / 2 + windowWidth / 2 / 2 - 33, 215, 25, 84);
  var wall36 = createSprite(windowWidth / 2 + windowWidth / 2 / 2 - 33, 181, 197, 18);
  var wall37 = createSprite(windowWidth / 2 / 2 + 33, 215, 25, 84);
  var wall38 = createSprite(windowWidth / 2 / 2 + 33, 181, 197, 18);
  var wall39 = createSprite(windowWidth / 2 / 2 + 33, 215 + 278, 25, 84);
  var wall40 = createSprite(windowWidth / 2 / 2 + 33, 181 + 278, 197, 18);
  var wall41 = createSprite(windowWidth / 2, 215 + 278, 25, 84);
  var wall42 = createSprite(windowWidth / 2, 181 + 278, 197, 18);
  var wall43 = createSprite(windowWidth / 2 + windowWidth / 2 / 2 - 33, 215 + 278, 25, 84);
  var wall44 = createSprite(windowWidth / 2 + windowWidth / 2 / 2 - 33, 181 + 278, 197, 18);
  var wall45 = createSprite(windowWidth / 2 / 2 + 33, 215 + 278 + 140, 25, 84);
  var wall46 = createSprite(windowWidth / 2 / 2 + 33, 181 + 278 + 140, 197, 18);
  var wall47 = createSprite(windowWidth / 2, 215 + 278 + 140, 25, 84);
  var wall48 = createSprite(windowWidth / 2, 181 + 278 + 140, 197, 18);
  var wall49 = createSprite(windowWidth / 2 + windowWidth / 2 / 2 - 33, 215 + 278 + 140, 25, 84);
  var wall50 = createSprite(windowWidth / 2 + windowWidth / 2 / 2 - 33, 181 + 278 + 140, 197, 18);
  var wall51 = createSprite(125, windowHeight / 2 + 150, 75, 20);
  var wall52 = createSprite(154 , windowHeight / 2 + 185, 25, 85);
  var wall53 = createSprite(windowWidth - 124, windowHeight / 2 + 150, 75, 20);
  var wall54 = createSprite(windowWidth - 153, windowHeight / 2 + 185, 25, 85);
  var wall55 = createSprite(212, windowHeight / 2 + 288, 250, 20);
  var wall56 = createSprite(241, windowHeight / 2 + 255, 25, 85);
  var wall57 = createSprite(windowWidth - 212, windowHeight / 2 + 288, 250, 20);
  var wall58 = createSprite(windowWidth - 241, windowHeight / 2 + 255, 25, 85);
  var wall59 = createSprite(windowWidth / 2 - 175, windowHeight / 2 + 288, 194, 20);
  var wall60 = createSprite(windowWidth / 2 - 175, windowHeight / 2 + 250, 25, 75);
  var wall61 = createSprite(windowWidth / 2 + 176, windowHeight / 2 + 288, 194, 20);
  var wall62 = createSprite(windowWidth / 2 + 176, windowHeight / 2 + 250, 25, 75);
  var wall63 = createSprite(windowWidth / 2 + 176, windowHeight / 2 + 45, 25, 85);
  var wall64 = createSprite(windowWidth / 2 + 218, windowHeight / 2 + 10, 109, 20);
  var wall65 = createSprite(windowWidth / 2 - 175, windowHeight / 2 + 45, 25, 85);
  var wall66 = createSprite(windowWidth / 2 - 217, windowHeight / 2 + 10, 109, 20);
  var wall67 = createSprite(windowWidth / 2 / 2 + 33, 215 + 278 - 137, 25, 84);
  var wall68 = createSprite(windowWidth / 2 / 2 + 33 + 45, 215 + 278 - 172, 110, 20);
  var wall69 = createSprite(windowWidth / 2 / 2 + 33 + 45 - 90, 215 + 278 - 103, 110, 20);
  var wall70 = createSprite(windowWidth / 2 + windowWidth / 2 / 2 - 33, 215 + 278 - 137, 25, 84);
  var wall71 = createSprite(windowWidth / 2 + windowWidth / 2 / 2 - 33 - 45, 215 + 278 - 172, 110, 20);
  var wall72 = createSprite(windowWidth / 2  + windowWidth / 2 / 2 - 33 - 45 + 90, 215 + 278 - 103, 110, 20);
  teleportleft = createSprite(0, windowHeight / 2 - 25, 50, 70);
  teleportright = createSprite(windowWidth, windowHeight / 2 - 25, 50, 70);
  teleportleft.shapeColor = "blue";
  teleportright.shapeColor = "blue";
  powerup1 = createSprite(windowWidth - 51, windowHeight / 2 + 185, 30, 25);
  powerup2 = createSprite(51, windowHeight / 2 + 185, 30, 25);
  powerup3 = createSprite(51, windowHeight / 2 - 279, 30, 25);
  powerup4 = createSprite(windowWidth - 51, windowHeight / 2 - 279, 30, 25);
  //wall1.debug = true;
  //wall2.debug = true;
  center.visible = false;
  BottomEdge.visible = false;
  TopEdge.visible = false;
  LeftEdge.visible = false;
  RightEdge.visible = false;
  wall2.visible = false;
  wall3.visible = false;
  wall4.visible = false;
  wall5.visible = false;
  wall6.visible = false;
  wall7.visible = false;
  wall8.visible = false;
  wall9.visible = false;
  wall10.visible = false;
  wall11.visible = false;
  wall12.visible = false;
  wall13.visible = false;
  wall14.visible = false;
  wall15.visible = false;
  wall16.visible = false;
  wall17.visible = false;
  wall18.visible = false;
  wall19.visible = false;
  wall20.visible = false;
  wall21.visible = false;
  wall22.visible = false;
  wall23.visible = false;
  wall24.visible = false;
  wall25.visible = false;
  wall26.visible = false;
  wall27.visible = false;
  wall28.visible = false;
  wall29.visible = false;
  wall30.visible = false;
  wall31.visible = false;
  wall32.visible = false;
  wall33.visible = false;
  wall34.visible = false;
  wall35.visible = false;
  wall36.visible = false;
  wall37.visible = false;
  wall38.visible = false;
  wall39.visible = false;
  wall40.visible = false;
  wall41.visible = false;
  wall42.visible = false;
  wall43.visible = false;
  wall44.visible = false;
  wall45.visible = false;
  wall46.visible = false;
  wall47.visible = false;
  wall48.visible = false;
  wall49.visible = false;
  wall50.visible = false;
  wall51.visible = false;
  wall52.visible = false;
  wall53.visible = false;
  wall54.visible = false;
  wall55.visible = false;
  wall56.visible = false;
  wall57.visible = false;
  wall58.visible = false;
  wall59.visible = false;
  wall60.visible = false;
  wall61.visible = false;
  wall62.visible = false;
  wall63.visible = false;
  wall64.visible = false;
  wall65.visible = false;
  wall66.visible = false;
  wall67.visible = false;
  wall68.visible = false;
  wall69.visible = false;
  wall70.visible = false;
  wall71.visible = false;
  wall72.visible = false;
  teleportright.visible = false;
  teleportleft.visible = false;
  powerup1.visible = false;
  powerup2.visible = false;
  powerup3.visible = false;
  powerup4.visible = false;
  wallsG.add(center);
  wallsG.add(BottomEdge);
  wallsG.add(TopEdge);
  wallsG.add(LeftEdge);
  wallsG.add(RightEdge);
  wallsG.add(wall2);
  wallsG.add(wall3);
  wallsG.add(wall4);
  wallsG.add(wall5);
  wallsG.add(wall6);
  wallsG.add(wall7);
  wallsG.add(wall8);
  wallsG.add(wall9);
  wallsG.add(wall10);
  wallsG.add(wall11);
  wallsG.add(wall12);
  wallsG.add(wall13);
  wallsG.add(wall14);
  wallsG.add(wall15);
  wallsG.add(wall16);
  wallsG.add(wall17);
  wallsG.add(wall18);
  wallsG.add(wall19);
  wallsG.add(wall20);
  wallsG.add(wall21);
  wallsG.add(wall22);
  wallsG.add(wall23);
  wallsG.add(wall24);
  wallsG.add(wall25);
  wallsG.add(wall26);
  wallsG.add(wall27);
  wallsG.add(wall28);
  wallsG.add(wall29);
  wallsG.add(wall30);
  wallsG.add(wall31);
  wallsG.add(wall32);
  wallsG.add(wall33);
  wallsG.add(wall34);
  wallsG.add(wall35);
  wallsG.add(wall36);
  wallsG.add(wall37);
  wallsG.add(wall38);
  wallsG.add(wall39);
  wallsG.add(wall40);
  wallsG.add(wall41);
  wallsG.add(wall42);
  wallsG.add(wall43);
  wallsG.add(wall44);
  wallsG.add(wall45);
  wallsG.add(wall46);
  wallsG.add(wall47);
  wallsG.add(wall48);
  wallsG.add(wall49);
  wallsG.add(wall50);
  wallsG.add(wall51);
  wallsG.add(wall52);
  wallsG.add(wall53);
  wallsG.add(wall54);
  wallsG.add(wall55);
  wallsG.add(wall56);
  wallsG.add(wall57);
  wallsG.add(wall58);
  wallsG.add(wall59);
  wallsG.add(wall60);
  wallsG.add(wall61);
  wallsG.add(wall62);
  wallsG.add(wall63);
  wallsG.add(wall64);
  wallsG.add(wall65);
  wallsG.add(wall66);
  wallsG.add(wall67);
  wallsG.add(wall68);
  wallsG.add(wall69);
  wallsG.add(wall70);
  wallsG.add(wall71);
  wallsG.add(wall72);
  powerup1Taken.x = powerup1.x;
  powerup1Taken.y = powerup1.y;
  powerup1Taken.width = powerup1.width + 5;
  powerup1Taken.height = powerup1.height;
  powerup2Taken.x = powerup2.x;
  powerup2Taken.y = powerup2.y;
  powerup2Taken.width = powerup2.width + 5;
  powerup2Taken.height = powerup2.height;
  powerup3Taken.x = powerup3.x;
  powerup3Taken.y = powerup3.y;
  powerup3Taken.width = powerup3.width + 5;
  powerup3Taken.height = powerup3.height;
  powerup4Taken.x = powerup4.x;
  powerup4Taken.y = powerup4.y;
  powerup4Taken.width = powerup4.width + 5;
  powerup4Taken.height = powerup4.height;
  player1baseY = windowHeight - 210;
  player2baseY = windowHeight - 210;
  jumplimit = -55;
  mazeactive = true;
}

function activateMario(){
  //var mario = createSprite();
  var brick1 = createSprite(width/2+35, height/2+6, 484, 84);//800
  var brick2 = createSprite(231, height/2+1, 106, 87);
  var luckyblock2block = createSprite(width/2+37, 43, 96, 83);
  var ground = createSprite(width/2, windowHeight - 35, width, 85);
  var pipeblock = createSprite(width/2+660, windowHeight - 145, 194, 215);
  //mushroom = createSprite(width/2+421, windowHeight - 135);
  //mushroom.visible = false;
  //mushroom.debug = true;
  jumplimit = 55;
  /*
  luckyblock1 = createSprite(width/2+130, height/2+45, 91, 25);
  luckyblock2 = createSprite(width/2+37, 89, 77, 25);
  pipe = createSprite(width/2+660, windowHeight - 265, 161, 25);
  luckyblock1.visible = false;
  luckyblock2.visible = false;
  pipe.visible = false;
  //pipe.debug = true;
  //luckyblock1.debug = true;
  */
  luckyblock2block.visible = false;
  pipeblock.visible = false;
  //pipeblock.debug = true;
  
  //luckyblock2block.debug = true;
  brick2.visible = false;
  //brick2.debug = true;
  //mario.debug = true;
  //mario.visible = false;
  //brick1.debug = true;
  ground.visible = false;
  //ground.debug = true;
  brick1.visible = false;
  
  bricksG.add(pipeblock);
  bricksG.add(luckyblock2block);
  bricksG.add(ground);
  bricksG.add(brick1);
  bricksG.add(brick2);
  marioactive = true;
}
