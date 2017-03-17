class OBJLoader {

	constructor() {

		this.manager = new THREE.LoadingManager()
		this.manager.onProgress = function(item, loaded, total) { console.log(item, loaded, total) }
		this.mtlLoader = new THREE.MTLLoader(this.manager)

	}

	get(modelpath, callback) {

		if (!this[modelpath]) {

			let _self = this

			if (!_self[modelpath + "waiting"]) _self[modelpath + "waiting"] = []
			_self[modelpath + "waiting"].push(callback)

			let objLoader = new THREE.OBJLoader(this.manager)

			function load(modelpath) {
				objLoader.load(modelpath, function(model) {

					_self[modelpath] = model
					if (_self[modelpath + "waiting"]) _self[modelpath + "waiting"].forEach(c => c(model.clone()))

					delete _self[modelpath + "loading"]
					delete _self[modelpath + "waiting"]

				})
			}

			if (!_self[modelpath + "loading"]) {
				_self[modelpath + "loading"] = true

				var idx = modelpath.lastIndexOf('/') + 1
				var path = modelpath.substring(0, idx)
				var name = modelpath.substring(idx)

				_self.mtlLoader.setBaseUrl(path)
				_self.mtlLoader.setPath(path)
				_self.mtlLoader.load(name.substring(0, name.length - 3) + 'mtl', function(materials) {

					materials.preload()
					objLoader.setMaterials(materials)
					objLoader.setPath(path)
					load(name)

				}, function(err) {
					load(modelpath)
				})

			}

		} else callback(this[modelpath].clone())

	}


}
