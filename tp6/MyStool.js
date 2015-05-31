function MyStool(scene) {
	CGFobject.call(this,scene);

	this.tableAppearance = new CGFappearance(this.scene);
	this.tableAppearance.loadTexture("../resources/images/table.jpg");
	this.tableAppearance.setDiffuse(1,1,1,1);
	this.tableAppearance.setSpecular(0,0,0,1);
	this.tableAppearance.setShininess(200);

    this.unitCube = new MyUnitCubeQuad(this.scene);

	this.materialMetal = new CGFappearance(this.scene);
	this.materialMetal.setAmbient(0.2,0.2,0.2,1);
	this.materialMetal.setDiffuse(0.3,0.3,0.3,1);
	this.materialMetal.setSpecular(0.4,0.4,0.4,1);	
	this.materialMetal.setShininess(120);

}

MyStool.prototype = Object.create(CGFobject.prototype);
MyStool.prototype.constructor = MyStool;

MyStool.prototype.display = function() {

	// Top
	
	this.scene.pushMatrix();
		this.scene.translate(0, 2, 0);
		this.scene.scale(2, 0.2, 2);
		this.scene.setDiffuse(0.8, 0.6, 0.2, 1.0);
	    this.scene.setSpecular(0.1, 0.1, 0.1, 1.0);
	    this.tableAppearance.apply();
		this.unitCube.display();
	this.scene.popMatrix();
	

	// Leg 1

	this.scene.pushMatrix();
		this.scene.translate(-.8, 1, 0.8);
		this.scene.scale(0.3, 2, 0.3);
		this.scene.setDiffuse(0.7, 0.7, 0.7, 1.0);
	    this.scene.setSpecular(0.8, 0.8, 0.8, 1.0);
	    this.materialMetal.apply();
		this.unitCube.display();
	this.scene.popMatrix();


	// Leg 2

	this.scene.pushMatrix();
		this.scene.translate(0.8, 1, 0.8);
		this.scene.scale(0.3, 2, 0.3);
		this.unitCube.display();
	this.scene.popMatrix();


	// Leg 3

	this.scene.pushMatrix();
		this.scene.translate(0.8, 1, -0.80);
		this.scene.scale(0.3, 2, 0.3);
		this.unitCube.display();
	this.scene.popMatrix();


	// Leg 4

	this.scene.pushMatrix();
		this.scene.translate(-0.8, 1, -0.8);
		this.scene.scale(0.3, 2, 0.3);
		this.unitCube.display();
	this.scene.popMatrix();


}