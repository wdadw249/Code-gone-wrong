class Boat {
  constructor(x, y, width, height, boatPos, boat_animation) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
    };

    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    this.animation = boat_animation;
    this.speed = 0.05
    this.boatPosition = boatPos;
    this.image = loadImage("assets/boat.png");
    World.add(world, this.body);
  }

  animate(){
    this.speed +=0.05%1.1
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var index = floor(this.speed%this.animation.length);
  
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, this.boatPosition, this.width, this.height);
    noTint();
    pop();
  }
}