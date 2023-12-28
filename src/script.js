import * as THREE from 'three'
import gsap from 'gsap'

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
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2

camera.lookAt(mesh.position) // We make the camera look at the mesh
scene.add(camera)

// the problem with perspective camera is that it distorts the objects 
// that are closer to the camera and makes them look bigger while the objects that are f
// further away look smaller


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

    // Update objects
    // mesh.rotation.y = elapsedTime // We rotate the mesh on the y axis
    mesh.rotation.y = elapsedTime // We rotate the mesh on the y axis

    // Render - we moved this from outside the tick function to inside it
    renderer.render(scene, camera)

    // Call tick again on the next frame
     window.requestAnimationFrame(tick)
}

tick()
