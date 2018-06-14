var qTree;
var area;

var betnReset;
var betnRandom;

function setup(){

	gridCanvas = createCanvas(800, 600);
	background(51);
	stroke(255);
	fill(255);

	qTree = new QuadTree(undefined, 4, width/2, height/2, width, height);
	area = new Area(width/2, height/2, 150, 100);

	btnRest = createButton('Reset');
	btnRest.size(60,20)
	btnRest.position(20, gridCanvas.position().y + height+20)
  	btnRest.mousePressed(Reset);

	btnRandom = createButton('Random');
	btnRandom.size(60,20)
	btnRandom.position(20 + btnRest.width + 20, gridCanvas.position().y + height+20)
  	btnRandom.mousePressed(FillRandomPoints);

	qTree.show();
	area.show();
}

function mousePressed(){
	var p = new point(mouseX, mouseY);
	qTree.addPoint(p);
}

function Reset(){
	background(51);
	qTree = new QuadTree(undefined, 4, width/2, height/2, width, height);
}

function FillRandomPoints(){
	Reset();

  	for(var i=0; i<400; i++){
  		var x = floor(width*Math.random());
		var y = floor(height*Math.random());
		var p = new point(x,y);

		qTree.addPoint(p);
  	}
}

function highlightPoints(p_list){
	for(var i=0; i<p_list.length; i++){
		p_list[i].show(true);
	}
}

function draw(){
	background(51);
	qTree.show();
	area.setPosition(mouseX, mouseY);
	area.show();

	highlightPoints(qTree.getPointsInsideArea(area));
}
