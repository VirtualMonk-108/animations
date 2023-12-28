import * as THREE from 'three'
import gsap from 'gsap'

/*
CURSOR
We will use native JS to get the mouse coordinates
*/

const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width -0.5
    cursor.y = - (event.clientY / sizes.height -0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
// the first parameter is the field of view and it's vertical
// the second parameter is the aspect ratio and it's horizontal - the width divided by the height
// the third parameter is the near clipping plane - the closest point that the camera can see
// the fourth parameter is the far clipping plane - the furthest point that the camera can see
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3 // We move the camera back on the z axis
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Time We create a clock object
const clock = new THREE.Clock()

// Animation
const tick = () => {

    // Elapsed time
    const elapsedTime = clock.getElapsedTime() // We get the elapsed time since the clock was created


    // Update camera 
    // the code below gives a full view of the cube
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * 5

    // the below code does not give a full view, we cannot see the back of the cube
    // camera.position.x = cursor.x * 10
    // camera.position.y = cursor.y * 10

   // camera.lookAt(new THREE.Vector3()) // We make the camera look at the center of the scene
    camera.lookAt(mesh.position) // We make the camera look at the mesh which gets the same result as the code above


    // Update objects
    // mesh.rotation.y = elapsedTime // We rotate the mesh on the y axis
    // mesh.rotation.y = elapsedTime // We rotate the mesh on the y axis

    // Render - we moved this from outside the tick function to inside it
    renderer.render(scene, camera)

    // Call tick again on the next frame
     window.requestAnimationFrame(tick)
}

tick()
