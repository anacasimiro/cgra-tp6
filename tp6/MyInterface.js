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

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Options");
	group.open();

	// Lights
	
	group.add(this.scene, 'light1');
	group.add(this.scene, 'light2');
	group.add(this.scene, 'light3');
	group.add(this.scene, 'light4');

	// Clock

	group.add(this.scene, 'clockSwitch');

	// Robot Speed
	
	this.gui.add(this.scene, 'robotSpeed', 0.02, 0.2);


	// Pressed keys

	this.direction = {up: 87, right: 68, down: 83, left: 65};
	this.pressedKeys = [false, false, false, false];

	return true;
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

};