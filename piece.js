function spawnPiece(bX,bY,Side,Scale) {
  const piece = {
    x:bX,
    y:bY,
    side:Side,
    scale:Scale,
    kinged:false,
    draw: function() {
      if (this.side) {
        fill(255,0,0);
      }else {
        fill(50,50,50);
      }
      ellipseMode(CORNER);
      circle(this.scale*(this.x+1/6),this.scale*(this.y+1/6),this.scale*2/3);
      if (this.kinged) {
        push();
        fill(255,255,255);
        scale(this.scale,this.scale)
        translate(this.x+0.5,this.y+0.5)
        beginShape();
        vertex(-0.3,0);
        vertex(-0.3,-0.3);
        vertex(0,-0.15);
        vertex(0.3,-0.3);
        vertex(0.3,0)
        endShape(CLOSE);
        ellipseMode(CENTER);
        circle(0,-0.25,0.3)
        pop();
      }
    },  
    moveTo: function(nx,ny) {
      this.x = nx;
      this.y = ny;
    },
    king:function() {
      this.kinged = true;
    }
  }
  return piece;
}