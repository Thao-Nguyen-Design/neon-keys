//This project is inspired by https://graphicbeats.net/
//Code adapted from multiple sources, written in comments above function.
//See README.md for sources and assets links.

let wordCount = 0;
let incorrectCount = 0;
let correctCount = 0;
let accuracy = 100;

let readyCountdown = 5;
let gameCountdown = 60;

let state = "state0";
let miss = false;

let animations = [];
let effects = [];
let keyEffects = [];
let typingKeys = [];
let typedKeys = [];

let gutter = 60;
let vol = 0.2;
let offset = 0.0;

let firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
let secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
let lastRow = ["Z", "X", "C", "V", "B", "N", "M"];

let words = ["dog", "cat", "eats", "jumps", "chicken", "rat", "skin",
  "avoid", "joke", "snap", "van", "patch", "cultured", "tropical", "soup",
  "flawless", "shoe", "control", "greedy", "amount", "ancient", "tasteful",
  "install", "nod", "numerous", "silky", "zinc", "hole", "colorful", "rush",
  "calendar", "disturb", "drink", "quarter", "angle", "accompany", "regret",
  "colossal", "soar", "spoon", "first", "nail", "game", "decorate", "pet",
  "brick", "grip", "contribute", "sack", "subsequent", "dig", "long",
  "healthy", "quick", "impeach", "cloud", "coach", "marvelous", "creator",
  "sweep", "irate", "scrub", "marked", "hard", "pluck", "amount", "talk",
  "near", "celery", "crazy", "abrupt", "majestic", "uptight", "place",
  "glossy", "murmur", "robin", "bucket", "market", "fix", "pets", "knit",
  "grass", "derive", "approach", "sweat", "pail", "impair", "imbibe", "sweet",
  "helpless", "brake", "end", "legs", "gain", "reduce", "boast", "explore",
  "dinner", "fireman", "dedicate", "creator", "propose", "knock", "exultant",
  "prepare", "uproot", "money", "knife", "fire", "leap", "preserve", "improve",
  "jelly", "able", "basket", "wonderful", "flag", "rant", "awake"
];

let objectColors = [
  [346, 82, 100], // pink
  [183, 80, 95], // cyan
  [36, 95, 100] // orange
];

let bgColor;
let white;
let gray;
let randomCol;

let bgSound;
let keySound;
let correctSound;
let missSound;
let clocksound;

let textfont;
let titlefont;

function preload() {

  titlefont = loadFont("assets/sunset-club.ttf");
  textfont = loadFont("assets/MontserratAlternates-Medium.ttf");

  bgSound = loadSound("assets/bg2.mp3");
  gameSound = loadSound("assets/bg1.mp3");
  keySound = loadSound("assets/chime2.mp3");
  correctSound = loadSound("assets/chime4.mp3");
  missSound = loadSound("assets/chime3.mp3");
  clocksound = loadSound("assets/chime1.mp3");

}

function setup() {

  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER, CENTER);
  textSize(22);
  textFont(textfont);

  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);


  word = randomizer(words);
  typingKeys.push(...word);

  bgColor = color(0, 0, 6, 100); //dark gray
  white = color(0, 0, 100, 100);
  gray = color(0, 0, 45, 100); //midtone gray
  randomCol = color(objectColors[int(random(objectColors.length))]);

  bgSound.playMode("untilDone");
  gameSound.playMode("untilDone");
  keySound.playMode("restart");
  correctSound.playMode("restart");
  missSound.playMode("restart");
  clocksound.playMode("restart");

  bgSound.setVolume(vol);
  gameSound.setVolume(vol);

}

function draw() {

  background(bgColor);

  playAnimation();

  switch (state) {

    case "state0":
      hold();
      break;

    case "state1":
      ready();
      break;

    case "state2":
      go();
      break;

    case "state3":
      result();
      break;

  }

}

