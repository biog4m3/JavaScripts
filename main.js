import * as THREE from "three";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();    
const geometry = new THREE.BoxGeometry(1, 1, 1);

var uniforms = {
    u_time: { type: 'f', value: 1.0}
}

const test = new THREE.ShaderMaterial({
    uniforms: {
        ...uniforms
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent
})
const cube = new THREE.Mesh(geometry, test);

scene.add(cube);


camera.position.x =  5;
camera.position.z =  5;
camera.lookAt(new THREE.Vector3(0,0,0));

clock.start();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    

    let t = clock.getElapsedTime();

    cube.rotateY(1 * ((Math.sin(t) - 1) / 2));


    uniforms['u_time'].value = t;
}
animate();