class Car {

	constructor(x, y, z) {
		this.x = x || 0
		this.y = y || 0
		this.z = z || 0

		let _self = this

		global.objLoader.get('models/car.obj', function(car) {
			car.traverse(function(child) {
				if (child instanceof THREE.Mesh) child.castShadow = true
			})
			car.position.set(_self.x, _self.y, _self.z)

			global.scene.add(_self.car = car)

		})

	}

	update() {
		if (!this.car) return

		if (global.keyboard.pressed('d')) this.car.position.z = Math.max(this.car.position.z - .1, -3.5)
		else if (global.keyboard.pressed('a')) this.car.position.z = Math.min(this.car.position.z + .1, 3.5)

		if (global.keyboard.pressed('s')) this.car.position.x += .12
		else if (global.keyboard.pressed('w')) this.car.position.x -= .1

	}

}