function keyPressed() {

  setAnimation();

  //play keySound in homepage
  if (state == "state0" && keyCode != ENTER) {
    keySound.play();
  }

  //play keySound in result page
  if (state == "state3" && key != " ") {
    keySound.play();
  }

  //if correct letter is pressed and in game state
  if (key == typingKeys[0] && state == "state2") {
    miss = false;
    keySound.play();
    typedKeys.unshift(typingKeys[0]);
    typingKeys.splice(0, 1);
    correctCount++;
    //if wrong letter is pressed and in game state
  } else if (keyIsPressed === true && key != typingKeys[0] && state == "state2") {
    miss = true;
    missSound.play();
    incorrectCount++;
  }

  //if word is finish typed, get new word
  if (typingKeys.length == 0 && state == "state2") {
    correctSound.play();
    wordCount++;
    word = randomizer(words);
    typingKeys.push(...word);
    randomCol = color(objectColors[int(random(objectColors.length))]);
    typedKeys = [];
  }

  accuracy = round(correctCount / (correctCount + incorrectCount) * 100, 1);
}

//state0
function hold() {

  state = "state0";

  bgSound.loop();

  readyCountdown = 5;

  noStroke();

  push();
  textFont(titlefont);
  textSize(130);
  fill(white);
  textTitleNeon("Neon Keys", width / 2, height / 2 - gutter * 2.5, randomCol);
  pop();

  push();
  fill(white);
  textSize(16);
  textAlign(RIGHT);
  glow(white, 12);
  text("Press any key", width / 2 + 285, height / 2 - 30);
  pop();

  push();
  fill(gray);
  textAlign(LEFT);
  textSize(10);
  text("Created by Thao Nguyen", 0 + 25, height - 25);
  textAlign(RIGHT);
  text("Last Updated: March 2023", width - 25, height - 25);
  pop();

  push();
  glow(white, 15);
  drawKeyboard(width / 2 - 300, height / 2);
  pop();

  if (keyCode === ENTER) {
    bgSound.stop();
    state = "state1";
  }

}

//state1
function ready() {

  state = "state1";

  gameSound.loop();

  wordCount = 0;
  incorrectCount = 0;
  correctCount = 0;
  accuracy = 100;
  gameCountdown = 60;

  //countdown from 5
  if (frameCount % 60 == 0 && readyCountdown > 0) {
    clocksound.play();
    readyCountdown--;
  }

  push();
  noStroke();
  rectMode(CENTER);
  fill(white);
  textSize(120);
  glow(randomCol, 20);
  text(readyCountdown, width / 2, height / 2 - 16);
  textSize(30);
  text("Ready?", width / 2, height / 2 - 130);
  noFill();
  stroke(white);
  strokeWeight(4);
  square(width / 2, height / 2, 150, 10);
  square(width / 2, height / 2, 150, 10);
  pop();

  drawInfo();

  if (readyCountdown == 0) {
    typingKeys = [];
    word = randomizer(words);
    typingKeys.push(...word);
    typedKeys = [];
    state = "state2";
  }

}

//state2
function go() {

  state = "state2";

  //countdown every second (60 sec)
  if (frameCount % 60 == 0 && gameCountdown > 0) {
    gameCountdown--;
  }

  //lower the background volume every 3 secs
  if (frameCount % 180 == 0 && gameCountdown > 0 && vol > 0) {
    vol -= 0.01;
  }

  //play clocksound when countdown is 3
  if (frameCount % 60 == 0 && gameCountdown < 4) {
    clocksound.play();
  }

  drawTypingKeys();
  drawInfo();

  if (gameCountdown == 0) {
    gameSound.pause();
    state = "state3";
  }

}

//state3
function result() {

  state = "state3";

  gameSound.setVolume(0.2);
  gameSound.loop();

  fill(white);
  noStroke();

  push();
  textSize(35);
  textNeon("Game Over", width / 2, height / 2 - 200, white);
  pop();

  push();
  textSize(18);
  textAlign(LEFT);
  text("Words", width / 2 - 220, height / 2 - 100);
  text("Characters", width / 2 - 220, height / 2);
  text("Miss", width / 2 + 150, height / 2 - 100);
  text("Accuracy", width / 2 + 150, height / 2);

  textSize(35);
  text(wordCount, width / 2 - 220, height / 2 - 60);
  text(correctCount, width / 2 - 220, height / 2 + 40);
  text(incorrectCount, width / 2 + 150, height / 2 - 60);
  text(accuracy + "%", width / 2 + 150, height / 2 + 40);
  pop();

  push();
  textAlign(CENTER);
  textSize(20);
  fill(0, 0, 100, frameCount % 100);
  text("Press spacebar to return", width / 2, height / 2 + 150);
  pop();

  if (key == " ") {
    gameSound.stop();
    keyEffects = [];
    effects = [];
    animations = [];
    state = "state0";
  }

}

