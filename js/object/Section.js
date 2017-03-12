class Section {

	constructor(x, y, z) {
		this.x = x || 0
		this.y = y || 0
		this.z = z || 0

		this.offset = 0

		let _self = this

		let material = new THREE.MeshPhongMaterial({ color: 0x111111 })

		global.objLoader.get('models/section.obj', function(section) {
			section.traverse(function(child) {
				if (child instanceof THREE.Mesh) {
					child.material = material
					child.receiveShadow = true
				}
			})

			_self.section = section

			let light = new THREE.SpotLight(0xfff9a2, 150, 7, 2)
			light.position.y = 2.9
			light.position.z = 6
			light.target.position.set(_self.x, _self.y, _self.z + 6)
			light.castShadow = true
			light.target.updateMatrixWorld()
			_self.light = light

			let light2 = light.clone()
			light2.position.z = -6
			light2.target.position.set(_self.x, _self.y, _self.z - 6)
			light2.target.updateMatrixWorld()
			_self.light2 = light2

			_self.sectionGroup = new THREE.Group()
			_self.sectionGroup.add(section)
			_self.sectionGroup.add(light)
			_self.sectionGroup.add(light2)

			_self.sectionGroup.position.set(_self.x, _self.y, _self.z)

			global.scene.add(_self.sectionGroup)

		})

	}

	update() {
		if (!this.sectionGroup) return

		// if hero is within 10 units the section, turn on shadows
		this.light.castShadow = this.light2.castShadow = false
		if (10 > Math.abs(global.hero.car.position.x - this.sectionGroup.position.x)) {
			if (global.hero.car.position.z > 0) this.light.castShadow = true
			else this.light2.castShadow = true
		}

		this.section.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.needsUpdate = true
			}
		})
		//this.streetlight.material.needsUpdate = true

		this.offset += global.MAP_SPEED
		if (this.offset > 8) this.offset = 0
		this.sectionGroup.position.x = this.x + this.offset
		this.light.target.position.x = this.sectionGroup.position.x
		this.light.target.updateMatrixWorld()
		this.light2.target.position.x = this.sectionGroup.position.x
		this.light2.target.updateMatrixWorld()

	}

}
