function MyClockHand(scene, length_factor, width_factor) {
	CGFobject.call(this,scene);

    this.hand = new MyQuad(this.scene);

    this.handAppearance = new CGFappearance(this.scene);
	this.handAppearance.setAmbient(0, 0, 0, 1);
	this.handAppearance.setDiffuse(0, 0, 0, 1);
	this.handAppearance.setSpecular(0, 0, 0, 1);
	this.handAppearance.setShininess(0);

	this.length_factor = length_factor || 1;
	this.width_factor = width_factor || 1;

	this.angle = 0;

}

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.display = function() {

	this.scene.pushMatrix();
		this.scene.rotate(-this.angle * Math.PI / 180, 0, 0, 1);
		this.scene.scale(0.05 * this.width_factor, 1 * this.length_factor, 1);
		this.scene.translate(0, 0.5, 0);
		this.handAppearance.apply();
		this.hand.display();
	this.scene.popMatrix();

};