//randomize an array
//adapted from Code Source 2
function randomizer(array) {
  return array[int(random(0, array.length))];
}

//draw the game info (word, miss, time, accuracy)
function drawInfo() {

  push();
  noStroke();
  fill(gray);
  textSize(50);
  textAlign(LEFT);
  text(gameCountdown, width * 0.04, height * 0.08 + 50);
  text(accuracy + "%", width * 0.04, height * 0.92 - 50);
  textAlign(RIGHT);
  text(wordCount, width * 0.96, height * 0.08 + 50);
  text(incorrectCount, width * 0.96, height * 0.92 - 50);

  textSize(25);
  textAlign(LEFT);
  text("Time", width * 0.04, height * 0.08);
  text("Accuracy", width * 0.04, height * 0.92);
  textAlign(RIGHT);
  text("Words", width * 0.96, height * 0.08);
  text("Miss", width * 0.96, height * 0.92);
  pop();

}

//draw the game typing section
//adapted from Code Source 2
function drawTypingKeys() {

  gutter = 60;

  //draw the keys haven't typed on the right
  push();
  let index1 = 0;
  for (let x = 0; x < 10; x++) {
    fill(white);
    noStroke();
    textAlign(CENTER);
    textSize(55);
    glow(white, 10);
    text(typingKeys[index1], width / 2 + x * gutter + 45, height / 2 - 25);

    if (index1 < typingKeys.length) {
      index1++;
    }
  }
  pop();

  //draw the typed keys on the left
  push();
  let index2 = 0;
  for (let x = 0; x < 10; x++) {
    fill(randomCol);
    noStroke();
    textSize(55);
    textAlign(CENTER);
    textNeon(typedKeys[index2], width / 2 - x * gutter - 45, height / 2 - 25, randomCol);

    if (index2 < typedKeys.length) {
      index2++;
    }
  }
  pop();

  //draw line in the middle
  push();
  strokeWeight(3);
  stroke(0, 0, 100);
  line(width / 2, height / 2 - 150, width / 2, height / 2 + 110);
  pop();

}

//draw keyboard in homepage
function drawKeyboard(x, y) {

  push();

  translate(x, y);

  let indexRow1 = 0;
  let indexRow2 = 0;
  let indexRow3 = 0;

  //draw first row (q to p)
  for (let x = 0; x < 10; x++) {
    noFill();
    stroke(white);
    strokeWeight(2);
    square(x * gutter, 0, 50, 10);
    fill(white);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    text(firstRow[indexRow1], x * gutter + 24, 22);
    if (indexRow1 < firstRow.length) {
      indexRow1++;
    }
  }

  //draw second row (a to l)
  for (let x = 0; x < 9; x++) {
    noFill();
    stroke(white);
    strokeWeight(2);
    square(x * gutter + gutter / 2, gutter, 50, 10);
    fill(white);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    text(secondRow[indexRow2], x * gutter + 55, 22 + gutter);
    if (indexRow2 < secondRow.length) {
      indexRow2++;
    }
  }

  //draw third row (z to m)
  for (let x = 0; x < 7; x++) {
    noFill();
    stroke(white);
    strokeWeight(2);
    square(x * gutter + gutter, gutter * 2, 50, 10);
    fill(white);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    text(lastRow[indexRow3], x * gutter + 85, 22 + gutter * 2);
    if (indexRow3 < secondRow.length) {
      indexRow3++;
    }
  }

  //draw enter key
  push();
  noFill();
  stroke(white);
  strokeWeight(2);
  rectNeon(gutter * 8, gutter * 2, 120, 50, randomCol);
  noStroke();
  fill(white);
  textNeon("ENTER", gutter * 9, gutter + 82, randomCol);
  pop();

  pop();
}

