class Floor {

	constructor() {

		this.material = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa
    })

		this.geometry = new THREE.PlaneBufferGeometry(10, 10)
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.receiveShadow = true
		this.mesh.rotation.x = -Math.PI / 2.0

	}

	update() {
		this.material.needsUpdate = true
	}

	get() {
    return this.mesh
  }

}
