function MyRobot(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.cylinder = new MyCylinder(scene, 30, 2);
	this.semisphere = new MyLamp(scene, 30, 20);
	this.circle = new MyShape(scene, 30);
	this.wheel = new MyWheel(scene, 30);

	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;

	this.x = 7.5;
	this.z = 7.5;
	this.angle = 270 * degToRad;

	this.robotAppearance = new CGFappearance(this.scene);
	this.robotAppearance.setDiffuse(0, 1, 0, 1);
	this.robotAppearance.setAmbient(0, 1, 0, 1);
	this.robotAppearance.setSpecular(0, 1, 0, 1);

	this.initBuffers();
}

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.move = function(direction, speed) {

	if ( direction == 1 ) {
		this.x += speed * Math.sin(this.angle);
		this.z += speed * Math.cos(this.angle);
	} else {
		this.x -= speed * Math.sin(this.angle);
		this.z -= speed * Math.cos(this.angle);
	}

};

MyRobot.prototype.rotate = function(direction) {

	if ( direction == 1 ) {
		this.angle -= 0.1;
	} else {
		this.angle += 0.1;
	}

};

MyRobot.prototype.initBuffers = function() {
	this.vertices = [
        0.5, 0.3, 0,
        -0.5, 0.3, 0,
		0, 0.3, 2
	];

	this.indices = [
        1, 2, 0
    ];

	this.primitiveType = this.scene.gl.TRIANGLES;

	this.normals = [
		0, 1, 0,
		0, 1, 0,
		0, 1, 0
	];

	this.texCoords = [
		this.minS, this.minT,
		this.minS, this.maxT,
		this.maxS, this.minT,
		this.maxS, this.maxT
	];

	this.initGLBuffers();
};

MyRobot.prototype.display = function() {

	// Body
	this.scene.pushMatrix();
		this.scene.translate(0, 0.3, 0);
		this.scene.pushMatrix();
			this.scene.scale(1, 1.5, 1);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.robotAppearance.apply();
			this.cylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, 3, 0);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.robotAppearance.apply();
			this.circle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.robotAppearance.apply();
			this.circle.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	// Head
	this.scene.pushMatrix();
		this.scene.translate(0, 0.3, 0);
		this.scene.pushMatrix();
			this.scene.translate(0, 3.1, 0);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.robotAppearance.apply();
			this.semisphere.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, 3.1, 0);
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.robotAppearance.apply();
			this.circle.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	// Right Arm
	this.scene.pushMatrix();
		this.scene.translate(-1.35, 2.1, 0);
		this.scene.scale(0.3, 0.3, 0.3);
		this.scene.pushMatrix();
			this.scene.scale(1, 1.5, 1);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.robotAppearance.apply();
			this.cylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.robotAppearance.apply();
			this.semisphere.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, 3, 0);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.robotAppearance.apply();
			this.semisphere.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	// Left Arm
	this.scene.pushMatrix();
		this.scene.translate(1.35, 2.1, 0);
		this.scene.scale(0.3, 0.3, 0.3);
		this.scene.pushMatrix();
			this.scene.scale(1, 1.5, 1);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.robotAppearance.apply();
			this.cylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.robotAppearance.apply();
			this.semisphere.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, 3, 0);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.robotAppearance.apply();
			this.semisphere.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	// Right Wheel
	this.scene.pushMatrix();
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
		this.scene.translate(0, 0.5, 1.05);
		this.scene.scale(0.5, 0.5, 0.2);
		this.robotAppearance.apply();
		this.wheel.display();
	this.scene.popMatrix();

	// Left Wheel
	this.scene.pushMatrix();
		this.scene.rotate(90 * degToRad, 0, 1, 0);
		this.scene.translate(0, 0.5, 1.05);
		this.scene.scale(0.5, 0.5, 0.2);
		this.robotAppearance.apply();
		this.wheel.display();
	this.scene.popMatrix();

};