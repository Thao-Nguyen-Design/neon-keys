//animation for key when pressed (row 3: z to m)
//adapted from Code Source 1

//lines move across screen from random width
class LetterZ {

  constructor() {
    this.startX = random(0 - width, width + width);
    while (0 < this.startX && this.startX < width) {
      this.startX = random(0 - width, width + width);
    }
    this.startY = random(0 - height, height + height);
    while (0 < this.startY && this.startY < height) {
      this.startY = random(0 - height, height + height);
    }
    this.targetX = width - this.startX;
    this.targetY = height - this.startY;
    this.distanceX = this.targetX - this.startX;
    this.distanceY = this.targetY - this.startY;
    this.currentX1 = this.startX;
    this.currentY1 = this.startY;
    this.currentX2 = this.startX;
    this.currentY2 = this.startY;
    this.randomColor = objectColors[int(random(objectColors.length))];
    this.counter = 0;
    this.duration = 30;
  }

  move() {

    noFill();
    stroke(this.randomColor);
    strokeWeight(1);

    this.currentX1 += this.distanceX * 0.05;
    this.currentY1 += this.distanceY * 0.05;
    if (this.counter > 10) {
      this.currentX2 += this.distanceX * 0.05;
      this.currentY2 += this.distanceY * 0.05;
    }

    line(this.currentX2, this.currentY2, this.currentX1, this.currentY1);

    this.counter++;
    this.duration--;

  }

}

//x mark in random location rotate
class LetterX {

  constructor() {
    this.x = 0;
    this.y = 0;
    this.baseX = random(width);
    this.baseY = random(height);
    this.size = random(15, 200);
    this.angle = 900;
    this.duration = 120;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    translate(this.baseX, this.baseY);

    rotate(this.angle);
    stroke(this.randomColor);
    strokeWeight(1.5);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, this.size / 5, this.size);
    rect(this.x, this.y, this.size, this.size / 5);

    rectMode(CORNER);

    if (this.angle > 46) {
      this.angle -= this.angle * 0.02;
    }
    this.duration--;

    pop();

  }

}

//arc rotate in center
class LetterC {

  constructor() {
    this.startPosition = 0;
    this.endPosition = 0;
    this.arcWidth = 120;
    this.arcScale = floor(random(5, 10));
    this.arcStart = random(0, 180);
    this.arcEnd = random(180, 360);
    this.arcSpeed1 = 7;
    this.arcSpeed2 = 3;
    this.duration = 60;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    translate(width / 2, height / 2);

    strokeCap(ROUND);
    noFill();
    stroke(this.randomColor);
    strokeWeight(3);
    arc(0, 0, this.arcWidth * this.arcScale, this.arcWidth * this.arcScale, this.arcStart, this.arcEnd);

    pop();

    this.arcStart += this.arcSpeed1;
    this.arcEnd += this.arcSpeed2;


    if (this.arcEnd < this.arcStart) {
      this.duration = -1;
    }

  }

}

//line move left to right
class LetterV {

  constructor() {
    this.xPos = 0;
    this.speed = 50;
    this.duration = 30;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    noStroke();
    fill(this.randomColor);
    rect(this.xPos, 0, 2, height);

    this.xPos += this.speed;
    this.duration--;

  }

}

//square zoom out, then zoom in from center
class LetterB {

  constructor() {
    this.angle = 0;
    this.size = width + 100;
    this.duration = 80;
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

    this.angle += 2;
    this.size -= 35;
    this.duration--;

  }

}

//square rotate around itself from random spot
class LetterN {

  constructor() {
    this.baseX = random(width);
    this.baseY = random(height);
    this.size = random(20, 200);
    this.angle = 900;
    this.duration = 60;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    translate(this.baseX, this.baseY);

    rotate(this.angle);
    noStroke();
    noFill();
    stroke(this.randomColor);
    strokeWeight(3);
    rectMode(CENTER);
    rect(0, 0, this.size);

    if (this.angle > 46) {
      this.angle -= this.angle * 0.05;
    }

    this.duration--;

    pop();

  }

}

//2 square expanding from center
class LetterM {

  constructor() {
    this.size = 1;
    this.duration = 60;
    this.randomColor = objectColors[int(random(objectColors.length))];
  }

  move() {

    push();

    translate(width / 2, height / 2);

    rectMode(CENTER);
    rotate(45);
    noFill();
    stroke(this.randomColor);
    strokeWeight(3);
    rect(0, 0, this.size);
    rect(0, 0, this.size - 500);

    pop();

    this.size += 30;
    this.duration--;

  }

}
