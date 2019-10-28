autowatch=1;
inlets=1;
outlets=2;

var lcdWidth=100;
var lcdHeight=100; 
var w;
var size=50;
var exp=8;

function random(min, max) {
	if(typeof max != 'undefined') {
    return Math.random() * (max - min) + min;
	} else {
		return Math.random() * min;
	}
}

function Walker() {
  	this.x=lcdWidth/2;
	this.y=lcdHeight/2;
	this.prevX;
    this.prevY;
}

Walker.prototype.render = function(){
    outlet(0, "linesegment " + this.prevX + " " + this.prevY + " " +  this.x + " " +  this.y);
    outlet(1,this.x + " " + this.y);
}
Walker.prototype.step = function() {

    var stepsize = montecarlo()*size;
    var stepx = random(-1, 1)*stepsize;
    var stepy = random(-1, 1)*stepsize;

    var current_x = this.x + stepx;
    var current_y = this.y + stepy;

    if(current_x>=0&&current_x<=(lcdWidth-1)&&current_y>=0&&current_y<=(lcdHeight-1)){
        this.prevX = this.x;
        this.prevY = this.y;
        this.x= current_x;
        this.y= current_y;
    } else {
        w.step();
    }
  }

function montecarlo() {
  while (true) {	

    var r1 = random(0,1);	
    var probability = Math.pow(1.0 - r1,exp);	

    var r2 = random(0,1);	
    if (r2 < probability) {	
      return r1;
    }
  }
}

function setup(x,y) {
    lcdWidth=x;
    lcdHeight=y; 
    w = new Walker();
}

function draw() {
  w.step();
  w.render();
}

function setSize(s){
    size=s;
}

function setExp(e){
    exp=e;
}