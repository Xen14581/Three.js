import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight , 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(0, 10, 20)
camera.lookAt(new THREE.Vector3(0,0,0))

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0x333333);
const lightHelper = new THREE.PointLightHelper(pointLight)
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set(10,3,10);
scene.add( directionalLight );
scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)

const spaceBG = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceBG;

const createStar = () => {
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 24, 24),
    new THREE.MeshStandardMaterial( { color: 0xffffff } )
  );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)  
};

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 24, 24),
  new THREE.MeshPhongMaterial( {
    map: new THREE.TextureLoader().load('earthmap.jpg'),
    bumpMap: new THREE.TextureLoader().load('earthnormalmap.jpg'),
    bumpScale: 0.005,
    specular: new THREE.Color('grey'),
    specularMap: new THREE.TextureLoader().load('earthspecularmap.png')
  } )
)

const clouds = new THREE.Mesh(
  new THREE.SphereGeometry(3.07, 24, 24),
  new THREE.MeshPhongMaterial( {
    map: new THREE.TextureLoader().load('clouds.png'),
    transparent: true
  } )
)
earth.add(clouds);
scene.add(earth);

// Array(200).fill().forEach(createStar)

const animate = () => {
  requestAnimationFrame( animate );

  controls.update();

  earth.rotation.y += 0.001;
  clouds.rotation.y += 0.0013;

  renderer.render( scene, camera );
};

animate();