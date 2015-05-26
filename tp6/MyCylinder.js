function MyCylinder(scene, slices, stacks, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;

	this.initBuffers();
}

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {

	this.vertices	= new Array();
	this.indices	= new Array();
	this.normals	= new Array();
	this.texCoords	= new Array();

	var deltaS = this.maxS - this.minS;
	var deltaT = this.maxT - this.minT;
	
	for ( var i = 0; i < this.stacks; i++ ) {
	
		for ( var j = 0; j < this.slices; j++ ) {
	
			this.vertices.push(Math.cos(2 * Math.PI / this.slices * j));
			this.vertices.push(Math.sin(2 * Math.PI / this.slices * j));
			this.vertices.push(i);
			
			this.vertices.push(Math.cos(2 * Math.PI / this.slices * j));
			this.vertices.push(Math.sin(2 * Math.PI / this.slices * j));
			this.vertices.push(i + 1);

			this.vertices.push(Math.cos(2 * Math.PI / this.slices * (j + 1)));
			this.vertices.push(Math.sin(2 * Math.PI / this.slices * (j + 1)));
			this.vertices.push(i);

			this.vertices.push(Math.cos(2 * Math.PI / this.slices * (j + 1)));
			this.vertices.push(Math.sin(2 * Math.PI / this.slices * (j + 1)));
			this.vertices.push(i + 1);

			this.indices.push( 1 + j * 4 + i * 4 * this.slices );
			this.indices.push( 0 + j * 4 + i * 4 * this.slices );
			this.indices.push( 2 + j * 4 + i * 4 * this.slices );
			this.indices.push( 1 + j * 4 + i * 4 * this.slices );
			this.indices.push( 2 + j * 4 + i * 4 * this.slices );
			this.indices.push( 3 + j * 4 + i * 4 * this.slices );

			this.normals.push( Math.cos( 2 * Math.PI / this.slices * j ) );
			this.normals.push( Math.sin( 2 * Math.PI / this.slices * j ) );
			this.normals.push( 0 );

			this.normals.push( Math.cos( 2 * Math.PI / this.slices * j ) );
			this.normals.push( Math.sin( 2 * Math.PI / this.slices * j ) );
			this.normals.push( 0 );

			this.normals.push( Math.cos( 2 * Math.PI / this.slices * (j + 1) ) );
			this.normals.push( Math.sin( 2 * Math.PI / this.slices * (j + 1) ) );
			this.normals.push( 0 );

			this.normals.push( Math.cos( 2 * Math.PI / this.slices * (j + 1) ) );
			this.normals.push( Math.sin( 2 * Math.PI / this.slices * (j + 1) ) );
			this.normals.push( 0 );

			this.texCoords.push( this.minS + j * deltaS / this.slices , this.minT + i * deltaT / this.stacks );
			this.texCoords.push( this.minS + j * deltaS / this.slices , this.minT + (i + 1) * deltaT / this.stacks );
			this.texCoords.push( this.minS + (j + 1) * deltaS / this.slices , this.minT + i * deltaT / this.stacks );
			this.texCoords.push( this.minS + (j + 1) * deltaS / this.slices , this.minT + (i + 1) * deltaT / this.stacks );

		}
	 
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
	
};
