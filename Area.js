class Area{

	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	setPosition(x,y){
		this.x = x;
		this.y = y;
	}

	containsPoint(p){
		var isXinside = p.x >= this.x - this.width/2  && p.x < this.x + this.width/2;
		var isYinside = p.y >= this.y - this.height/2 && p.y < this.y + this.height/2;
		return isXinside && isYinside;
	}

	intersects(a){
		var hasVertOverlap = this.x + this.width/2  >= a.x - a.width/2  || this.x - this.width/2  <= a.x + a.width/2
		var hasHorOverlap  = this.y + this.height/2 >= a.y - a.height/2 || this.y - this.height/2 <= a.y + a.height/2
		return hasVertOverlap && hasHorOverlap;
	}


	show(){
		stroke(220, 20, 70);
		noFill();
		rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
	}

}