//effect when hitting the wrong key in game state
//adapted from Code Source 1
class WrongKeys {

  constructor() {
    this.x = width / 2;
    this.y = height * 0.3;
    this.size = 50;
    this.radius = 6;
    this.angle = 0;
    this.randomColor = objectColors[int(random(objectColors.length))];
    this.duration = 15;
  }

  move() {
    push();
    noStroke();
    translate(width / 2, height / 2);
    rectMode(CENTER);
    stroke(this.randomColor);
    strokeWeight(2);
    noFill();
    rotate(random(40, 50));
    square(25, -42, 100, 10);
    pop();

    fill(white);
    noStroke();
    textAlign(CENTER);
    textSize(18);
    text('m i s s !', width / 2 + 125 + sin(millis()), height / 2 - 100);

    this.duration--;
  }

}

//effect when hitting keys in homepage row 1
class Row1Effect {

  constructor(_letter, _location, _duration, _randomColor) {
    this.letter = _letter;
    this.location = _location;
    this.duration = _duration;
    this.randomColor = _randomColor;
  }

  move() {

    push();

    translate(width / 2 - 300, height / 2);

    stroke(white);
    strokeWeight(2);
    noFill();
    rectNeon(this.location * gutter, 0, 50, 50, this.randomColor);

    noStroke();
    fill(white);
    textNeon(this.letter, this.location * gutter + 24, 22, this.randomColor);

    this.duration--;

    pop();

  }

}

//effect when hitting keys in homepage row 2
class Row2Effect {

  constructor(letter, location, duration, randomColor) {
    this.letter = letter;
    this.location = location;
    this.duration = duration;
    this.randomColor = randomColor;
  }

  move() {

    push();

    translate(width / 2 - 300, height / 2);

    stroke(white);
    strokeWeight(2);
    noFill();
    rectNeon(this.location * gutter + gutter / 2, gutter, 50, 50, this.randomColor);

    noStroke();
    fill(white);
    textNeon(this.letter, this.location * gutter + 55, gutter + 22, this.randomColor);

    this.duration--;

    pop();

  }

}

//effect when hitting keys in homepage row 3
class Row3Effect {

  constructor(letter, location, duration, randomColor) {
    this.letter = letter;
    this.location = location;
    this.duration = duration;
    this.randomColor = randomColor;
  }

  move() {

    push();

    translate(width / 2 - 300, height / 2);

    stroke(white);
    strokeWeight(2);
    noFill();
    rectNeon(this.location * gutter + gutter, gutter * 2, 50, 50, 50, this.randomColor);

    noStroke();
    fill(white);
    textNeon(this.letter, this.location * gutter + 85, 22 + gutter * 2, this.randomColor);

    this.duration--;

    pop();

  }

}
