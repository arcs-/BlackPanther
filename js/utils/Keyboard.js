class Keyboard {

	constructor(domElement) {
		this.domElement = domElement || document
		// to store the current state
		this.keyCodes = {}
		this.modifiers = {}

		// create callback to bind/unbind keyboard events
		var _this = this
		this._onKeyDown = function(event) { _this._onKeyChange(event) }
		this._onKeyUp = function(event) { _this._onKeyChange(event) }

		// bind keyEvents
		this.domElement.addEventListener("keydown", this._onKeyDown, false)
		this.domElement.addEventListener("keyup", this._onKeyUp, false)

		// create callback to bind/unbind window blur event
		this._onBlur = function() {
			for (var prop in _this.keyCodes) _this.keyCodes[prop] = false
			for (var prop in _this.modifiers) _this.modifiers[prop] = false
		}

		// bind window blur
		window.addEventListener("blur", this._onBlur, false)
	}

	destroy() {
		// unbind keyEvents
		this.domElement.removeEventListener("keydown", this._onKeyDown, false)
		this.domElement.removeEventListener("keyup", this._onKeyUp, false)

		// unbind window blur event
		window.removeEventListener("blur", this._onBlur, false)
	}

	_onKeyChange(event) {

		// update this.keyCodes
		var keyCode = event.keyCode
		var pressed = event.type === 'keydown' ? true : false
		this.keyCodes[keyCode] = pressed
		// update this.modifiers
		this.modifiers['shift'] = event.shiftKey
		this.modifiers['ctrl'] = event.ctrlKey
		this.modifiers['alt'] = event.altKey
		this.modifiers['meta'] = event.metaKey
	}

	pressed(keyDesc) {
		var keys = keyDesc.split("+")
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i]
			var pressed = false
			if (Keyboard.MODIFIERS.indexOf(key) !== -1) {
				pressed = this.modifiers[key]
			} else if (Object.keys(Keyboard.ALIAS).indexOf(key) != -1) {
				pressed = this.keyCodes[Keyboard.ALIAS[key]]
			} else {
				pressed = this.keyCodes[key.toUpperCase().charCodeAt(0)]
			}
			if (!pressed) return false
		}
		return true
	}

	eventMatches(event, keyDesc) {
		var aliases = KeyboardState.ALIAS
		var aliasKeys = Object.keys(aliases)
		var keys = keyDesc.split("+")
		// log to debug

		for (var i = 0; i < keys.length; i++) {
			var key = keys[i]
			var pressed = false
			if (key === 'shift') {
				pressed = (event.shiftKey ? true : false)
			} else if (key === 'ctrl') {
				pressed = (event.ctrlKey ? true : false)
			} else if (key === 'alt') {
				pressed = (event.altKey ? true : false)
			} else if (key === 'meta') {
				pressed = (event.metaKey ? true : false)
			} else if (aliasKeys.indexOf(key) !== -1) {
				pressed = (event.keyCode === aliases[key] ? true : false)
			} else if (event.keyCode === key.toUpperCase().charCodeAt(0)) {
				pressed = true
			}
			if (!pressed) return false
		}
		return true
	}

}

Keyboard.MODIFIERS = ['shift', 'ctrl', 'alt', 'meta']
Keyboard.ALIAS = {
	'left': 37,
	'up': 38,
	'right': 39,
	'down': 40,
	'space': 32,
	'pageup': 33,
	'pagedown': 34,
	'tab': 9,
	'escape': 27
}