//push new classes
//adapted from Code Soure 1
function setAnimation() {

  effects.push(new WrongKeys());

  // q to p
  if (key == 'q' || key == 'Q') {
    objectQ = new LetterQ();
    animations.push(objectQ);
    keyEffects.push(new Row1Effect("Q", 0, objectQ.duration, color(objectQ.randomColor)));
  }

  if (key == 'w' || key == 'W') {
    for (var i = 0; i < 10; i++) {
      objectW = new LetterW();
      animations.push(objectW);
    }
    keyEffects.push(new Row1Effect("W", 1, objectW.duration, color(objectW.randomColor)));
  }

  if (key == 'e' || key == 'E') {
    objectE = new LetterE();
    animations.push(objectE);
    keyEffects.push(new Row1Effect("E", 2, objectE.duration, color(objectE.randomColor)));
  }

  if (key == 'r' || key == 'R') {
    objectR = new LetterR();
    animations.push(objectR);
    keyEffects.push(new Row1Effect("R", 3, objectR.duration, color(objectR.randomColor)));
  }

  if (key == 't' || key == 'T') {
    objectT = new LetterT();
    animations.push(objectT);
    keyEffects.push(new Row1Effect("T", 4, objectT.duration, color(objectT.randomColor)));
  }

  if (key == 'y' || key == 'Y') {
    objectY = new LetterY();
    animations.push(objectY);
    keyEffects.push(new Row1Effect("Y", 5, objectY.duration, color(objectY.randomColor)));
  }

  if (key == 'u' || key == 'U') {
    for (var i = 0; i < 5; i++) {
      objectU = new LetterU();
      animations.push(objectU);
    }
    keyEffects.push(new Row1Effect("U", 6, objectU.duration, color(objectU.randomColor)));
  }

  if (key == 'i' || key == 'I') {
    objectI = new LetterI();
    animations.push(objectI);
    keyEffects.push(new Row1Effect("I", 7, objectI.duration, color(objectI.randomColor)));
  }

  if (key == 'o' || key == 'O') {
    for (var i = 0; i < 5; i++) {
      objectO = new LetterO();
      animations.push(objectO);
    }
    keyEffects.push(new Row1Effect("O", 8, objectO.duration, color(objectO.randomColor)));
  }

  if (key == 'p' || key == 'P') {
    objectP = new LetterP();
    animations.push(objectP);
    keyEffects.push(new Row1Effect("P", 9, objectP.duration, color(objectP.randomColor)));
  }

  //a to l
  if (key == 'a' || key == 'A') {
    objectA = new LetterA();
    animations.push(objectA);
    keyEffects.push(new Row2Effect("A", 0, objectA.duration, color(objectA.randomColor)));
  }

  if (key == 's' || key == 'S') {
    for (var i = 0; i < 5; i++) {
      objectS = new LetterS();
      animations.push(objectS);
    }
    keyEffects.push(new Row2Effect("S", 1, objectS.duration, color(objectS.randomColor)));
  }

  if (key == 'd' || key == 'D') {
    for (var i = 0; i < 10; i++) {
      objectD = new LetterD();
      animations.push(objectD);
    }
    keyEffects.push(new Row2Effect("D", 2, objectD.duration, color(objectD.randomColor)));
  }

  if (key == 'f' || key == 'F') {
    for (var i = 0; i < 7; i++) {
      objectF = new LetterF();
      animations.push(objectF);
    }
    keyEffects.push(new Row2Effect("F", 3, objectF.duration, color(objectF.randomColor)));
  }

  if (key == 'g' || key == 'G') {
    objectG = new LetterG();
    animations.push(objectG);
    keyEffects.push(new Row2Effect("G", 4, objectG.duration, color(objectG.randomColor)));
  }

  if (key == 'h' || key == 'H') {
    for (var i = 0; i < 10; i++) {
      objectH = new LetterH();
      animations.push(objectH);
    }
    keyEffects.push(new Row2Effect("H", 5, objectH.duration, color(objectH.randomColor)));
  }

  if (key == 'j' || key == 'J') {
    objectJ = new LetterJ();
    animations.push(objectJ);
    keyEffects.push(new Row2Effect("J", 6, objectJ.duration, color(objectJ.randomColor)));
  }

  if (key == 'k' || key == 'K') {
    objectK = new LetterK();
    animations.push(objectK);
    keyEffects.push(new Row2Effect("K", 7, objectK.duration, color(objectK.randomColor)));
  }

  if (key == 'l' || key == 'L') {
    objectL = new LetterL();
    animations.push(objectL);
    keyEffects.push(new Row2Effect("L", 8, objectL.duration, color(objectL.randomColor)));
  }

  //z to m
  if (key == 'z' || key == 'Z') {
    objectZ = new LetterZ();
    animations.push(objectZ);
    keyEffects.push(new Row3Effect("Z", 0, objectZ.duration, color(objectZ.randomColor)));
  }

  if (key == 'x' || key == 'X') {
    for (var i = 0; i < 3; i++) {
      objectX = new LetterX();
      animations.push(objectX);
    }
    keyEffects.push(new Row3Effect("X", 1, objectX.duration, color(objectX.randomColor)));
  }

  if (key == 'c' || key == 'C') {
    for (var i = 0; i < 5; i++) {
      objectC = new LetterC();
      animations.push(objectC);
    }
    keyEffects.push(new Row3Effect("C", 2, objectC.duration, color(objectC.randomColor)));
  }

  if (key == 'v' || key == 'V') {
    objectV = new LetterV();
    animations.push(objectV);
    keyEffects.push(new Row3Effect("V", 3, objectV.duration, color(objectV.randomColor)));
  }

  if (key == 'b' || key == 'B') {
    objectB = new LetterB();
    animations.push(objectB);
    keyEffects.push(new Row3Effect("B", 4, objectB.duration, color(objectB.randomColor)));
  }

  if (key == 'n' || key == 'N') {
    for (var i = 0; i < 3; i++) {
      objectN = new LetterN();
      animations.push(objectN);
    }
    keyEffects.push(new Row3Effect("N", 5, objectN.duration, color(objectN.randomColor)));
  }

  if (key == 'm' || key == 'M') {
    objectM = new LetterM();
    animations.push(objectM);
    keyEffects.push(new Row3Effect("M", 6, objectM.duration, color(objectM.randomColor)));
  }
}

