import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
//import {i} from 'vite/dist/node/types.d-aGj9QkWt';
//

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const Timer = new THREE.Clock();
Timer.stop();


const renderer = new THREE.WebGLRenderer();


const canvas = renderer.domElement;

const width = window.innerWidth;
const height = window.innerHeight;

renderer.setSize(width, height, false);
camera.aspect = width / height;
camera.updateProjectionMatrix();

document.body.appendChild( renderer.domElement );

// Geometry to choose from
const geometries = [
    new THREE.SphereGeometry(0.5, 10, 10),
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.TetrahedronGeometry(0.5)
];

// Material for Geometry
const Material = new THREE.MeshToonMaterial({ color: 0xffffff });

// lights for textured geometry
const DL = new THREE.DirectionalLight(0x34ebb4, 5.0);
DL.position.copy(new THREE.Vector3(0,2,2.5));

const opposingDL = new THREE.DirectionalLight(0xffffff, 0.04);
opposingDL.position.copy(new THREE.Vector3(0,-1,5));
scene.add( opposingDL )
scene.add( DL );

// Initialize the first shape
let ButtonShowing = true;
let StarterButton = randomShape();
scene.add(StarterButton);

let CurrentShape = randomShape();
CurrentShape.position.copy( randomLocation() );

// Raycaster and Mouse Vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


// Animation Loop
function animate() {
    const elapsedTime = Timer.getElapsedTime();
  
    //updates the timer on the screen
    const timerElement = document.getElementById('timer');
    timerElement.innerText = `Timer: ${elapsedTime.toFixed(2)}`;

    //resets the game when reaching 60 seconds
    if (elapsedTime >= 10) { 
        Timer.stop();
        if (!ButtonShowing) {

            StarterButton = randomShape();
            scene.add(StarterButton);
            ButtonShowing = true;


        }

        console.log("Game Over.. Resetting");

        scene.remove(CurrentShape);

    }


    StarterButton.rotation.x += 0.01

    CurrentShape.rotation.x += 0.01;
    CurrentShape.rotation.y += 0.01;
    CurrentShape.rotation.z += 0.03;
    renderer.render(scene, camera);

}
renderer.setAnimationLoop(animate);

// Event Listener for Mouse Down
document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event) {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with the current shape
    const intersectsButton = raycaster.intersectObject(StarterButton);
    const intersectsObject = raycaster.intersectObject(CurrentShape);
    if (ButtonShowing) {
        if (intersectsButton.length > 0) {
            console.log("start button clicked, starting timer...");

            ButtonShowing = false;

            Timer.start();

            scene.remove(StarterButton);
            StarterButton.geometry.dispose();
            StarterButton.material.dispose();

            scene.add( CurrentShape );

        }
    }
    if (intersectsObject.length > 0) {
        console.log("Shape clicked, removing:", CurrentShape);
        console.log("shape pressed at: ", Timer.getElapsedTime());

        // Properly clean up the current shape
        scene.remove(CurrentShape);
        CurrentShape.geometry.dispose();
        CurrentShape.material.dispose();
        CurrentShape = null;

        // Create and add a new shape
        CurrentShape = randomShape();
        CurrentShape.position.copy(randomLocation());
        console.log("New shape added at:", CurrentShape.position);
        scene.add(CurrentShape);
    }
}


// return a random location between the planes of the camera
function randomLocation() {
    const z = -(Math.random() * 8 + 7); // Random Z
    const height = 2 * Math.abs(z) * Math.tan(THREE.MathUtils.degToRad(75) / 2);
    const width = height * camera.aspect;
    const x = (Math.random() - 0.5) * width;
    const y = (Math.random() - 0.5) * height;
    return new THREE.Vector3(x, y, z);
}


// returns a random shape of the geometries
function randomShape() {
    const randIndex = Math.floor(Math.random() * geometries.length);
    const geometry = geometries[randIndex].clone();
    const mesh = new THREE.Mesh(geometry, Material.clone());
    return mesh;
}

// WebGL Check
if (!WebGL.isWebGL2Available()) {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.body.appendChild(warning);
}

