class Streetlight {

	constructor(x, y, z) {
		this.x = x || 0
		this.y = y || 0
		this.z = z || 0

		let _self = this

		let material = new THREE.MeshStandardMaterial({
			//color: 0x999999,
			wireframe: true
		})
		global.objloader.load('models/streetlight.obj', function(lamp) {
			lamp.traverse(function(child) {
				if (child instanceof THREE.Mesh) {
					child.material = material;
				}
			})

			lamp.scale.set(.3, .2, .3)

			lamp.position.set(_self.x, _self.y, _self.z)
			_self.lamp = lamp
			scene.add(lamp)


			let light = new THREE.PointLight(0xffee88, 20, 100, 2)

			light.position.set(_self.x, _self.y + 6, _self.z)
			light.castShadow = true
			//scene.add(light)

			var spotlight = new THREE.SpotLight(0xffffff, 10)
			spotlight.position.set(_self.x, _self.y + 1, _self.z)
			spotlight.lookAt(_self.x, _self.y, _self.z)

			spotlight.castShadow = true;

			spotlight.shadow.mapSize.width = 1024;
			spotlight.shadow.mapSize.height = 1024;

			scene.add(spotlight)

		})


	}

	update() {


	}

	get() {
		//return this.lamp
	}

}
