class Coin {

	constructor(x, y, z) {
		this.x = x || 0
		this.y = y || 0
		this.z = z || 0

		this.offset = 0

		let _self = this

		let material = new THREE.MeshStandardMaterial({ color: 0xffff00 })

		global.objLoader.get('models/coin.obj', function(coin) {

			_self.coin = coin
			_self.coin.position.set(_self.x, _self.y, _self.z)

			global.scene.add(_self.coin)

		})

	}

	update() {
		if (!this.coin) return

		this.coin.rotation.y = global.clock.getElapsedTime() % 3.14 // cheap PI
		this.coin.position.y = Math.cos(global.clock.getElapsedTime() * 3) * .5 - .7

		this.offset += .1
		if (this.offset > 15) this.offset = -45
		this.coin.position.x = this.x + this.offset

	}

}
