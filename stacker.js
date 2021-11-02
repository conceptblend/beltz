// TODO:
//  - Should probably convert the radii to a factor of the size
//  - Explore other ways of moving the anchors

const SIZE = 1080;
const MODIFIER = 1.4;

const SHOW_STRUCTURE = !true;
const EXPORT_IMAGE = !true;

let circles = [];
let wobbles = [];

let wStart, wEnd;
let isDrawing = !true;

let bgColor = [ 136, 56, 204, 255 ];

function setup() {
  createCanvas(SIZE, SIZE);
  colorMode( HSB, 255, 255, 255, 255 );
  strokeWeight( 2 );
  // Default Stroke
  // stroke( 0, 0, 255, 255 );
  noStroke();
  fill( 0, 0, 255, 16 );

  // background(32);
  background(bgColor);

  reset();
}

function reset() {
  let stepSize = 64;
  let steps = SIZE / stepSize;
  let baseSize = 8;
  let multiplier = baseSize * 6;

  wobbles = [];

  for (let n=0; n < steps; n++ ) {
    wStart = new Circle( SIZE * 0.2, n * stepSize, baseSize + Math.random() * multiplier );
    wEnd = new Circle( SIZE * 0.8, n * stepSize, baseSize + Math.random() * multiplier );


    // wobbles.push( new Wobble( wStart, wEnd, [Math.random() * 32, 192, 255, 255] ) );
    wobbles.push( new Wobble( wStart, wEnd, [ 0, 192, 0, 255 ] ) );
  }

  loop();
}
function draw() {
  // background(32);
  background( bgColor );
 
  wobbles.forEach( w => {
    w.update();
    push();
      stroke( w.color );
      strokeWeight( 4 );
      noFill();
      // fill( this.color );
      w.draw();
    pop();
    if ( SHOW_STRUCTURE ) {
      w.drawStruct();
    }
  })

  if ( EXPORT_IMAGE && frameCount > 761 ) {
    save(`${getName()}.png`);
    noLoop();
  }

  noLoop();
}

function keyPressed() {
  if ( key == "s" ) {
    save(`${getName()}.png`);
  } else if ( key == "d" ) {
    reset();
  } else if ( key == "x" ) {
    noLoop();
  }
}

function getName() {
  return `Wobble-v2-STACKER-${new Date().toISOString()}`;
}
