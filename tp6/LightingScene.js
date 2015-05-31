var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var FPS = 90;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);
	
	this.enableTextures(true);
	
	this.initCameras();	
	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);



	// Interface

	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;
	this.clockSwitch = true;
	this.BigRobot = true;
	this.BabyRobot = true;
	this.bigRobotSpeed = 0.12;
	this.babyRobotSpeed = 0.2;
	this.bigRobotAppearance = 1;
	this.babyRobotAppearance = 2;
	this.tables = true;
	this.pillar = true;



	// Scene elements
	
    this.table 		= new MyTable(this);
	this.stool 		= new MyStool(this);

	this.wall 		= new Plane(this);
	this.boardA 	= new Plane(this, BOARD_A_DIVISIONS);
	this.boardB 	= new Plane(this, BOARD_B_DIVISIONS);

	this.floor 		= new MyQuad(this,0, 10, 0, 12);
	this.prism 		= new MyPrism(this, 8, 20);
	this.cylinder 	= new MyCylinder(this, 30, 8);
	this.bigRobot	= new MyRobot(this, 7.5, 7.5, 45, this.bigRobotAppearance);
	this.babyRobot	= new MyRobot(this, 7.5, 2, 45, this.babyRobotAppearance);

	this.clock 		= new MyClock(this);

	this.impostor	= new MyQuad(this);
	this.windowedWall = new MyWindowedWall(this, 0.3415, 0.6585, 0.245, 0.765);

    
	// Materials and Appearences
	
    this.materialDefault = new CGFappearance(this);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.floorAppearance.setDiffuse(0.34,0.21,0.1,1);
	this.floorAppearance.setSpecular(0,0,0,1);
	this.floorAppearance.setShininess(20);

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.slidesAppearance.loadTexture('../resources/images/slides.png');
	this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.slidesAppearance.setSpecular(0.1, 0.1, 0.1, 1);
	this.slidesAppearance.setShininess(10);

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture('../resources/images/board.png');
	this.boardAppearance.setDiffuse(0.5, 0.5, 0.5, 0.2);
	this.boardAppearance.setSpecular(0.6, 0.6, 0.6, 1);
	this.boardAppearance.setShininess(120);

	this.cylinderAppearance = new CGFappearance(this);
	this.cylinderAppearance.loadTexture('../resources/images/cylinder.jpg');
	this.cylinderAppearance.setDiffuse(1, 1, 1, 1);
	this.cylinderAppearance.setSpecular(0.6, 0.6, 0.6, 1);
	this.cylinderAppearance.setShininess(10);

	this.wallAppearance = new CGFappearance(this);
	this.wallAppearance.loadTexture('../resources/images/wall.png');

	this.windowedWallAppearance = new CGFappearance(this);
	this.windowedWallAppearance.loadTexture('../resources/images/window_wall.png');

	this.impostorAppearance = new CGFappearance(this);
	this.impostorAppearance.loadTexture('../resources/images/impostor.png');



	this.setUpdatePeriod(1000 / FPS);

};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.2,0.2,0.2, 1.0);

	this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(4.0, 6.0, 1.0, 1.0);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(15.0, 8.0, 15, 1.0);
	this.lights[3].setPosition(0.0, 8.0, 15, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[3].enable();

	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (var i = 0; i < this.lights.length; i++) {
		this.lights[i].update();
	}
	this.light1 ? this.lights[0].enable() : this.lights[0].disable();
	this.light2 ? this.lights[1].enable() : this.lights[1].disable();
	this.light3 ? this.lights[2].enable() : this.lights[2].disable();
	this.light4 ? this.lights[3].enable() : this.lights[3].disable();
};

LightingScene.prototype.update = function(currTime) {

	this.bigRobot.appearance = this.bigRobotAppearance;
	this.bigRobot.update();
	this.babyRobot.appearance = this.babyRobotAppearance;
	this.babyRobot.update();

	if ( this.clockSwitch ) {
		this.clock.update(currTime);
	}

};

LightingScene.prototype.moveBigRobot = function(direction) {
	this.bigRobot.move(direction, this.bigRobotSpeed);
};

LightingScene.prototype.rotateBigRobot = function(direction) {
	this.bigRobot.rotate(direction, this.bigRobotSpeed);
};

LightingScene.prototype.moveBabyRobot = function(direction) {
	this.babyRobot.move(direction, this.babyRobotSpeed);
};

LightingScene.prototype.rotateBabyRobot = function(direction) {
	this.babyRobot.rotate(direction, this.babyRobotSpeed);
};

LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	//this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
		this.materialDefault.apply();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallAppearance.apply();
		this.wall.display();
	this.popMatrix();

	if ( this.tables ) {

		// First Table
		this.pushMatrix();
			this.translate(3.75, 0, 11);
			this.scale(0.5, 0.5, 0.5);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(11.25, 0, 11);
			this.scale(0.5, 0.5, 0.5);
			this.table.display();
		this.popMatrix();

	}


	//// First Stool
	//this.pushMatrix();
	//	this.translate(3.75, 0, 5);
	//	this.stool.display();
	//this.popMatrix();

	//// Second Stool
	//this.pushMatrix();
	//	this.translate(11.25, 0, 13);
	//	this.scale(0.5, 0.5, 0.5);
	//	this.stool.display();
	//this.popMatrix();

	//// Third Stool
	//this.pushMatrix();
	//	this.translate(3.75, 0, 13);
	//	this.scale(0.5, 0.5, 0.5);
	//	this.stool.display();
	//this.popMatrix();

	//// Fourth Stool
	//this.pushMatrix();
	//	this.translate(11.25, 0, 5);
	//	this.stool.display();
	//this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(11, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();


	if ( this.pillar ) {

	//// Cylinder
	this.pushMatrix();
		this.translate(0.5, 0, 0.5);
		this.scale(0.5, 1, 0.5);
		this.rotate(- Math.PI / 2, 1, 0, 0);
		this.rotate(Math.PI, 0, 0, 1 );
		this.cylinderAppearance.apply();
		this.cylinder.display();
	this.popMatrix();

	}



	// Clock
	this.pushMatrix();
		this.materialDefault.apply();
		this.translate(7.45, 7.25, 0);
		this.scale(0.5, 0.5, 0.23);
		this.clock.display();
	this.popMatrix();

	// Robot 1

	if ( this.BigRobot ) {

		this.pushMatrix();
			this.translate(this.bigRobot.x, 0, this.bigRobot.z);
			this.rotate(this.bigRobot.angle * degToRad, 0, 1, 0);
			this.scale(0.7, 0.7, 0.7);
			this.bigRobot.display();
		this.popMatrix();

	}

	// Robot 2

	if ( this.BabyRobot ) {

		this.pushMatrix();
			this.translate(this.babyRobot.x, 0, this.babyRobot.z);
			this.rotate(this.babyRobot.angle * degToRad, 0, 1, 0);
			this.scale(0.3, 0.3, 0.3);
			this.babyRobot.display();
		this.popMatrix();

	}

	// Windowed Wall

	this.pushMatrix();
		this.translate(0, 0, 15);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 1);
		this.windowedWallAppearance.apply();
		this.windowedWall.display();
	this.popMatrix();


	// Impostor

	this.pushMatrix();
		this.translate(-2, 0, 15);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 1);
		this.translate(0.5, 0.5, 0);
		this.impostorAppearance.apply();
		this.impostor.display();
	this.popMatrix();


	// ---- END Primitive drawing section

	this.shader.unbind();
};
