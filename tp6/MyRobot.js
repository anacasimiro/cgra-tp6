function MyRobot(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;

	this.x = 7;
	this.z = 7;

	this.angle = 270 * degToRad;

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

	this.scene.pushMatrix();
		this.scene.translate(this.x, 0, this.z);
		this.scene.rotate(this.angle, 0, 1, 0);
		CGFobject.prototype.display.call(this);
	this.scene.popMatrix();

};