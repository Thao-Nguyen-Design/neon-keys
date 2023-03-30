//animation for key when pressed (row 2: a to l)
//adapted from Code Source 1

//circle jump from bottom
class LetterA {

  constructor() {
    this.xPos = random(width);
    this.yPos = height - 200;
    this.size = random(100, 300);
    this.yVelocity = -50;
    this.gravity = 3;
    this.duration = 40;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    noFill();
    stroke(this.randomColor);
    strokeWeight(3);

    this.yVelocity += this.gravity;
    this.yPos += this.yVelocity;

    ellipse(this.xPos, this.yPos, this.size);

    this.duration--;

  }

}

//lines diagonally move from top left to bottom right
class LetterS {

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
    strokeWeight(3);
    noFill();

    push();
    translate(width, 0);
    rotate(180);
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

//circle expanding from middle left
class LetterD {

  constructor() {
    this.size = 1;
    this.duration = 60;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    stroke(this.randomColor);
    strokeWeight(3);
    translate(0, height / 2);
    noFill();
    ellipse(0, 0, this.size);

    this.size += 50;
    this.duration--;

    pop();
  }

}

//circle expanding from middle right
class LetterF {

  constructor() {
    this.size = 1;
    this.duration = 60;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    stroke(this.randomColor);
    strokeWeight(3);
    translate(width, height / 2);
    noFill();
    ellipse(0, 0, this.size);

    this.size += 50;
    this.duration--;

    pop();
  }

}

//circle expand from top right and bottom left
class LetterG {

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
    ellipse(width, 0, this.size);
    ellipse(0, height, this.size);

    this.size += 50;
    this.duration--;

    pop();

  }

}

//line move from right to left
class LetterH {

  constructor() {
    this.xPos = width;
    this.speed = 50;
    this.duration = 30;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    noStroke();
    fill(this.randomColor);
    rect(this.xPos, 0, 2, height);

    this.xPos -= this.speed;
    this.duration--;
  }

}

//2 rect move in opposite direction top and bottom
class LetterJ {

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
    this.duration = 50;
  }

  move() {

    stroke(this.randomColor);
    strokeWeight(1);
    noFill();

    push();
    translate(width, 0);
    rotate(180);
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

//circle expanding from middle top
class LetterK {

  constructor() {
    this.size = 1;
    this.duration = 50;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    stroke(this.randomColor);
    strokeWeight(3);
    noFill();
    ellipse(width / 2, 0, this.size);

    this.size += 45;
    this.duration--;

    pop();

  }

}

//circle expand from middle bottom
class LetterL {

  constructor() {
    this.size = 1;
    this.duration = 50;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    stroke(this.randomColor);
    strokeWeight(3);
    noFill();
    ellipse(width / 2, height, this.size);

    this.size += 45;
    this.duration--;

    pop();

  }
  
}
