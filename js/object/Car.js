class Car {

	constructor(x, y, z) {
		this.x = x || 0
		this.y = y || 0
		this.z = z || 0

		let _self = this

		let material = new THREE.MeshStandardMaterial({ color: 0xff0000 })

		global.objLoader.get('models/car.obj', function(car) {
			car.traverse(function(child) {
				if (child instanceof THREE.Mesh) {
					child.material = material
				}
			})

			//lamp.scale.set(.3, .3, .3)
			//lamp.position.set(_self.x, _self.y, _self.z)
			_self.car = car

			_self.car.position.set(_self.x, _self.y, _self.z)

			global.scene.add(_self.car)

		})

	}

	update() {
		if (!this.car) return

		if (global.keyboard.pressed('a')) this.car.position.z -= .05
		else if (global.keyboard.pressed('d')) this.car.position.z += .05

		if (global.keyboard.pressed('w')) this.car.position.x += .05
		else if (global.keyboard.pressed('s')) this.car.position.x -= .05



	}

}
