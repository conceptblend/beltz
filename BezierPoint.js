class BezierPoint {
  constructor(/*p5.Vector*/ _anchor, /*p5.Vector*/ _out, /*p5.Vector*/ _in) {
    this.anchor = _anchor;
    // Outbound control point relative to the anchor
    this.outDir = _out;
    // Inboud control point relative to the anchor
    this.inDir = _in;

    this.out = p5.Vector.add(this.anchor, this.outDir);
    this.in = p5.Vector.add(this.anchor, this.inDir);
  }

  draw() {
    push();
    stroke( 0, 255, 255 );
    fill( 0, 255, 255 );
    line( this.anchor.x, this.anchor.y, this.in.x, this.in.y );
    ellipse( this.in.x, this.in.y, 3, 3 );

    stroke( 92, 255, 255 );
    fill( 92, 255, 255 );
    line( this.anchor.x, this.anchor.y, this.out.x, this.out.y );
    ellipse( this.out.x, this.out.y, 3, 3 );

    stroke( 0, 0, 255 );
    fill( 0, 0, 255 );
    ellipse( this.anchor.x, this.anchor.y, 3, 3 );
    pop();
  }
}
