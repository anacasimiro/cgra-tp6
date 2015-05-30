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

	var group = this.gui.addFolder("Options");

	// Lights
	
	group.add(this.scene, 'light1');
	group.add(this.scene, 'light2');
	group.add(this.scene, 'light3');
	group.add(this.scene, 'light4');

	// Clock

	group.add(this.scene, 'clockSwitch');

	// Robot Speed
	
	this.gui.add(this.scene, 'robotSpeed', 0.02, 0.2);

	// Robot appearance

	this.robotAppearanceList = {IronMan: 0, TheHulk: 1, CaptainAmerica: 2};

	this.gui.add(this.scene, 'currRobotAppearance', this.robotAppearanceList);


	// Pressed keys

	this.direction = {up: 87, right: 68, down: 83, left: 65};
	this.pressedKeys = [false, false, false, false];

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {

	CGFinterface.prototype.processKeyboard.call(this,event);

	if ( event.keyCode == 71 || event.keyCode == 103 ) {
		this.scene.robot.waving = 1;
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

		case (this.direction.up):
			this.pressedKeys[0] = true;
		break;

		case (this.direction.right):
			this.pressedKeys[1] = true;
		break;

		case (this.direction.down):
			this.pressedKeys[2] = true;
		break;

		case (this.direction.left):
			this.pressedKeys[3] = true;
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

		case (this.direction.up):
			this.pressedKeys[0] = false;
		break;

		case (this.direction.right):
			this.pressedKeys[1] = false;
		break;

		case (this.direction.down):
			this.pressedKeys[2] = false;
		break;

		case (this.direction.left):
			this.pressedKeys[3] = false;
		break;

	}

};

/**
 * update
 */
MyInterface.prototype.update = function() {

	if ( this.pressedKeys[0] ) this.scene.moveRobot(1);
	if ( this.pressedKeys[1] ) this.scene.rotateRobot(1);
	if ( this.pressedKeys[2] ) this.scene.moveRobot(0);
	if ( this.pressedKeys[3] ) this.scene.rotateRobot(0);

	this.pressedKeys[0] ^ this.pressedKeys[2] ? this.scene.robot.moving = 1 : this.scene.robot.moving = 0;

};