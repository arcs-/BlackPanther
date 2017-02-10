class Streetlight {

	constructor(x, y, z) {
		this.x = x || 0
		this.y = y || 0
		this.z = z || 0

		this.offset = 0

		let _self = this

		let material = new THREE.MeshStandardMaterial({ color: 0x000000 })

		global.objLoader.get('models/streetlight.obj', function(lamp) {
			lamp.traverse(function(child) {
				if (child instanceof THREE.Mesh) {
					child.material = material
				}
			})

			lamp.scale.set(.3, .3, .3)
			//lamp.position.set(_self.x, _self.y, _self.z)
			_self.lamp = lamp

			let light = new THREE.SpotLight(0xfff9a2, 100, 4)
			//light.position.set(_self.x, _self.y + 2.2, _self.z)
			light.position.y = 2.2
			light.target.position.set(_self.x, _self.y, _self.z)
			light.castShadow = true
			light.target.updateMatrixWorld()
			_self.light = light

			_self.streetlight = new THREE.Group()
			_self.streetlight.add(lamp)
			_self.streetlight.add(light)

			_self.streetlight.position.set(_self.x, _self.y, _self.z)

			global.scene.add(_self.streetlight)

		})

	}

	update() {
		if (!this.streetlight) return

		this.offset += .1
		if (this.offset > 5) this.offset = 0
		this.streetlight.position.x = this.x + this.offset
		this.light.target.position.x = this.streetlight.position.x
		this.light.target.updateMatrixWorld()

	}

}
