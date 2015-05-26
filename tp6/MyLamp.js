function MyLamp(scene, slices, stacks, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;

	this.initBuffers();
}

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {

	this.vertices	= new Array();
	this.indices	= new Array();
	this.normals	= new Array();
	this.texCoords	= new Array();

	var deltaS = this.maxS - this.minS;
	var deltaT = this.maxT - this.minT;

	var medS = (this.minS + this.maxS) / 2;
	var medT = (this.minT + this.maxT) / 2;
	
	for ( var i = 0; i < this.stacks; i++ ) {
	
		for ( var j = 0; j < this.slices; j++ ) {

			this.vertices.push(Math.cos(2 * Math.PI / this.slices * j) * Math.sin(Math.PI / (2 * this.stacks) * i));
			this.vertices.push(Math.sin(2 * Math.PI / this.slices * j) * Math.sin(Math.PI / (2 * this.stacks) * i));
			this.vertices.push(Math.cos(Math.PI / (2 * this.stacks) * i));

			this.vertices.push(Math.cos(2 * Math.PI / this.slices * j) * Math.sin(Math.PI / (2 * this.stacks) * (i + 1)));
			this.vertices.push(Math.sin(2 * Math.PI / this.slices * j) * Math.sin(Math.PI / (2 * this.stacks) * (i + 1)));
			this.vertices.push(Math.cos(Math.PI / (2 * this.stacks) * (i + 1)));
			
			this.indices.push( (0 + j * 2) % (this.slices * 2) + this.slices * 2 * i );
			this.indices.push( (1 + j * 2) % (this.slices * 2) + this.slices * 2 * i );
			this.indices.push( (2 + j * 2) % (this.slices * 2) + this.slices * 2 * i );
			this.indices.push( (1 + j * 2) % (this.slices * 2) + this.slices * 2 * i );
			this.indices.push( (3 + j * 2) % (this.slices * 2) + this.slices * 2 * i );
			this.indices.push( (2 + j * 2) % (this.slices * 2) + this.slices * 2 * i );

			this.texCoords.push(medS + i * medS / this.stacks * Math.cos( j * 2 * Math.PI / this.slices ), medT + i * medT / this.stacks * Math.sin( j * 2 * Math.PI / this.slices ));
			this.texCoords.push(medS + (i + 1) * medS / this.stacks * Math.cos( j * 2 * Math.PI / this.slices ), medT + (i + 1) * medT / this.stacks * Math.sin( j * 2 * Math.PI / this.slices ));

		}
	 
	}
	
	this.normals = this.vertices;

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
	
};
