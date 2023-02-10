const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];
var boat_animation = [];
var boat_spritesheet, boat_spritedata;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boat_spritedata = loadJSON("./assets/boat/boat.json");
  boat_spritesheet = loadImage("./assets/boat/boat.png");

  
}

function setup() {
 
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);

  var boat_frames = boat_spritedata.frames;
  for (var i = 0; i< boat_frames.lenght; i++){
    var pos = boat_frames [i].position;
    var img = boat_spritesheet.get(pos.x,pos,y,pos.w,pos.h);
    boat_animation.push(img);
  }

  

  
}

function draw() {
  showBoats()
  background(189);
  image(backgroundImg, 0, 0, width, height);

 

  Engine.update(engine);
  ground.display();
showBoats();
 

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();
  tower.display();

  
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//function to show the ball
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

 

    function showBoats() {
      if (boats.length > 0) {
        if (
          boats.length < 4 &&
          boats[boats.length - 1].body.position.x < width - 300
        ) {
          var positions = [-130, -100, -120, -80];
          var position = random(positions);
          var boat = new Boat(width,height - 100, 200, 200, position, boat_animation);
          boats.push(boat);
        }
    
        for (var i = 0; i < boats.length; i++) {
          Matter.Body.setVelocity(boats[i].body, {
            x: -0.9,
            y: 0
          });
    
          boats[i].display();
          boats[i].animate();
        }
      } else {
        var boat = new Boat(width, height - 100, 200, 200, -100, boat_animation);
        boats.push(boat);
      }
    }
function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}



