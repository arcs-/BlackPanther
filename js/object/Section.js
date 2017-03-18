class Section {

	constructor(x = 0, y = 0, z = 0, hero = false) {
		this.x = x
		this.y = y
		this.z = z
		this.hero = hero

		this.offset = 0

		let _self = this

		global.objLoader.get('models/section.obj', function(section) {
			section.traverse(function(child) {
				if (child instanceof THREE.Mesh) {
					if (child.name === 'ground') _self.ground = child
				}
			})

			_self.section = section

			let light = _self.createLight(5.7, 4.2, false)
			_self.light = light

			let light2 = _self.createLight(-5.7, -4.2, false)
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
		if (!this.sectionGroup || !global.hero.car) return

		this.ground.receiveShadow = true

		this.offset += global.MAP_SPEED
		if (this.offset > 25) this.offset = 0
		this.sectionGroup.position.x = this.x + this.offset

		if (global.keyboard.pressed('q')) {
			global.scene.add(new THREE.SpotLightHelper(this.light))
			global.scene.add(new THREE.SpotLightHelper(this.light2))
		}

	}

	createLight(offsetZ, offsetX, shadow) {

		let light = new THREE.PointLight(0xfff9a2, 1.5, 8, 2)
		light.position.y = 3
		light.position.x = offsetX
		light.position.z = offsetZ

		light.shadow.camera.near = 1
		light.shadow.camera.far = 8
		light.shadow.mapSize.width = 256
		light.shadow.mapSize.height = 256
		light.castShadow = true

		light.offsetX = offsetX

		return light
	}

}
