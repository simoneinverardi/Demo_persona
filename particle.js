function Particle() {
  this.pos = createVector(random(width/2+120, width-120), random(50, height-50));
  //this.vel = p5.Vector.random2D();
  //this.vel.mult(20);
  //this.acc = createVector(0, 0);
  let velAng = random(TWO_PI);
  this.vel = createVector(3 * cos(velAng), 3 * sin(velAng));
}



Particle.prototype.edges = function() {
  if (this.pos.x + this.vel.x < width/2+120) this.vel.x *= -1;
  if (this.pos.x + this.vel.x > width-120) this.vel.x *= -1;
  if (this.pos.y + this.vel.y < 50) this.vel.y *= -1;
  if (this.pos.y + this.vel.y > height-50) this.vel.y *= -1;
}

Particle.prototype.update = function() {
  this.edges();
  this.pos.add(this.vel);

  if (count>=10){
    this.vel.mult(particleV);
    this.vel.limit(limit);
  }

  else if(count<10){
    this.vel.div(particleV);
    this.vel.limit(limit);
  }

}

// Particle.prototype.show = function() {
//   stroke(0);
//   fill(0);
//   ellipse(this.pos.x, this.pos.y, this.r, this.r);
// }
