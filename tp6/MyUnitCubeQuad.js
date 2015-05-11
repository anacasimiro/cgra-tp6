function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);

      this.quad = new MyQuad(this.scene);
      
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor = MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function() {


      //Front

      this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
      this.scene.popMatrix();


      //Right

      this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
      this.scene.popMatrix();


      //Back

      this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
      this.scene.popMatrix();


      //Left

      this.scene.pushMatrix();
      this.scene.rotate(3*Math.PI/2, 0, 1, 0);
      this.scene.translate(0, 0, 0.5);
      this.quad.display();
      this.scene.popMatrix();


      //Top

      this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
      this.scene.popMatrix();


      //Bottom

      this.scene.pushMatrix();
            this.scene.rotate(3*Math.PI/2, 1, 0, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
      this.scene.popMatrix();
}