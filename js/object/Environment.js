class Environment {

	constructor() {

		this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, .3)
		this.fog = new THREE.FogExp2(0x000000, 0.015)

		global.scene.add(this.hemiLight)
		global.scene.fog = this.fog

	}

	update() {}

}
