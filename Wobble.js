class Wobble {
  constructor(_c1, _c2) {
    /**
     **  This swapping might need to be done each time to ensure the drawing is correct.
     **  Alternatively, the drawing steps need to be "smarter" to draw the points right.
     **/
    // C1 is the smaller circle
    this.c1 = _c1.r <= _c2.r ? _c1 : _c2;
    // C2 is the larger circle
    this.c2 = _c1.r <= _c2.r ? _c2 : _c1;

    this.c1points = {
      a: null,
      b: null,
      c: null
    };
    this.c2points = {
      a: null,
      b: null,
      c: null
    };

    this.update();
  }

  update() {
    /**
        Three points per circle:
          pa -> first perpendicular to direction
          pb -> outer extension of direction
          pc -> second perpendicular to direction
      **/
    
    // Calculate the direction of the vector that connects the center of
    // the two circles.
    let c1c2 = p5.Vector.sub(this.c2.pos, this.c1.pos).normalize();
    let c2c1 = p5.Vector.mult( c1c2, -1 );
    
    // Calculate the additional offset for anchor point based on
    // the Common Direct Tangent between the circles.
    // https://www.math-only-math.com/important-properties-of-direct-common-tangents.html
    let dist = p5.Vector.dist(this.c2.pos, this.c1.pos);
    let rDelta = this.c1.r - this.c2.r ;
    let theta = Math.acos( rDelta / dist ); // for a happy accident make this 90 + acos();

    //
    // C1 points
    //
    let tmp = null;
    let ratio = theta / (PI * 0.5);
    let lengthA = this.c1.o * ratio;
    let lengthB = this.c1.o / ratio;

    tmp = p5.Vector.rotate( c1c2, theta );
    this.c1points.a = new BezierPoint(
      getAnchorPoint( this.c1.pos, tmp, this.c1.r ),
      p5.Vector.rotate( tmp,  PI * 0.5).mult( lengthB ),
      p5.Vector.rotate( tmp, -PI * 0.5).mult( lengthA )
    );

    tmp = p5.Vector.rotate( c1c2, PI );
    this.c1points.b = new BezierPoint(
      getAnchorPoint( this.c1.pos, tmp, this.c1.r ),
      p5.Vector.rotate( tmp,  PI * 0.5).mult( this.c1.o ),
      p5.Vector.rotate( tmp, -PI * 0.5).mult( this.c1.o )
    );
    
    tmp = p5.Vector.rotate( c1c2, -theta );
    this.c1points.c = new BezierPoint(
      getAnchorPoint( this.c1.pos, tmp, this.c1.r ),
      p5.Vector.rotate( tmp,  PI * 0.5).mult( lengthA ),
      p5.Vector.rotate( tmp, -PI * 0.5).mult( lengthB )
    );

    //
    // C2 points
    //
    theta = PI - theta;

    ratio = theta / (PI * 0.5);
    lengthA = this.c2.o * ratio;
    lengthB = this.c2.o / ratio;

    tmp = p5.Vector.rotate( c2c1, theta );
    length = this.c2.o;
    this.c2points.a = new BezierPoint(
      getAnchorPoint( this.c2.pos, tmp, this.c2.r ),
      p5.Vector.rotate( tmp,  PI * 0.5).mult( lengthB ),
      p5.Vector.rotate( tmp, -PI * 0.5).mult( lengthA )
    );

    tmp = p5.Vector.rotate( c2c1, PI );
    this.c2points.b = new BezierPoint(
      getAnchorPoint( this.c2.pos, tmp, this.c2.r ),
      p5.Vector.rotate( tmp,  PI * 0.5).mult( this.c2.o ),
      p5.Vector.rotate( tmp, -PI * 0.5).mult( this.c2.o )
    );
    
    tmp = p5.Vector.rotate( c2c1, -theta );
    this.c2points.c = new BezierPoint(
      getAnchorPoint( this.c2.pos, tmp, this.c2.r ),
      p5.Vector.rotate( tmp,  PI * 0.5).mult( lengthA ),
      p5.Vector.rotate( tmp, -PI * 0.5).mult( lengthB )
    );
  }

  draw() {
    beginShape();

    vertex(this.c1points.a.anchor.x, this.c1points.a.anchor.y);

    bezierVertex(
      this.c1points.a.out.x,
      this.c1points.a.out.y,
      this.c1points.b.in.x,
      this.c1points.b.in.y,
      this.c1points.b.anchor.x,
      this.c1points.b.anchor.y
    );

    bezierVertex(
      this.c1points.b.out.x,
      this.c1points.b.out.y,
      this.c1points.c.in.x,
      this.c1points.c.in.y,
      this.c1points.c.anchor.x,
      this.c1points.c.anchor.y
    );

    bezierVertex(
      this.c1points.c.out.x,
      this.c1points.c.out.y,
      this.c2points.a.in.x,
      this.c2points.a.in.y,
      this.c2points.a.anchor.x,
      this.c2points.a.anchor.y
    );

    bezierVertex(
      this.c2points.a.out.x,
      this.c2points.a.out.y,
      this.c2points.b.in.x,
      this.c2points.b.in.y,
      this.c2points.b.anchor.x,
      this.c2points.b.anchor.y
    );

    bezierVertex(
      this.c2points.b.out.x,
      this.c2points.b.out.y,
      this.c2points.c.in.x,
      this.c2points.c.in.y,
      this.c2points.c.anchor.x,
      this.c2points.c.anchor.y
    );

    bezierVertex(
      this.c2points.c.out.x,
      this.c2points.c.out.y,
      this.c1points.a.in.x,
      this.c1points.a.in.y,
      this.c1points.a.anchor.x,
      this.c1points.a.anchor.y
    );

    endShape(); // option to just use CLOSE if this remains a vertex
  }

  drawStruct() {
    push();
    stroke( 128, 255, 255 ); // teal/aqua
    this.c1.draw();
    stroke( 64, 255, 255 ); // green
    this.c2.draw();

    
    stroke(0, 255, 255);
    line(this.c1.pos.x, this.c1.pos.y, this.c2.pos.x, this.c2.pos.y);
    ellipse(this.c1.pos.x, this.c1.pos.y, 2, 2);
    ellipse(this.c2.pos.x, this.c2.pos.y, 2, 2);


    this.c1points.a.draw();
    this.c1points.b.draw();
    this.c1points.c.draw();

    this.c2points.a.draw();
    this.c2points.b.draw();
    this.c2points.c.draw();
    pop();
  }
}

// UTILITY FUNCTION
let getAnchorPoint = function( center, dir, radius ) {
  return p5.Vector.add(
      center,
      p5.Vector.mult( dir, radius )
    );
}