function MyWindowedWall(scene, minWH, maxWH, minWV, maxWV) {
	CGFobject.call(this,scene);

	this.minS = 0;
	this.maxS = 1;
	this.minT = 0;
	this.maxT = 1;

	this.minWH = minWH || 0.4;
	this.maxWH = maxWH || 0.6;
	this.minWV = minWV || 0.4;
	this.maxWV = maxWV || 0.6;

	this.medS    = (this.minS + this.maxS) / 2;
	this.medT    = (this.minT + this.maxT) / 2;
	this.deltaS  = this.maxS - this.minS;
	this.deltaT  = this.maxT - this.minT;
	this.deltaWH = this.maxWH - this.minWH;
	this.deltaWV = this.maxWV - this.minWV;

	this.topLeft		= new MyQuad(scene, this.minS,	this.minWH,	this.minT,	this.minWV);
	this.topCenter		= new MyQuad(scene, this.minWH,	this.maxWH,	this.minT,	this.minWV);
	this.topRight		= new MyQuad(scene, this.maxWH,	this.maxS,	this.minT,	this.minWV);
	this.middleLeft		= new MyQuad(scene, this.minS,	this.minWH,	this.minWV,	this.maxWV);
	this.middleRight	= new MyQuad(scene, this.maxWH,	this.maxS,	this.minWV,	this.maxWV);
	this.bottomLeft		= new MyQuad(scene, this.minS,	this.minWH,	this.maxWV,	this.maxT);
	this.bottomCenter	= new MyQuad(scene, this.minWH,	this.maxWH,	this.maxWV,	this.maxT);
	this.bottomRight	= new MyQuad(scene, this.maxWH,	this.maxS,	this.maxWV,	this.maxT);

}

MyWindowedWall.prototype = Object.create(CGFobject.prototype);
MyWindowedWall.prototype.constructor = MyWindowedWall;

MyWindowedWall.prototype.display = function() {

	// Bottom Left

	this.scene.pushMatrix();
		this.scene.scale(this.minWH, 1 - this.maxWV, 1);
		this.scene.translate(0.5, 0.5, 0);
		this.bottomLeft.display();
	this.scene.popMatrix();


	// Bottom center

	this.scene.pushMatrix();
		this.scene.translate(this.minWH, 0, 0);
		this.scene.scale(this.maxWH - this.minWH, 1 - this.maxWV, 1);
		this.scene.translate(0.5, 0.5, 0);
		this.bottomCenter.display();
	this.scene.popMatrix();


	// Bottom right

	this.scene.pushMatrix();
		this.scene.translate(this.maxWH, 0, 0);
		this.scene.scale(1 - this.maxWH, 1 - this.maxWV, 1);
		this.scene.translate(0.5, 0.5, 0);
		this.bottomRight.display();
	this.scene.popMatrix();


	// Middle left

	this.scene.pushMatrix();
		this.scene.translate(0, 1 - this.maxWV, 0);
		this.scene.scale(this.minWH, this.maxWV - this.minWV, 1);
		this.scene.translate(0.5, 0.5, 0);
		this.middleLeft.display();
	this.scene.popMatrix();


	// Middle right

	this.scene.pushMatrix();
		this.scene.translate(this.maxWH, 1 - this.maxWV, 0);
		this.scene.scale(1 - this.maxWH, this.maxWV - this.minWV, 1);
		this.scene.translate(0.5, 0.5, 0);
		this.middleRight.display();
	this.scene.popMatrix();


	// Top left

	this.scene.pushMatrix();
		this.scene.translate(0, 1 - this.minWV, 0);
		this.scene.scale(this.minWH, this.minWV, 1);
		this.scene.translate(0.5, 0.5, 0);
		this.topLeft.display();
	this.scene.popMatrix();


	// Top center

	this.scene.pushMatrix();
		this.scene.translate(this.minWH, 1 - this.minWV, 0);
		this.scene.scale(this.maxWH - this.minWH, this.minWV, 1);
		this.scene.translate(0.5, 0.5, 0);
		this.topCenter.display();
	this.scene.popMatrix();


	// Top right

	this.scene.pushMatrix();
		this.scene.translate(this.maxWH, 1 - this.minWV, 0);
		this.scene.scale(1 - this.maxWH, this.minWV, 1);
		this.scene.translate(0.5, 0.5, 0);
		this.topRight.display();
	this.scene.popMatrix();

};