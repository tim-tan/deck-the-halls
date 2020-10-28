let scene = new THREE.Scene()
scene.background = new THREE.Color(0xbad4ff)

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 50)


var renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

let flakeCount = 9999
let fakeGeometry = new THREE.TetrahedronGeometry(0.027) // radius
let flakeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })

let snow = new THREE.Group()

for (let i = 0; i < flakeCount; i++) {

  let flakeMesh = new THREE.Mesh(flakeGeometry, flakeMaterial)

  flakeMesh.position.set(
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 40
  )

  snow.add(flakeMesh)


}
scene.add(snow)

let flakeArray = snow.children


// ground
let groundGeometry = new THREE.CircleGeometry(10, 50)
let groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })

let ground = new THREE.Mesh(groundGeometry, groundMaterial)
ground.position.y = -1.8
ground.rotation.x = -Math.PI / 2
scene.add(ground)

// tree trunk
let tree = new THREE.Group()
let trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1)
let trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x49311c })

let trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)

tree.add(trunk)

//leaves 
let leavesGeometry = new THREE.ConeGeometry(1.2, 2, 6)

let leavesMaterial = new THREE.MeshPhongMaterial({ color: 0x3d5e3a })

let leavesBottom = new THREE.Mesh(leavesGeometry, leavesMaterial)
leavesBottom.position.y = 1.2
tree.add(leavesBottom)

let leavesMiddle = new THREE.Mesh(leavesGeometry, leavesMaterial)
leavesMiddle.position.y = 2.2
tree.add(leavesMiddle)

let leavesTop = new THREE.Mesh(leavesGeometry, leavesMaterial)
leavesTop.position.y = 3.2
tree.add(leavesTop)

tree.position.y = -1.3

scene.add(tree)

//lighting

let rightLight = new THREE.PointLight(0xffffff, 0.3, 0)
rightLight.position.set(10, 20, 7)
let leftLight = new THREE.PointLight(0xffffff, 0.3, 0)
leftLight.position.set(-10, 20, 7)

let ambientLight = new THREE.AmbientLight(0xffffff, 0.8)

scene.add(rightLight)
scene.add(leftLight)
scene.add(ambientLight)

//controls

let controls = new THREE.OrbitControls(camera, renderer.domElement)

camera.position.z = 15
camera.position.y = 1
controls.update()

//snowflake animation
let animate = function() {
  requestAnimationFrame(animate)

  for (i = 0; i < flakeArray.length / 2; i++) {
    flakeArray[i].rotation.y += 0.01
    flakeArray[i].rotation.x += 0.02
    flakeArray[i].rotation.z += 0.03
    flakeArray[i].position.y -= 0.018
    if (flakeArray[i].position.y < -4) {
      flakeArray[i].position.y += 10
    }
  }
  for (i = flakeArray.length / 2; i < flakeArray.length; i++) {
    flakeArray[i].rotation.y -= 0.03
    flakeArray[i].rotation.x -= 0.03
    flakeArray[i].rotation.z -= 0.02
    flakeArray[i].position.y -= 0.016
    if (flakeArray[i].position.y < -4) {
      flakeArray[i].position.y += 9.5
    }

    snow.rotation.y -= 0.0000002
  }
  controls.update()

  renderer.render(scene, camera)
}

animate()