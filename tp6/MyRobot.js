function MyRobot(scene, x, z, angle, appearance) {
	CGFobject.call(this,scene);

	this.cylinder = new MyCylinder(scene, 30, 2);
	this.semisphere = new MyLamp(scene, 30, 20);
	this.circle = new MyShape(scene, 30);
	this.rightWheel = new MyWheel(scene, 30);
	this.leftWheel = new MyWheel(scene, 30);

	this.moving = 0;

	this.x = x || 7.5;
	this.z = z || 7.5;
	this.angle = angle || 45;
	this.appearance = appearance || 0;

	this.armsAngle = 0;

	this.armsSpeed = 2;
	this.armsAngleMultiplier = 1;
	this.wavingTimes = 3;

	this.waving = 0;
	this.wavingFase = 0;
	this.wavingCount = 0;
	this.wavingAngleFront = 0;
	this.wavingAngleSide = 0;


	// Body Appearances

	this.bodyAppearances = [];

	this.bodyAppearances[0] = new CGFappearance(scene);
	this.bodyAppearances[0].loadTexture('../resources/images/robot/body_iron.png');

	this.bodyAppearances[1] = new CGFappearance(scene);
	this.bodyAppearances[1].loadTexture('../resources/images/robot/body_hulk.png');

	this.bodyAppearances[2] = new CGFappearance(scene);
	this.bodyAppearances[2].loadTexture('../resources/images/robot/body_captain.png');


	// Head Appearances

	this.headAppearances = [];

	this.headAppearances[0] = new CGFappearance(scene);
	this.headAppearances[0].loadTexture('../resources/images/robot/head_iron.png');

	this.headAppearances[1] = new CGFappearance(scene);
	this.headAppearances[1].loadTexture('../resources/images/robot/head_hulk.png');

	this.headAppearances[2] = new CGFappearance(scene);
	this.headAppearances[2].loadTexture('../resources/images/robot/head_captain.png');


	// Arm Appearances

	this.armAppearances = [];

	this.armAppearances[0] = new CGFappearance(scene);
	this.armAppearances[0].loadTexture('../resources/images/robot/arm_iron.png');

	this.armAppearances[1] = new CGFappearance(scene);
	this.armAppearances[1].loadTexture('../resources/images/robot/arm_hulk.png');

	this.armAppearances[2] = new CGFappearance(scene);
	this.armAppearances[2].loadTexture('../resources/images/robot/arm_captain.png');


	// Wheel Appearances

	this.wheelAppearances = [];

	this.wheelAppearances[0] = new CGFappearance(scene);
	this.wheelAppearances[0].loadTexture('../resources/images/robot/wheel_iron.png');

	this.wheelAppearances[1] = new CGFappearance(scene);
	this.wheelAppearances[1].loadTexture('../resources/images/robot/wheel_hulk.png');

	this.wheelAppearances[2] = new CGFappearance(scene);
	this.wheelAppearances[2].loadTexture('../resources/images/robot/wheel_captain.png');


	// Clean Appearances

	this.cleanAppearances = [];

	this.cleanAppearances[0] = new CGFappearance(scene);
	this.cleanAppearances[0].loadTexture('../resources/images/robot/clean_iron.png');

	this.cleanAppearances[1] = new CGFappearance(scene);
	this.cleanAppearances[1].loadTexture('../resources/images/robot/clean_hulk.png');

	this.cleanAppearances[2] = new CGFappearance(scene);
	this.cleanAppearances[2].loadTexture('../resources/images/robot/clean_captain.png');

	this.initBuffers();

}

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.update = function() {

	if ( this.moving == 0 && this.armsAngle != 0 ) {

		this.armsAngleMultiplier = this.armsAngle >= 0 ? -1 : 1;
		this.armsAngle += this.armsAngleMultiplier * this.armsSpeed;

	}

	if ( this.waving ) {

		switch (this.wavingFase) {

			case 0:

				if ( this.wavingCount == this.wavingTimes ) {

					this.waving = 0;
					this.wavingCount = 0;

				} else {

					if ( this.wavingAngleFront != -180 ) {
						this.wavingAngleFront -= this.armsSpeed;
					} else {
						this.wavingFase = 1;
					}

				}

				break;

			case 1:

				if ( this.wavingCount == this.wavingTimes ) {

					if ( this.wavingAngleFront == this.armsAngle ) {

						this.wavingFase = 0;

					} else {

						this.wavingAngleFront += this.armsSpeed;

						if ( this.wavingAngleFront > this.armsAngle ) {
							this.wavingAngleFront = this.armsAngle;
						}

					}

				} else {

					if ( this.wavingAngleSide == 30 ) {

						this.wavingFase = 2;

					} else {

						this.wavingAngleSide += this.armsSpeed;

					}

				}

				break;


			case 2:

				if ( this.wavingAngleSide == 0 ) {

					this.wavingFase = 1;
					this.wavingCount++;

				} else {

					this.wavingAngleSide -= this.armsSpeed;

				}

				break;

		}

	} else {
		this.wavingAngleFront = this.armsAngle;
		this.wavingAngleSide = 0;
	}

};

