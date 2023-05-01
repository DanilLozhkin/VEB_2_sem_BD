var Value = document.getElementById("p4").innerText;
var values = Value.replace("value, vertex: ", "").split(",");
var vertex = [];

for (var i = 0; i < values.length; i++) {
    vertex.push(parseFloat(values[i]));
}

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 6) / (window.innerHeight / 3), 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 6, window.innerHeight / 3);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
let f = 0;


//фон
let mesh = new THREE.BufferGeometry();
let vertices = new Float32Array([
    //полигон 1
    -200, -200, -40,
    200, -200, -40,
    200, 200, -40,
    //полигон 2
    200, 200, -40,
    -200, 200, -40,
    -200, -200, -40
]);
mesh.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
let material_2 = new THREE.MeshBasicMaterial({ color: 0xc0c0c0 });
let polygon = new THREE.Mesh(mesh, material_2);
scene.add(polygon);


let mesh_3 = new THREE.BufferGeometry();
let vertices_3 = new Float32Array(vertex)



mesh_3.setAttribute('position', new THREE.BufferAttribute(vertices_3, 3));
mesh_3.computeVertexNormals();
let material_3 = new THREE.MeshPhongMaterial({ color: 0xff000 });
let pyramid = new THREE.Mesh(mesh_3, material_3);
pyramid.castShadow = true;
pyramid.rotation.x = -1.63;
console.log
scene.add(pyramid);


function render() {
    requestAnimationFrame(render);

    pyramid.rotation.z += 0.005;
    renderer.render(scene, camera);
}
render();

//свет 1
let light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 15, 20);
light.castShadow = true;

scene.add(light);


// const helper = new THREE.CameraHelper(light.shadow.camera);
// const helper2 = new THREE.CameraHelper(light_2.shadow.camera);
// scene.add(helper, helper2);

camera.position.set(0, 4, 15);
//camera.rotation.x = 0.2;

renderer.render(scene, camera);
