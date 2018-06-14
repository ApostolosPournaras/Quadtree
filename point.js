class point{

	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	show(highligh = false){

		if(highligh){
			noStroke();
			fill(200, 50, 40);
			ellipse(this.x, this.y, 4);

			noFill();
			stroke(20, 150, 140);
			ellipse(this.x, this.y, 8);

		}else{
			fill(255);
			noStroke();
			ellipse(this.x, this.y, 2);
		}

	}
}