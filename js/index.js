// warn user if his broswer doesn't support webgl
if (!Detector.webgl) Detector.addGetWebGLMessage()

// create name space
window.global = {}

global.clock = new THREE.Clock()
global.textureLoader = new THREE.TextureLoader()
global.manager = new THREE.LoadingManager()
global.manager.onProgress = function(item, loaded, total) { console.log(item, loaded, total) }
global.objloader = new THREE.OBJLoader(global.manager)

let camera
let scene
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

	// bulb
	//objects.push(new Bulb(0, 2, 0))
	objects.push(new Streetlight(0, 0, 0))

	// boxes
	objects.push(new Box(1, 0.25, 2))
	objects.push(new Box(-1, .25, -2))
	objects.push(new Box(1, 0.25, -1))

	// add all to scene
	scene = new THREE.Scene()
	objects.forEach(o => scene.add(o.get()))


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

	renderer.render(scene, camera)
	stats.update()

}
