class OBJLoader {

	constructor() {

		let manager = new THREE.LoadingManager()
		manager.onProgress = function(item, loaded, total) { console.log(item, loaded, total) }

		this.objLoader = new THREE.OBJLoader(manager)

	}

	get(modelpath, callback) {

		if (!this[modelpath]) {

			if (!this[modelpath + "waiting"]) this[modelpath + "waiting"] = []
			this[modelpath + "waiting"].push(callback)

			if (!this[modelpath + "loading"]) {
				this[modelpath + "loading"] = true
				let _self = this

				this.objLoader.load(modelpath, function(model) {
					_self[modelpath] = model
					_self[modelpath + "waiting"].forEach(c => c(model.clone()))

					delete _self[modelpath + "loading"]
					delete _self[modelpath + "waiting"]

				})

			}

		} else callback(this[modelpath].clone())

	}

}
