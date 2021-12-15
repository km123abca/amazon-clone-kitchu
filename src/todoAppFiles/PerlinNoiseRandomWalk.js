// Adapted from Dan Shiffman, natureofcode.com

var Walker = function() {
    this.x = width/2;
    this.y = height/2;
    this.tx = 0;
    this.ty = 10000;
};


Walker.prototype.display = function() {
    stroke(0, 0, 0);
    point(this.x, this.y);
};


Walker.prototype.walk = function() 
                        {
                        this.x = map(noise(this.tx), 0, 1, 0, width);
                        this.y = map(noise(this.ty), 0, 1, 0, height);   
                        this.tx += 0.01;
                        this.ty += 0.01;
                        };


var w;
var setup=()=>
    {
      w = new Walker();  
    }
var draw = function() {
    w.walk();
    w.display();
};
