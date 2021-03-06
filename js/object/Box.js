class Box {

	constructor(x, y, z) {
		this.x = x || 0
		this.y = y || 0
		this.z = z || 0

		/*
		MeshStandardMaterial
		*/
		this.material = new THREE.MeshStandardMaterial({
			roughness: 0.7,
			color: 0xffffff,
			bumpScale: 0.002,
			metalness: 0.2
		})
		/*
		global.textureLoader.load("textures/brick_diffuse.jpg", function(map) {
			map.wrapS = THREE.RepeatWrapping
			map.wrapT = THREE.RepeatWrapping
			map.anisotropy = 4
			map.repeat.set(1, 1)
			cubeMat.map = map
			cubeMat.needsUpdate = true
		})
		global.textureLoader.load("textures/brick_bump.jpg", function(map) {
			map.wrapS = THREE.RepeatWrapping
			map.wrapT = THREE.RepeatWrapping
			map.anisotropy = 4
			map.repeat.set(1, 1)
			cubeMat.bumpMap = map
			cubeMat.needsUpdate = true
		})
    */

		/*
		mesh
		*/

		this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.set(this.x, this.y, this.z)
		this.mesh.castShadow = true

		global.scene.add(this.mesh)
	}

	update() {
		this.material.needsUpdate = true

		if (global.keyboard.pressed('a')) this.mesh.position.z -= .05
		else if (global.keyboard.pressed('d')) this.mesh.position.z += .05

		if (global.keyboard.pressed('w')) this.mesh.position.x += .05
		else if (global.keyboard.pressed('s')) this.mesh.position.x -= .05

	}

}
