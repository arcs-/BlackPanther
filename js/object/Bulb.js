class Bulb {

  constructor(x, y, z) {
    this.x = x || 0
    this.y = y || 0
    this.z = z || 0

    this.geometry = new THREE.SphereGeometry(0.02, 16, 8)
    this.light = new THREE.PointLight(0xffee88, 1, 100, 2)

    this.material = new THREE.MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000
    })

    this.light.add(new THREE.Mesh(this.geometry, this.material))
    this.light.position.set(this.x, this.y, this.z)
    this.light.castShadow = true

  }

  update() {

    this.light.castShadow = true

    this.light.power = 180
  	this.material.emissiveIntensity = 2 / Math.pow(0.02, 2.0) // convert from intensity to irradiance at bulb surface

    let time = Date.now() * 0.0005
  	let delta = global.clock.getDelta()

  	this.light.position.y = Math.cos(time) * 0.75 + 1.25

  }

  get() {
    return this.light
  }

}
