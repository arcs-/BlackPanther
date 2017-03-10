class Coin {

	constructor(x, y, z) {
		this.x = x || 0
		this.y = y || 0
		this.z = z || 0

		let _self = this

		let material = new THREE.MeshStandardMaterial({ color: 0xffff00 })

		global.objLoader.get('models/coin.obj', function(coin) {
			coin.traverse(function(child) {
				if (child instanceof THREE.Mesh) {
					child.material = material
				}
			})

			//lamp.scale.set(.3, .3, .3)
			//lamp.position.set(_self.x, _self.y, _self.z)
			_self.coin = coin

			_self.coin.position.set(_self.x, _self.y, _self.z)

			global.scene.add(_self.coin)

		})

	}

	update() {
		if (!this.coin) return
		console.log(Math.asin(Math.sin(global.clock.getElapsedTime())+Math.cos(global.clock.getElapsedTime())))
		this.coin.rotation.y = Math.sin(global.clock.getElapsedTime())
	}

}