MyRobot.prototype.move = function(direction, speed) {

	if ( direction == 1 ) {
		this.x += speed * Math.sin(this.angle * degToRad);
		this.z += speed * Math.cos(this.angle * degToRad);
		this.leftWheel.angle += speed * 80;
		this.rightWheel.angle -= speed * 80;

	} else {
		this.x -= speed * Math.sin(this.angle * degToRad);
		this.z -= speed * Math.cos(this.angle * degToRad);
		this.leftWheel.angle -= speed * 80;
		this.rightWheel.angle += speed * 80;
	}

	if ( Math.abs(this.armsAngle) > 30 ) {
		this.armsAngleMultiplier = - this.armsAngleMultiplier;
	}

	if ( this.moving ) {
		this.armsAngle += this.armsAngleMultiplier * this.armsSpeed;
	}

};

MyRobot.prototype.rotate = function(direction, speed) {

	if ( direction == 1 ) {
		this.angle -= speed * 20;
		this.leftWheel.angle += speed * 30;
		this.rightWheel.angle += speed * 30;
	} else {
		this.angle += speed * 20;
		this.leftWheel.angle -= speed * 30;
		this.rightWheel.angle -= speed * 30;
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
			this.scene.rotate(90 * degToRad, 0, 1, 0);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.bodyAppearances[this.appearance].apply();
			this.cylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, 3, 0);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.cleanAppearances[this.appearance].apply();
			this.circle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 1, 0, 0);
		this.cleanAppearances[this.appearance].apply();
			this.circle.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	// Head
	this.scene.pushMatrix();
		this.scene.translate(0, 0.3, 0);
		this.scene.pushMatrix();
			this.scene.translate(0, 3.1, 0);
			this.scene.rotate(180 * degToRad, 0, 1, 0);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.headAppearances[this.appearance].apply();
			this.semisphere.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, 3.1, 0);
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.cleanAppearances[this.appearance].apply();
			this.circle.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	// Right Arm
	this.scene.pushMatrix();
		this.scene.translate(-1.35, 3, 0);

		if ( this.waving ) {
			this.scene.rotate(this.wavingAngleSide * degToRad, 0, 0, 1);
			this.scene.rotate(this.wavingAngleFront * degToRad, 1, 0, 0);
		} else {
			this.scene.rotate(this.armsAngle * degToRad, 1, 0, 0);
		}

		this.scene.rotate(180 * degToRad, 0, 0, 1);
		this.scene.scale(0.3, 0.3, 0.3);
		this.scene.pushMatrix();
			this.scene.scale(1, 1.5, 1);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.armAppearances[this.appearance].apply();
			this.cylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.cleanAppearances[this.appearance].apply();
			this.semisphere.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, 3, 0);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.cleanAppearances[this.appearance].apply();
			this.semisphere.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	// Left Arm
	this.scene.pushMatrix();
		this.scene.translate(1.35, 3, 0);

		this.scene.rotate(- this.armsAngle * degToRad, 1, 0, 0);

		this.scene.rotate(180 * degToRad, 0, 0, 1);
		this.scene.scale(0.3, 0.3, 0.3);
		this.scene.pushMatrix();
			this.scene.scale(1, 1.5, 1);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.armAppearances[this.appearance].apply();
			this.cylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.cleanAppearances[this.appearance].apply();
			this.semisphere.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, 3, 0);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.cleanAppearances[this.appearance].apply();
			this.semisphere.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	// Right Wheel
	this.scene.pushMatrix();
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
		this.scene.translate(0, 0.5, 1.05);
		this.scene.scale(0.5, 0.5, 0.2);
		this.wheelAppearances[this.appearance].apply();
		this.rightWheel.display();
	this.scene.popMatrix();

	// Left Wheel
	this.scene.pushMatrix();
		this.scene.rotate(90 * degToRad, 0, 1, 0);
		this.scene.translate(0, 0.5, 1.05);
		this.scene.scale(0.5, 0.5, 0.2);
		this.wheelAppearances[this.appearance].apply();
		this.leftWheel.display();
	this.scene.popMatrix();

};