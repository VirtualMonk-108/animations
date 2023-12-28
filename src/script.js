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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Time We create a clock object
// const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

// Animation
const tick = () => {

    // Elapsed time
    //const elapsedTime = clock.getElapsedTime() // We get the elapsed time since the clock was created

    // Update objects
    // mesh.rotation.y = elapsedTime // We rotate the mesh on the y axis
    // mesh.rotation.x = elapsedTime // We rotate the mesh on the y axis

    // Render - we moved this from outside the tick function to inside it
    renderer.render(scene, camera)

    // Call tick again on the next frame
     window.requestAnimationFrame(tick)
}

tick()
