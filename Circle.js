const kappa = 0.5522847498;

class Circle {
  constructor (x, y, r) {
    this.pos = createVector( x, y );
    this.r = r;
    // offset
    this.o = this.r * kappa;
  }
  draw() {
    circle( this.pos.x, this.pos.y, this.r * 2 );
  }
  setRadius( r ) {
    this.r = r;
    // offset
    this.o = this.r * kappa;
  }
}