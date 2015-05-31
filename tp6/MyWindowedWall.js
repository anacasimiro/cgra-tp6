function MyWindowedWall(scene, minS, maxS, minT, maxT, minWH, maxWH, minWV, maxWV) {
	CGFobject.call(this,scene);

	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;

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
	this.tex_w   = 1 / this.deltaS;
	this.tex_h   = 1 / this.deltaT;


	this.mappedMinWH = this.medS - (this.deltaWH * this.deltaS) / 2;
	this.mappedMaxWH = this.medS + (this.deltaWH * this.deltaS) / 2;

	this.mappedMinWV = this.medT - (this.deltaWV * this.deltaT) / 2;
	this.mappedMaxWV = this.medT + (this.deltaWV * this.deltaT) / 2;



	this.topLeft		= new MyQuad(scene, this.minS,			this.mappedMinWH,	this.minT,			this.mappedMinWV);
	this.topCenter		= new MyQuad(scene, this.mappedMinWH,	this.mappedMaxWH,	this.minT,			this.mappedMinWV);
	this.topRight		= new MyQuad(scene, this.mappedMaxWH,	this.maxS,			this.minT,			this.mappedMinWV);
	this.middleLeft		= new MyQuad(scene, this.minS,			this.mappedMinWH,	this.mappedMinWV,	this.mappedMaxWV);
	this.middleRight	= new MyQuad(scene, this.mappedMaxWH,	this.maxS,			this.mappedMinWV,	this.mappedMaxWV);
	this.bottomLeft		= new MyQuad(scene, this.minS,			this.mappedMinWH,	this.mappedMaxWV,	this.maxT);
	this.bottomCenter	= new MyQuad(scene, this.mappedMinWH,	this.mappedMaxWH,	this.mappedMaxWV,	this.maxT);
	this.bottomRight	= new MyQuad(scene, this.mappedMaxWH,	this.maxS,			this.mappedMaxWV,	this.maxT);



	//this.topLeft		= new MyQuad(scene, this.minS,	this.minS	+ this.minWH				/ this.tex_w, -0.75, -0.75 + this.minWV / this.tex_h);
	//this.topCenter		= new MyQuad(scene, 0.25,		0.25		+ (this.maxWH - this.minWH) / this.tex_w, -0.75, -0.75 + this.minWV / this.tex_h);
	//this.topRight		= new MyQuad(scene, 0.75,		0.75		+ (1 - this.maxWH)			/ this.tex_w, -0.75, -0.75 + this.minWV / this.tex_h);
	//this.middleLeft		= new MyQuad(scene, -0.75,		-0.75		+ this.minWH				/ this.tex_w, 0.25, 0.25 + (this.maxWV - this.minWV) / this.tex_h);
	//this.middleRight	= new MyQuad(scene, 0.75,		0.75		+ (1 - this.maxWH)			/ this.tex_w, 0.25, 0.25 + (this.maxWV - this.minWV) / this.tex_h);
	//this.bottomLeft		= new MyQuad(scene, -0.75,		-0.75		+ this.minWH				/ this.tex_w, 0.75, 0.75 + (1 - this.maxWV) / this.tex_h);
	//this.bottomCenter	= new MyQuad(scene, 0.25,		0.25		+ (this.maxWH - this.minWH) / this.tex_w, 0.75, 0.75 + (1 - this.maxWV) / this.tex_h);
	//this.bottomRight	= new MyQuad(scene, 0.75,		0.75		+ (1 - this.maxWH)			/ this.tex_w, 0.75, 0.75 + (1 - this.maxWV) / this.tex_h);

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