function RectButton(x,y,width,height,p,col) {
  var self = this;

  this.x = x;
  this.y = y;

  this.col = col;
  this.ogcol = col;

  this.width = width;
  this.height = height;

  this.flash = function(col){
  	this.col = col;
  	setTimeout(function(){self.col = self.ogcol}, 100)
  }

  this.isInside = function(x,y) {
  	if (x > this.x && 
        x < this.x + this.width && 
        y > this.y && 
        y < this.y + this.height)
      return true;
    else return false;
  }

  this.display = function() {
	  p.fill(this.col);
	  p.strokeWeight(1);
	  p.rect(this.x,this.y,this.width,this.height);
  }

}