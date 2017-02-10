// warn user if his broswer doesn't support webgl
if (!Detector.webgl) Detector.addGetWebGLMessage()

// create name space
window.global = {}

global.clock = new THREE.Clock()
global.textureLoader = new THREE.TextureLoader()
global.objLoader = new OBJLoader()
global.keyboard = new Keyboard()

global.scene = new THREE.Scene()

let camera
let renderer
let stats

let objects = []

init()
render()

function init() {

	let container = document.getElementById('container')

	stats = new Stats()
	container.appendChild(stats.dom)

	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
	camera.position.x = -4
	camera.position.z = 4
	camera.position.y = 2

	// floor & environment
	objects.push(new Floor())
	objects.push(new Environment())

	// streetlights
	for (let i = -15; i <= 10; i += 5) {
		objects.push(new Streetlight(i, 0, -6))
		objects.push(new Streetlight(i, 0, 6))
	}

	// boxes
	objects.push(new Box(1, 0.25, 2))
	//	objects.push(new Box(-1, .25, -2))
	//objects.push(new Box(1, 0.25, -1))

	/*
	renderer
	*/
	renderer = new THREE.WebGLRenderer()
	renderer.physicallyCorrectLights = true
	renderer.gammaInput = true
	renderer.gammaOutput = true
	renderer.shadowMap.enabled = true
	renderer.toneMapping = THREE.ReinhardToneMapping
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	container.appendChild(renderer.domElement)


	let controls = new THREE.OrbitControls(camera, renderer.domElement)
	controls.target.set(0, 0, 0)
	controls.update()

	window.addEventListener('resize', onWindowResize, false)

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)

}

function render() {

	requestAnimationFrame(render)

	objects.forEach(o => o.update())

	renderer.toneMappingExposure = Math.pow(.5, 5.0) // to allow for very bright scenes.
	renderer.shadowMap.enabled = true

	renderer.render(global.scene, camera)
	stats.update()

}
