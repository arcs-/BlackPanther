class Environment {

	constructor() {

		this.hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02)
		global.scene.add(this.hemiLight)

	}

	update() {

		this.hemiLight.intensity = 30


	}

}
