// TODO:
//  - Should probably convert the radii to a factor of the size
//  - Explore other ways of moving the anchors

const SIZE = 1080;
const MODIFIER = 1.4;

const SHOW_CONTROL_HANDLES = !true;
const SHOW_STRUCTURE = !true;
const EXPORT_IMAGE = true;

const PI = 3.1415926535;

const presets = {
  one: {
    label: "one",
    c1: {
      x: SIZE * 0.35,
      y: SIZE * 0.85,
      r: SIZE * 0.03,// 16/540
    },
    c2: {
      x: SIZE * 0.5,
      y: SIZE * 0.5,
      r: SIZE * 0.09,// 48/540
    },
    c3: {
      x: SIZE * 0.65,
      y: SIZE * 0.15,
      r: SIZE * 0.06,// 32/540
    },
  },
  two: {
    label: "two-beginning",
    c1: {
      x: SIZE * 0.5,
      y: SIZE * 0.175,
      r: SIZE * 0.01,// 16/540
    },
    c2: {
      x: SIZE * 0.5,
      y: SIZE * 0.625,
      r: SIZE * 0.09,// 48/540
    },
    c3: {
      x: SIZE * 0.5,
      y: SIZE * 0.175,
      r: SIZE * 0.09,// 32/540
    },
  },
  three: {
    label: "three-end",
    c1: {
      x: SIZE * 0.3,
      y: SIZE * 0.65,
      r: SIZE * 0.09,// 48/540
    },
    c2: {
      x: SIZE * 0.5,
      y: SIZE * 0.5,
      r: SIZE * 0.03,// 16/540
    },
    c3: {
      x: SIZE * 0.7,
      y: SIZE * 0.65,
      r: SIZE * 0.09,// 48/540
    },
  },
  four: {
    label: "four",
    c1: {
      x: SIZE * 0.3,
      y: SIZE * 0.65,
      r: SIZE * 0.09,// 48/540
    },
    c2: {
      x: SIZE * 0.5,
      y: SIZE * 0.5,
      r: SIZE * 0.03,// 16/540
    },
    c3: null,
  },
};

let config = presets.two;

let c1, c2, c3;
let w1, w2;

let pinnedPoint;

function setup() {
  createCanvas(SIZE, SIZE);
  colorMode( HSB, 255, 255, 255, 255 );
  noFill();
  strokeWeight( 2 );
  // Default Stroke
  stroke( 0, 0, 255, 16 );
  
  c1 = new Circle( config.c1.x, config.c1.y, config.c1.r ); // 48 // set x==yfor fun things
  c2 = new Circle( config.c2.x, config.c2.y, config.c2.r );
  c3 = new Circle( config.c3.x, config.c3.y, config.c3.r );
  c4 = new Circle( config.c2.x, SIZE * 0.85, config.c3.r );

  w1 = new Wobble( c2, c1 );
  w2 = new Wobble( c3, c2 );
  w3 = new Wobble( c4, c2 );

  // noLoop();

  background(32);
}

function draw() {
  // background(32);
  
  // HSB
  stroke( frameCount % 64, 192, 255, 16 ); // red-orange
  
  // USE MOUSE TO CONTROL
  let mx = Math.min( Math.max( 0, mouseX ), SIZE )
  let my = Math.min( Math.max( 0, mouseY ), SIZE )
  
  // WOBBLE
  let rr = SIZE * 0.12;
  
  // Optional scaling over time.
  c2.setRadius(16 + (0.5 + 0.5 * Math.sin( frameCount * 0.1 )) * rr );

  // Use conditional if you want to prevent weird overlaps.
  // It's kind of more fun if you don't prevent this though.
  if ( mouseIsPressed ) {//&& p5.Vector.dist( createVector( mx, my ), c2.pos) > c1.r + c2.r ) {
    c2.pos.x = mx;
    c2.pos.y = my;
  } else {
    c2.pos.x = config.c2.x + Math.cos( frameCount ) * 64;
    c2.pos.y = config.c2.y + Math.sin( frameCount ) * 64;
  }


  [w1,w2].forEach( w => {
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





