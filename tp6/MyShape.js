function MyShape(scene, sides, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;

	this.sides = sides > 2 ? sides : 3;

	this.initBuffers();
}

MyShape.prototype = Object.create(CGFobject.prototype);
MyShape.prototype.constructor = MyShape;

MyShape.prototype.initBuffers = function() {
	
	var medS = (this.minS + this.maxS) / 2;
	var medT = (this.minT + this.maxT) / 2;

	this.vertices = [
        0, 0, 0
	];

	this.indices = [];
		
	this.normals = [
		0, 0, 1
	];

	this.texCoords = [
		medS, medT
	];

	for ( i = 0; i < this.sides; i++ ) {

		this.vertices.push(Math.cos( i * 2 * Math.PI / this.sides ), Math.sin( i * 2 * Math.PI / this.sides ), 0);
		this.indices.push(0, i + 1, (i == this.sides - 1) ? 1 : (i + 2) );
		this.normals.push(0, 0, 1);

		this.texCoords.push(medS + medS * Math.cos( - i * 2 * Math.PI / this.sides ), medT + medT * Math.sin( - i * 2 * Math.PI / this.sides ) );

	}
	
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();

};
