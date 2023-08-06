var dp;
var g1, g2; 

$("input").bind("change click input ", function() {
  $(this).attr("data-value", this.value);
  
  resetPendulum();
});

$("input").each(function() {
  $(this).attr("data-value", this.value);
})

$("#bt_start").bind("click", function() {
  
  resetPendulum();
  dp.is_playing=true;
  return false;
});
$("#bt_pause").bind("click", function() {
  dp.is_playing = !dp.is_playing;
})
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  
  dp = new DoublePendulum();
}

function draw() {
  background(255);
  
  dp.update();
  dp.draw();
}
function resetPendulum() {
  background(255);
  dp.getValues();
  dp.reset();
 
}


function DoublePendulum() {
  this.g = .1;
  

  

  this.g2 = createGraphics(width,height);
  this.g2.stroke(0,50,128);
  this.g2.strokeWeight(1);
  
  this.px1=0;
  this.py1=0;
  this.px2=0;
  this.xy2=0;
  
  this.cx = width/2;
  this.cy = height/2;
  
  this.is_playing = false;
  this.getValues();
  this.reset();
}
DoublePendulum.prototype.getValues = function() {
  
  this.r1 = parseFloat(document.getElementById("r_1").value);
  this.m1 = parseFloat(document.getElementById("m_1").value);
  this.a1 = parseFloat(document.getElementById("a_1").value) * PI;
  
  this.r2 = parseFloat(document.getElementById("r_2").value);
  this.m2 = parseFloat(document.getElementById("m_2").value);
  this.a2 = parseFloat(document.getElementById("a_2").value) * PI;
}

DoublePendulum.prototype.reset = function() {
  this.g2.clear();
  
  this.a1_v = 0;
  this.a2_v = 0;
  
  this.px2 = void 0;
  this.py2 = void 0;
  
  this.is_playing = false;
}

DoublePendulum.prototype.update = function() {
  if (this.is_playing) {
    var num_1 = - this.g * (2 * this.m1 + this.m2) * sin(this.a1) - this.m2 * this.g * sin(this.a1 - 2 * this.a2) - 2 * sin(this.a1 - this.a2) * this.m2 * (this.a2_v*this.a2_v*this.r2 + this.a1_v*this.a1_v*this.r1 * cos(this.a1-this.a2));

    var num_2 = 2 * sin(this.a1 - this.a2) * (this.a1_v*this.a1_v*this.r1 * (this.m1 + this.m2) + this.g * (this.m1 + this.m2) * cos(this.a1) + this.a2_v*this.a2_v * this.r2 * this.m2 * cos(this.a1-this.a2));


    var den_factor = 2*this.m1+this.m2 - this.m2 * cos(2*this.a1 - 2*this.a2);



    this.a1_a = num_1 / (this.r1 * den_factor);
    this.a2_a = num_2 / (this.r2 * den_factor);

    this.a1_v += this.a1_a;
    this.a2_v += this.a2_a;
    this.a1 += this.a1_v;
    this.a2 += this.a2_v;
  }
  
  this.cx = width/2;
  this.cy = height/2;
  
  this.x1 = this.r1 * sin(this.a1);
  this.y1 = this.r1 * cos(this.a1);
  
  this.x2 = this.x1 + this.r2 * sin(this.a2);
  this.y2 = this.y1 + this.r2 * cos(this.a2);
  
  
}


DoublePendulum.prototype.draw = function() {
  push();
  
  //image(this.g1,0,0);
  image(this.g2,0,0);
  
  translate(this.cx,this.cy);
  stroke(0);
  strokeWeight(2);
  
  line(0,0,this.x1, this.y1);
  line(this.x1, this.y1,this.x2, this.y2);
  
  
  fill(255);
  ellipse(0,0,5);
  
  fill(0);
  noStroke();
  
  ellipse(this.x1, this.y1, Math.sqrt(this.m1)*2);
  ellipse(this.x2, this.y2, Math.sqrt(this.m2)*2);
  
  if (this.is_playing) {
  
  this.g2.background(255,4);
  
  this.g2.strokeWeight(2)
  this.g2.line(this.cx+this.px2, this.cy+this.py2, this.cx+this.x2, this.cy+this.y2);
  this.px2 = this.x2;
  this.py2 = this.y2;
  }
  pop();
}
