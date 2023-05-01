


function TREE_JS(typ, vertex, Color) {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / (window.innerHeight / 2), 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 3, window.innerHeight / 2);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
    let material = new THREE.MeshBasicMaterial({ color: 0xc0c0c0 });
    let polygon = new THREE.Mesh(mesh, material);
    scene.add(polygon);
    let mesh_2;

    if (typ == "BufferGeometry") {
        mesh_2 = new THREE.BufferGeometry();
        let vertices_2 = new Float32Array(vertex)
        mesh_2.setAttribute('position', new THREE.BufferAttribute(vertices_2, 3));
        mesh_2.computeVertexNormals();
    
    }else if(typ=="BoxGeometry"){
        mesh_2 = new THREE.BoxGeometry(vertex[0],vertex[1],vertex[2]);
    }else if(typ == "PlaneGeometry"){
        mesh_2 = new THREE.PlaneGeometry(vertex[0],vertex[1]);
    }else if(typ == "SphereGeometry"){
        mesh_2 = new THREE.SphereGeometry(vertex[0],vertex[1],vertex[2]);
    }else if(typ == "ConeBufferGeometry"){
        mesh_2 = new THREE.ConeBufferGeometry(vertex[0],vertex[1],vertex[2]);
    }else if(typ == "TorusKnotGeometry"){
        mesh_2 = new THREE.TorusKnotGeometry(vertex[0],vertex[1],vertex[2],vertex[3],vertex[4],vertex[5]);
    }

    let material_2 = new THREE.MeshPhongMaterial({ color: Color});
    
    let object = new THREE.Mesh(mesh_2, material_2);
    object.castShadow = true;
    object.rotation.x = -1.63;
    scene.add(object);


    function render() {
        requestAnimationFrame(render);

        object.rotation.z += 0.005;
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
}