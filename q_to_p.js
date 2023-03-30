//animation for key when pressed (row 1: q to p)
//adapted from Code Source 1

//circle expand from center
class LetterQ {

  constructor() {
    this.size = 1;
    this.duration = 40;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    stroke(this.randomColor);
    strokeWeight(3);
    translate(width / 2, height / 2);
    noFill();
    ellipse(0, 0, this.size);

    this.size += 50;
    this.duration--;
    pop();
  }

}

//line move from bottom to top
class LetterW {

  constructor() {
    this.yPos = height;
    this.speed = 50;
    this.duration = 30;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    noStroke();
    fill(this.randomColor);
    rect(0, this.yPos, width, 2);

    this.yPos -= this.speed;
    this.duration--;
  }

}

//square expand from center and rotate
class LetterE {

  constructor() {
    this.angle = 0;
    this.size = 1;
    this.duration = 40;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();
    stroke(this.randomColor);
    strokeWeight(3);
    noFill();

    translate(width / 2, height / 2);
    rotate(this.angle);
    rectMode(CENTER);
    square(0, 0, this.size);
    pop();

    this.angle += 5;
    this.size += 50;
    this.duration--;
  }

}

//circle zoom out from center
class LetterR {

  constructor() {
    this.size = width * 2;
    this.duration = 60;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {
    push();
    stroke(this.randomColor);
    strokeWeight(3);
    noFill();
    ellipse(width / 2, height / 2, this.size);
    pop();
    this.size -= 65;
    this.duration--;
  }

}

//line diagonally move from bottom right to top left
class LetterT {

  constructor() {
    this.startX1 = -100;
    this.startY1 = 100;
    this.startX2 = width + 100;
    this.startY2 = 100;
    this.endX1 = width * 2;
    this.endY1 = 0;
    this.endX2 = -width;
    this.endY2 = 0;
    this.angle = 0;
    this.randomColor = objectColors[int(random(objectColors.length))];
    this.duration = 40;
  }

  move() {

    stroke(this.randomColor);
    strokeWeight(1);
    noFill();

    push();
    translate(0, height);
    line(this.startX1, this.startY1, this.endX1, this.endY1);
    pop();

    this.endX1 -= sin(this.angle) * 100;
    this.endY1 -= sin(this.angle) * 100;
    this.endX2 += sin(this.angle) * 100;
    this.endY2 -= sin(this.angle) * 100;
    this.angle += 3;
    this.duration--;
  }

}

//2 square expand from random spot
class LetterY {

  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 0;
    this.duration = 60;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(45);
    stroke(this.randomColor);
    noFill();
    strokeWeight(3);
    rect(0, 0, this.size);
    rect(500, 100, this.size * 0.5);

    this.size += 35;
    this.duration--;

    pop();

  }

}

//lines diagonally move from bottom left to top right
class LetterU {

  constructor() {
    this.startX1 = -100;
    this.startY1 = 100;
    this.startX2 = width + 100;
    this.startY2 = 100;
    this.endX1 = width * 2;
    this.endY1 = 0;
    this.endX2 = -width;
    this.endY2 = 0;
    this.angle = 0;
    this.randomColor = objectColors[int(random(objectColors.length))];
    this.duration = 40;
  }

  move() {

    stroke(this.randomColor);
    strokeWeight(1);
    noFill();

    push();
    translate(0, height);
    line(this.startX2, this.startY2, this.endX2, this.endY2);
    pop();

    this.endX1 -= sin(this.angle) * 100;
    this.endY1 -= sin(this.angle) * 100;
    this.endX2 += sin(this.angle) * 100;
    this.endY2 -= sin(this.angle) * 100;
    this.angle += 3;
    this.duration--;

  }

}

//circle expand from top left and bottom right
class LetterI {

  constructor() {
    this.size = 1;
    this.duration = 60;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    stroke(this.randomColor);
    strokeWeight(3);
    noFill();
    ellipse(0, 0, this.size);
    ellipse(width, height, this.size);

    this.size += 50;
    this.duration--;

    pop();
  }

}

//2 circles expanding from center
class LetterO {

  constructor() {
    this.size = 1;
    this.duration = 60;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    translate(width / 2, height / 2);

    rotate(45);
    noFill();
    stroke(this.randomColor);
    strokeWeight(3);
    circle(0, 0, this.size);
    circle(0, 0, this.size - 500);

    pop();

    this.size += 30;
    this.duration--;

  }

}

//line move from top to bottom
class LetterP {

  constructor() {
    this.yPos = 0;
    this.speed = 50;
    this.duration = 30;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    noStroke();
    fill(this.randomColor);
    rect(0, this.yPos, width, 2);

    this.yPos += this.speed;
    this.duration--;

  }

}
