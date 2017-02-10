// warn user if his broswer doesn't support webgl
if (!Detector.webgl) Detector.addGetWebGLMessage()

// create name space
window.bp = {}

bp.textureLoader = new THREE.TextureLoader()

let camera, scene, renderer, stats

let objects = []

bp.clock = new THREE.Clock()

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

	scene = new THREE.Scene()

	/*
	global light
	*/
	hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02)
	scene.add(hemiLight)

	/*
	Bulb
	*/
	let bulb = new Bulb(0, 2, 0)
	objects.push(bulb)

	/*
	the floor
	*/

	let floor = new Floor()
	objects.push(floor)

	/*
	some boxes
	*/
	let box1 = new Box(1, 0.25, 2)
	objects.push(box1)
	let box2 = new Box(-1, .25, -2)
	objects.push(box2)
	let box3 = new Box(1, 0.25, -1)
	objects.push(box3)



	objects.forEach(o => scene.add(o.mesh))



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

	hemiLight.intensity = 5

	renderer.render(scene, camera)
	stats.update()

}
