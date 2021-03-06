class Car {

	constructor(x = 0, y = 0, z = 0) {

		let _self = global.hero = this

		global.objLoader.get('models/car.obj', function(carBody) {
			carBody.traverse(function(child) {
				if (child instanceof THREE.Mesh) child.castShadow = true
			})

			_self.car = new THREE.Group()
			_self.car.add(carBody)

			let left = new THREE.PointLight(0xff0000, 3, 1)
			left.position.y = 1
			left.position.x = 2.2
			left.position.z = .5

			_self.car.add(left)

			let right = left.clone()
			right.position.z = -.5
			_self.car.add(right)

			_self.car.position.set(x, y, z)

			global.scene.add(_self.car)

		})

	}

	update() {
		if (!this.car) return

		if (global.keyboard.pressed('d')) this.car.position.z = Math.max(this.car.position.z - .12, -3.5)
		else if (global.keyboard.pressed('a')) this.car.position.z = Math.min(this.car.position.z + .12, 3.5)

		if (global.keyboard.pressed('s')) this.car.position.x = Math.min(this.car.position.x + .3, 11)
		else if (global.keyboard.pressed('w')) this.car.position.x = Math.max(this.car.position.x - .12, -35)

	}

}
