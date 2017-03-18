class Audio {

	constructor() {
		this.audioCtx = new AudioContext()
		this.destination = this.audioCtx.destination
		this.files = {}

		let _self = this

		this.load('ambient', function(key) {
			let source = _self.audioCtx.createBufferSource()
			source.buffer = _self.files[key]

			var gainNode = _self.audioCtx.createGain()
			gainNode.gain.value = 0.4
			source.connect(gainNode)
			gainNode.connect(_self.destination)

			source.loop = true
			source.start(0)
		})

	}

	play(key) {
		if (this.files[key]) {
			let source = this.audioCtx.createBufferSource()
			source.buffer = this.files[key]
			source.connect(this.destination)
			source.start(0)
		} else this.load(key, () => this.play(key))
	}

	load(key, callback) {
		let _self = this
		let request = new XMLHttpRequest()
		request.open('GET', `sounds/${key}.mp3`, true)
		request.responseType = 'arraybuffer'
		request.onload = function() {
			_self.audioCtx.decodeAudioData(request.response, function(beatportBuffer) {
				_self.files[key] = beatportBuffer
				callback(key)
			}, function() {})
		}
		request.send()
	}
}
