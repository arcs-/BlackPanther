class Environment {

  constructor() {

    this.hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02)

  }

  update() {
    this.hemiLight.intensity = 5

  }

  get() {
    let environment = new THREE.Group()
    environment.add(this.hemiLight)

    return environment
  }

}
