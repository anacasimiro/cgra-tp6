function MyClock(scene) {
	CGFobject.call(this,scene);

    this.cylinder = new MyCylinder(this.scene, 12, 1, 0, 0, 0, 0);
    this.clockface = new MyShape(this.scene, 12);
   	this.hoursHand = new MyClockHand(this.scene, 0.3, 1);
   	this.minutesHand = new MyClockHand(this.scene, 0.8, 0.6);
   	this.secondsHand = new MyClockHand(this.scene, 0.8, 0.3);

   	this.hoursHand.setAngle(90);
   	this.minutesHand.setAngle(180);
   	this.secondsHand.setAngle(270);
    
	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.loadTexture('../resources/images/clock.png');
	this.clockAppearance.setDiffuse(0.5, 0.5, 0.5, 0.2);
	this.clockAppearance.setSpecular(0.6, 0.6, 0.6, 1);
	this.clockAppearance.setShininess(10);

};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.update = function(currTime) {

	this.hoursHand.setAngle(currTime * 180 / (6*60*60*1000));
	this.minutesHand.setAngle(currTime * 180 / (30*60*1000));
	this.secondsHand.setAngle(currTime * 180 / (30*1000));

}

MyClock.prototype.display = function() {

	// Cylinder
	this.scene.pushMatrix();
		this.cylinder.display();
	this.scene.popMatrix();


	// Clockface
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.clockAppearance.apply();
		this.clockface.display();
	this.scene.popMatrix();


	// Hours hand
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1.05);
		this.hoursHand.display();
	this.scene.popMatrix();


	// Minutes hand
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1.05);
		this.minutesHand.display();
	this.scene.popMatrix();


	// Seconds hand
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1.05);
		this.secondsHand.display();
	this.scene.popMatrix();

}