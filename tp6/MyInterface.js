/**
 * MyInterface
 * @constructor
 */
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;


/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();

	this.gui.close();

	// Options

	var optionsGroup = this.gui.addFolder("Options");

	optionsGroup.add(this.scene, 'light1');
	optionsGroup.add(this.scene, 'light2');
	optionsGroup.add(this.scene, 'light3');
	optionsGroup.add(this.scene, 'light4');
	optionsGroup.add(this.scene, 'clockSwitch');


	// Objects

	var objectsGroup = this.gui.addFolder("Elements");

	objectsGroup.add(this.scene, 'tables');
	objectsGroup.add(this.scene, 'pillar');
	objectsGroup.add(this.scene, 'BigRobot');
	objectsGroup.add(this.scene, 'BabyRobot');


	// Robots

	var robotAppearanceList = {IronMan: 0, TheHulk: 1, CaptainAmerica: 2};
	var robotsGroup = this.gui.addFolder("Robots");
	
	robotsGroup.add(this.scene, 'bigRobotSpeed', 0.02, 0.2);
	robotsGroup.add(this.scene, 'babyRobotSpeed', 0.02, 0.2);

	robotsGroup.add(this.scene, 'bigRobotAppearance', robotAppearanceList);
	robotsGroup.add(this.scene, 'babyRobotAppearance', robotAppearanceList);


	// Pressed keys

	this.keyDownCodes = {w: 87, d: 68, s: 83, a: 65, up: 38, right: 39, down: 40, left: 37};
	this.pressedKeys = [false, false, false, false, false, false, false, false];

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {

	CGFinterface.prototype.processKeyboard.call(this,event);

	if ( event.keyCode == 71 || event.keyCode == 103 ) {
		this.scene.bigRobot.waving = 1;
	}

	if ( event.keyCode == 76 || event.keyCode == 108 ) {
		this.scene.babyRobot.waving = 1;
	}

};

/**
 * processKeyDown
 * @param event {Event}
 */
MyInterface.prototype.processKeyDown = function(event) {

	CGFinterface.prototype.processKeyDown.call(this,event);

	switch (event.keyCode)
	{

		case (this.keyDownCodes.w):
			this.pressedKeys[0] = true;
		break;

		case (this.keyDownCodes.d):
			this.pressedKeys[1] = true;
		break;

		case (this.keyDownCodes.s):
			this.pressedKeys[2] = true;
		break;

		case (this.keyDownCodes.a):
			this.pressedKeys[3] = true;
		break;

		case (this.keyDownCodes.up):
			this.pressedKeys[4] = true;
		break;

		case (this.keyDownCodes.right):
			this.pressedKeys[5] = true;
		break;

		case (this.keyDownCodes.down):
			this.pressedKeys[6] = true;
		break;

		case (this.keyDownCodes.left):
			this.pressedKeys[7] = true;
		break;

	}

};

/**
 * processKeyUp
 * @param event {Event}
 */
MyInterface.prototype.processKeyUp = function(event) {

	CGFinterface.prototype.processKeyUp.call(this,event);

	switch (event.keyCode)
	{

		case (this.keyDownCodes.w):
			this.pressedKeys[0] = false;
			break;

		case (this.keyDownCodes.d):
			this.pressedKeys[1] = false;
			break;

		case (this.keyDownCodes.s):
			this.pressedKeys[2] = false;
			break;

		case (this.keyDownCodes.a):
			this.pressedKeys[3] = false;
			break;

		case (this.keyDownCodes.up):
			this.pressedKeys[4] = false;
			break;

		case (this.keyDownCodes.right):
			this.pressedKeys[5] = false;
			break;

		case (this.keyDownCodes.down):
			this.pressedKeys[6] = false;
			break;

		case (this.keyDownCodes.left):
			this.pressedKeys[7] = false;
			break;
	}

};

/**
 * update
 */
MyInterface.prototype.update = function() {

	// Robot 1

	if ( this.pressedKeys[0] ) this.scene.moveBigRobot(1);
	if ( this.pressedKeys[1] ) this.scene.rotateBigRobot(1);
	if ( this.pressedKeys[2] ) this.scene.moveBigRobot(0);
	if ( this.pressedKeys[3] ) this.scene.rotateBigRobot(0);

	this.pressedKeys[0] ^ this.pressedKeys[2] ? this.scene.bigRobot.moving = 1 : this.scene.bigRobot.moving = 0;


	// Robot 2

	if ( this.pressedKeys[4] ) this.scene.moveBabyRobot(1);
	if ( this.pressedKeys[5] ) this.scene.rotateBabyRobot(1);
	if ( this.pressedKeys[6] ) this.scene.moveBabyRobot(0);
	if ( this.pressedKeys[7] ) this.scene.rotateBabyRobot(0);

	this.pressedKeys[4] ^ this.pressedKeys[6] ? this.scene.babyRobot.moving = 1 : this.scene.babyRobot.moving = 0;

};