//play method of classes
//adapted from Code Soure 1
function playAnimation() {

//play animation if key typed
// in game state only play if correct key typed
  for (var i = 0; i < animations.length; i++) {
    if (miss == false) {
      animations[i].move();
      if (animations[i].duration < 0) {
        animations.splice(i--, 1);
      }
    }
  }

//play miss effect if wrong key typed
//only in game state
  for (var i = 0; i < effects.length; i++) {
    if (miss == true && keyIsPressed == true && state == "state2") {
      effects[i].move();
      if (effects[i].duration < 0) {
        effects.splice(i--, 1);
      }
    }
  }

//play key effect in homepage (light up key on keyboard)
  for (var i = 0; i < keyEffects.length; i++) {
    if (state == "state0") {
      keyEffects[i].move();
    }
    if (keyEffects[i].duration < 0) {
      keyEffects.splice(i--, 1);
    }
  }

}

//make neon effect for rectangle
//adapted from Code Source 3
function rectNeon(x, y, width, height, glowColor) {

  glow(glowColor, 20);
  rect(x, y, width, height, 10);
  rect(x, y, width, height, 10);
  glow(glowColor, 15);
  rect(x, y, width, height, 10);
  rect(x, y, width, height, 10);
  glow(glowColor, 7);
  rect(x, y, width, height, 10);
  rect(x, y, width, height, 10);

}

//make neon flickering effect for title
//adapted from Code Source 3
function textTitleNeon(glowText, x, y, glowColor) {

  fill(0, 0, 40, 100);
  glow(glowColor, 0);
  text(glowText, x, y);

  fill(0, 0, 100, flickering());
  glow(glowColor, 100);
  text(glowText, x, y);
  glow(glowColor, 30);
  text(glowText, x, y);
  glow(glowColor, 12);
  text(glowText, x, y);

  fill(0, 0, 100, 100);

}

//make neon effect for text
//adapted from Code Source 3
function textNeon(glowText, x, y, glowColor) {

  glow(glowColor, 10);
  text(glowText, x, y);
  text(glowText, x, y);
  glow(glowColor, 7);
  text(glowText, x, y);
  glow(glowColor, 5);
  text(glowText, x, y);

}

//flickering effect
//adapted from Code Source 3
function flickering() {

  offset += 0.08;
  let n = noise(offset);
  if (n < 0.30) return 0;
  else return 100;

}

//neon effect
//adapted from Code Source 3
function glow(glowColor, blurriness) {

  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColor;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
