class Floor {

	constructor() {

		this.material = new THREE.MeshStandardMaterial({
			color: 0x333333
		})

		this.geometry = new THREE.PlaneBufferGeometry(30, 17)
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.receiveShadow = true
		this.mesh.rotation.x = -Math.PI / 2.0

		global.scene.add(this.mesh)

	}

	update() {
		this.material.needsUpdate = true
	}


}
