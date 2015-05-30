function MyTable(scene) {
	CGFobject.call(this,scene);

	this.tableAppearance = new CGFappearance(this.scene);
	this.tableAppearance.loadTexture("../resources/images/table.jpg");
	this.tableAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.tableAppearance.setDiffuse(1,1,1,0.9);
	this.tableAppearance.setSpecular(1,1,1,0.1);
	this.tableAppearance.setShininess(10);

    this.unitCube = new MyUnitCubeQuad(this.scene);

	this.materialMetal = new CGFappearance(this.scene);
	this.materialMetal.setAmbient(0.05, 0.05, 0.05, 1);
	this.materialMetal.setDiffuse(0.2, 0.2, 0.2, 1);
	this.materialMetal.setSpecular(0.3,0.3,0.3,1);

};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function() {

	

	// Top
	
	this.scene.pushMatrix();
	this.scene.translate(0, 3.15, 0);
	this.scene.scale(5, 0.3, 3);
	this.tableAppearance.apply();
	this.unitCube.display();
	this.scene.popMatrix();
	

	// Leg 1

	this.scene.pushMatrix();
	this.scene.translate(-2.20, 1.5, 1.20);
	this.scene.scale(0.3, 3.0, 0.3);
	this.materialMetal.apply();
	this.unitCube.display();
	this.scene.popMatrix();


	// Leg 2

	this.scene.pushMatrix();
	this.scene.translate(2.20, 1.5, 1.20);
	this.scene.scale(0.3, 3.0, 0.3);
	this.unitCube.display();
	this.scene.popMatrix();


	// Leg 3

	this.scene.pushMatrix();
	this.scene.translate(2.20, 1.5, -1.20);
	this.scene.scale(0.3, 3.0, 0.3);
	this.unitCube.display();
	this.scene.popMatrix();


	// Leg 4

	this.scene.pushMatrix();
	this.scene.translate(-2.20, 1.5, -1.20);
	this.scene.scale(0.3, 3.0, 0.3);
	this.unitCube.display();
	this.scene.popMatrix();

	

}