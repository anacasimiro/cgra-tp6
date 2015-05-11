function MyRobot(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;


	this.initBuffers();
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.initBuffers = function() {
	this.vertices = [
        0.5, 0.3, 0,
        -0.5, 0.3,0,
        0, 0.3, 2
	];

	this.indices = [
        1, 2, 0,
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
