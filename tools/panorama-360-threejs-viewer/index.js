import * as THREE from "./three.module.js";

let isUserInteracting = false,
  onPointerDownMouseX = 0,
  onPointerDownMouseY = 0,
  lon = 0,
  onPointerDownLon = 0,
  lat = 0,
  onPointerDownLat = 0,
  phi = 0,
  theta = 0;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1100
);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

const container = document.getElementById("container");
container.appendChild(renderer.domElement);
container.style.touchAction = "none";

container.addEventListener("pointerdown", onPointerDown);
container.addEventListener("pointermove", onPointerMove);
container.addEventListener("pointerup", onPointerUp);
document.addEventListener("wheel", onDocumentMouseWheel);
window.addEventListener("resize", onWindowResize);
document.getElementById("file").addEventListener("change", onLoadFile);

loadFile("./panorama.jpg");

function loadFile(fileUrl) {
  const texture = new THREE.TextureLoader().load(fileUrl);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown(event) {
  if (event.isPrimary === false) return;

  isUserInteracting = true;

  onPointerDownMouseX = event.clientX;
  onPointerDownMouseY = event.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  if (!isUserInteracting) return;

  lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
  lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
}

function onPointerUp(event) {
  if (event.isPrimary === false) return;

  isUserInteracting = false;
}

function onDocumentMouseWheel(event) {
  const fov = camera.fov + event.deltaY * 0.05;

  camera.fov = THREE.MathUtils.clamp(fov, 10, 75);

  camera.updateProjectionMatrix();
}

function onLoadFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const fileUrl = URL.createObjectURL(file);
  loadFile(fileUrl);
}

function animate() {
  if (isUserInteracting === false) {
    // lon += 0.1;
  }

  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(lon);

  const x = 500 * Math.sin(phi) * Math.cos(theta);
  const y = 500 * Math.cos(phi);
  const z = 500 * Math.sin(phi) * Math.sin(theta);

  camera.lookAt(x, y, z);

  renderer.render(scene, camera);
}
