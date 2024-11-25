import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop( animate );
document.body.appendChild(renderer.domElement);

// Sphere Geometry
const geometry = new THREE.SphereGeometry(0.5, 10, 10);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff99 });
const sphere = new THREE.Mesh(geometry, sphereMaterial);
scene.add(sphere);

// Raycaster and Mouse Vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// WebGL Check
if (WebGL.isWebGL2Available()) {
	animate();
} else {
	const warning = WebGL.getWebGL2ErrorMessage();
	document.body.appendChild(warning);
}

// Animation Loop
function animate() {
	sphere.rotation.z += 0.01;
	sphere.rotation.y += 0.01;
	renderer.render(scene, camera);
}

// Event Listener for Mouse Down
document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event) {
	// Convert mouse position to normalized device coordinates (-1 to +1)
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// Update the raycaster with the camera and mouse position
	raycaster.setFromCamera(mouse, camera);

	// Check for intersections with the sphere
	const intersects = raycaster.intersectObject(sphere);
	if (intersects.length > 0) {
		scene.remove(sphere); // Remove the sphere if clicked
	}
}

