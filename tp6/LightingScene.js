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

    
	// Scene elements
	
    this.table 		= new MyTable(this);
	this.stool 		= new MyStool(this);

	this.wall 		= new Plane(this);
	this.boardA 	= new Plane(this, BOARD_A_DIVISIONS);
	this.boardB 	= new Plane(this, BOARD_B_DIVISIONS);

	this.floor 		= new MyQuad(this,0, 10, 0, 12);
	this.cubeA 		= new MyQuad(this, -0.2, 1.2, -0.5, 1.5);
	this.prism 		= new MyPrism(this, 8, 20);
	this.cylinder 	= new MyCylinder(this, 30, 8);
	this.robot 		= new MyRobot(this);

	this.clock 		= new MyClock(this);

    
	// Materials and Appearences
	
    this.materialDefault = new CGFappearance(this);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.floorAppearance.setDiffuse(0.34,0.21,0.1,1);
	this.floorAppearance.setSpecular(0,0,0,1);
	this.floorAppearance.setShininess(20);

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.windowAppearance.setDiffuse(1,1,1,1);
	this.windowAppearance.setSpecular(0,0,0,1);
	this.windowAppearance.setShininess(20);

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

    
    // Interface

	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;
	this.clockSwitch = true;
	this.robotSpeed = 0.12;
	this.currRobotAppearance = 1;


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
	for (i = 0; i < this.lights.length; i++) {
		this.lights[i].update();
	}
	this.light1 ? this.lights[0].enable() : this.lights[0].disable();
	this.light2 ? this.lights[1].enable() : this.lights[1].disable();
	this.light3 ? this.lights[2].enable() : this.lights[2].disable();
	this.light4 ? this.lights[3].enable() : this.lights[3].disable();
};

LightingScene.prototype.update = function(currTime) {

	this.robot.update();

	if ( this.clockSwitch ) {
		this.clock.update(currTime);
	}

};

LightingScene.prototype.moveRobot = function(direction) {
	this.robot.move(direction, this.robotSpeed);
};

LightingScene.prototype.rotateRobot = function(direction) {
	this.robot.rotate(direction, this.robotSpeed);
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
	this.axis.display();

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

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
    	this.windowAppearance.apply();
		this.cubeA.display();
		this.materialDefault.apply();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.setDiffuse(0.1, 0.1, 0.1, 1.0);
		this.setAmbient(0.1,0.1,0.1,1);
   		this.setSpecular(0.1, 0.1, 0.1, 1.0);
		this.wall.display();
	this.popMatrix();

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


	// Cylinder
	this.pushMatrix();
		this.translate(0.5, 0, 0.5);
		this.scale(0.5, 1, 0.5);
		this.rotate(- Math.PI / 2, 1, 0, 0);
		this.rotate(Math.PI, 0, 0, 1 );
		this.cylinderAppearance.apply();
		this.cylinder.display();
	this.popMatrix();


	// Clock
	this.pushMatrix();
		this.materialDefault.apply();
		this.translate(7.25, 7.25, 0);
		this.scale(0.5, 0.5, 0.23);
		this.clock.display();
	this.popMatrix();


	// Robot
	this.pushMatrix();
		this.translate(this.robot.x, 0, this.robot.z);
		this.rotate(this.robot.angle * degToRad, 0, 1, 0);
		this.scale(0.7, 0.7, 0.7);
		this.robot.display();
	this.popMatrix();


	// ---- END Primitive drawing section

	this.shader.unbind();
};
