class Floor {

	constructor(x, y, z) {
    this.x = x || 0
    this.y = y || 0
    this.z = z || 0

		this.material = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa
    })

		this.geometry = new THREE.PlaneBufferGeometry(20, 20)
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.receiveShadow = true
		this.mesh.rotation.x = -Math.PI / 2.0

	}

	update() {

		this.material.needsUpdate = true

	}

}
