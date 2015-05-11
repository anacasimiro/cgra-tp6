function MyPrism(scene, slices, stacks) {
	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	this.initBuffers();
};

MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function() {

	this.vertices	= new Array();
	this.indices	= new Array();
	this.normals	= new Array();
	
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
			
			this.indices.push(1 + 4 * ( j + this.slices * i));
			this.indices.push(0 + 4 * ( j + this.slices * i));
			this.indices.push(2 + 4 * ( j + this.slices * i));
			this.indices.push(1 + 4 * ( j + this.slices * i));
			this.indices.push(2 + 4 * ( j + this.slices * i));
			this.indices.push(3 + 4 * ( j + this.slices * i));
			
			for ( var k = 0; k < 4; k++ ) {
				
				this.normals.push(Math.cos(Math.PI * (1 + 2 * j) / this.slices));
				this.normals.push(Math.sin(Math.PI * (1 + 2 * j) / this.slices));
				this.normals.push(0);
				
			}
			
		}
	 
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
	
};
