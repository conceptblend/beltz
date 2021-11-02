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

function setup() {
  createCanvas(SIZE, SIZE);
  colorMode( HSB, 255, 255, 255, 255 );
  strokeWeight( 2 );
  // Default Stroke
  // stroke( 0, 0, 255, 255 );
  noStroke();
  fill( 0, 0, 255, 16 );
  // noLoop();

  background(32);
}

function draw() {
  background(32);
 
  
  // USE MOUSE TO CONTROL
  let mx = Math.min( Math.max( 0, mouseX ), SIZE )
  let my = Math.min( Math.max( 0, mouseY ), SIZE )
  
  if ( mouseIsPressed ) {

    if ( isDrawing ) {
      // just update the wEnd position
      wEnd.pos.x = mx;
      wEnd.pos.y = my;
    } else {
      // just started so create the start
      // wStart = new Circle( mx, my, 16 + Math.random() * 64 );
      // wEnd = new Circle( mx, my, 16 + Math.random() * 64 );
      wStart = new Circle( mx, my, 48 );
      wEnd = new Circle( mx, my, 72 );

      wobbles.push( new Wobble( wStart, wEnd, [Math.random() * 64, 255, 255, 128] ) );

      isDrawing = true;
    }
  
  } else {
    // wStart = null;
    // wEnd = null;
    isDrawing = false;
  }


  wobbles.forEach( w => {
    w.update();
    w.draw();
    if ( SHOW_STRUCTURE ) {
      w.drawStruct();
    }
  })

  if ( EXPORT_IMAGE && frameCount > 761 ) {
    save(`${getName()}.png`);
    noLoop();
  }
}

function keyPressed() {
  if (key == "d" || keyCode == 68) {
    save(`${getName()}.png`);
  } else if (key == "x") {
    noLoop();
  }
}

function getName() {
  return `Wobble-v2-${config.label}-${new Date().toISOString()}`;
}





