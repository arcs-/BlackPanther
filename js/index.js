// warn user if his broswer doesn't support webgl
if (!Detector.webgl) Detector.addGetWebGLMessage()

const rand = (min, max) => Math.random()*(max-min)+min

// create name space
window.global = {
	MAP_SPEED: 0,
	TARGET_SPEED: 0.2

}

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
	camera.position.x = 15
	camera.position.y = 5

	// floor & environment
	//objects.push(new Floor())
	objects.push(new Environment())

	objects.push(new Car(0, 0.1, 0))

	// sections
	for (let i = -50; i <= 10; i += 8) {
		objects.push(new Section(i, 0, 0))
	}
	// coins
	for (let i = 8; i <= 80; i += 8) {
		objects.push(new Coin(-rand(45,180), rand(0, 1),rand(-3.5,3.5)))
		console.log(i);
	}


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

	if(global.TARGET_SPEED > global.MAP_SPEED) global.MAP_SPEED += 0.005

	renderer.render(global.scene, camera)
	stats.update()

}

let score = 0
function updateScore() {
	score ++
	global.TARGET_SPEED += (Math.log((score+2)/2)-Math.log((score+1)/2)) / 8
	document.getElementById("score").innerText = score
}
