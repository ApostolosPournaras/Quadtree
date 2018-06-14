class QuadTree{

	constructor(parent, maxPoints, x, y, width, height){
		this.parent = parent;
		this.layer;
		this.maxPoints = maxPoints;
		this.area = new Area(x, y, width, height);
		this.points = [];
		this.upLeftTree;
		this.upRightTree;
		this.downLeftTree;
		this.downRightTree;
		this.hasSplitted = false;

		if(this.parent){
			this.layer = this.parent.layer+1;
		}else{
			this.layer = 0;
		}

	}

	addPoint(p){

		if(!this.area.containsPoint(p)){
			return false;
		}

		if(this.points.length < this.maxPoints){
			this.points.push(p);
			return true;
		}

		if(!this.hasSplitted){
			this.split();
		}

		if (this.upLeftTree.addPoint(p)){
			return true;
		}

		if (this.upRightTree.addPoint(p)){
			return true;
		}

		if (this.downLeftTree.addPoint(p)){
			return true;
		}

		if (this.downRightTree.addPoint(p)){
			return true;
		}
		
		return false;
		
	}


	split(){
		this.upLeftTree    = new QuadTree(this, this.maxPoints, this.area.x - this.area.width/4, this.area.y - this.area.height/4, this.area.width/2, this.area.height/2);
		this.upRightTree   = new QuadTree(this, this.maxPoints, this.area.x + this.area.width/4, this.area.y - this.area.height/4, this.area.width/2, this.area.height/2);
		this.downLeftTree  = new QuadTree(this, this.maxPoints, this.area.x - this.area.width/4, this.area.y + this.area.height/4, this.area.width/2, this.area.height/2);
		this.downRightTree = new QuadTree(this, this.maxPoints, this.area.x + this.area.width/4, this.area.y + this.area.height/4, this.area.width/2, this.area.height/2);

		this.hasSplitted = true;
	}

	getPointsInsideArea(a){
		var result_p = [];

		// Automatically abort if the range does not intersect this quad
	    if (!this.area.intersects(a))
	      return result_p;

	    // Check objects at this quad level
	    for (var i=0; i<this.points.length; i++)
	    {
	      if (a.containsPoint(this.points[i]))
	        result_p.push(this.points[i]);
	    }

	    // Terminate here, if there are no children
	    if (!this.hasSplitted){
	      return result_p;
	    }

	    // Otherwise, add the points from the children
	    result_p.push.apply(result_p, this.upLeftTree.getPointsInsideArea(a))
	    result_p.push.apply(result_p, this.upRightTree.getPointsInsideArea(a))
	    result_p.push.apply(result_p, this.downLeftTree.getPointsInsideArea(a))
	    result_p.push.apply(result_p, this.downRightTree.getPointsInsideArea(a))

	    return result_p;
	}

	show(){

		for(var i=0; i<this.points.length; i++){
			this.points[i].show();

			// var txt = "[" + floor(this.points[i].x) + ", " + floor(this.points[i].y) + "]";
			// strokeWeight(0);
			// text(txt, floor(this.points[i].x), floor(this.points[i].y), 100, 20);
		}

		if(this.hasSplitted){
			stroke(255);
			strokeWeight(1);

			let xa1 = this.area.x - this.area.width/2;
			let xa2 = this.area.x + this.area.width/2;

			let yb1 = this.area.y - this.area.height/2;
			let yb2 = this.area.y + this.area.height/2;

			line(xa1, this.area.y, xa2, this.area.y);
			line(this.area.x, yb1, this.area.x, yb2);

			this.upLeftTree.show();
			this.upRightTree.show();
			this.downLeftTree.show();
			this.downRightTree.show();
		}

	}

}