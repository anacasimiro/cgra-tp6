function MyWheel(scene, sides) {
	CGFobject.call(this,scene);

	this.front = new MyLamp(scene, sides, 20);
	this.back = new MyShape(scene, sides);
	this.angle = 0;

	this.backAppearance = new CGFappearance(scene);
	this.backAppearance.setDiffuse(0, 0, 0, 1);

}

MyWheel.prototype = Object.create(CGFobject.prototype);
MyWheel.prototype.constructor = MyWheel;

MyWheel.prototype.display = function() {

	this.scene.pushMatrix();
		this.scene.rotate(this.angle * degToRad, 0, 0, 1);
		this.front.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.setDiffuse(0.2, 0.2, 0.2, 1);
		this.scene.setAmbient(0.2, 0.2, 0.2, 1);
		this.scene.setSpecular(0, 0, 0, 0);
		this.scene.rotate(180 * degToRad, 0, 1, 0);
		this.backAppearance.apply();
		this.back.display();
	this.scene.popMatrix();

};
