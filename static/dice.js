let requestId, cube, particles;
const circleSize = 35;
const cubeSize = 3 * circleSize;
const cubePosZ = -2 * cubeSize; // the position of cube in Z-axis
var isPlay = true;


/*
*        Quaternion
*/
var targetQuaternion = new THREE.Quaternion();
var clock = new THREE.Clock();
var angularDisplacement = Math.PI;

const spherical = new THREE.Spherical();

function centerElement(s) {
    if (s == 5) { /* up-down movement */
        targetQuaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
    }
    else if (s == 6) {
        targetQuaternion.setFromEuler(new THREE.Euler(3 * Math.PI / 2, 0, 0));
    }
    else { /* left-right movement */
        targetQuaternion.setFromEuler(new THREE.Euler(0, s * Math.PI / 2, 0));
    }

    // const axis = new THREE.Vector3(1, 0, 0).normalize();
    // targetQuaternion.setFromAxisAngle(axis, s * Math.PI / 2);
}

function animateQuaternion() {

    requestAnimationFrame(animateQuaternion);
    var delta = clock.getDelta();

    if (!cube.quaternion.equals(targetQuaternion)) {
        var step = angularDisplacement * delta;
        cube.quaternion.rotateTowards(targetQuaternion, step);
    }

    renderScene();

}

function createCube() {
    var materials = [];
    // materials.push(new THREE.MeshBasicMaterial({ color: 0xE80000 })); // 0xd5d918
    var sprite = new THREE.TextureLoader().load('/static/1.png');
    materials.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF, map: sprite, alphaTest: 0.5, transparent: false })); // 0x2173fd
    sprite = new THREE.TextureLoader().load('/static/2.png');
    materials.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF, map: sprite, alphaTest: 0.5, transparent: false })); // 0x2173fd
    sprite = new THREE.TextureLoader().load('/static/3.png');
    materials.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF, map: sprite, alphaTest: 0.5, transparent: false })); // 0x2173fd
    sprite = new THREE.TextureLoader().load('/static/4.png');
    materials.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF, map: sprite, alphaTest: 0.5, transparent: false })); // 0x2173fd
    sprite = new THREE.TextureLoader().load('/static/5.png');
    materials.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF, map: sprite, alphaTest: 0.5, transparent: false })); // 0x2173fd
    sprite = new THREE.TextureLoader().load('/static/6.png');
    materials.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF, map: sprite, alphaTest: 0.5, transparent: false })); // 0x2173fd


    var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    cube = new THREE.Mesh(cubeGeometry, materials);

    return cube;
}

function startScene(cube) {
    var canvas = document.getElementById('svg_img');
    render = new THREE.WebGLRenderer({ alpha: true });
    // render.setClearColor(0xFFB500, 1);

    var canvasWidth = canvas.getAttribute('width');
    var canvasHeight = canvas.getAttribute('height');
    render.setSize(canvasWidth, canvasHeight);

    canvas.appendChild(render.domElement);

    scene = new THREE.Scene();
    var aspect = canvasWidth / canvasHeight;

    camera = new THREE.PerspectiveCamera(45, aspect);
    camera.position.set(0, 0, 0);
    camera.lookAt(scene.position);
    scene.add(camera);

    cube.position.set(0, 0, cubePosZ);
    scene.add(cube);
}

function stopScene() {
    isPlay = false;
}

function renderScene() {
    render.render(scene, camera);
}
document.addEventListener('DOMContentLoaded', function (event) {
    // window.requestAnimationFrame = (function() {
    //     return window.requestAnimationFrame;
    // })();
    cube = createCube();
    startScene(cube);
    // renderScene();
    animateQuaternion();
});

$('#diceButton').on('click', function () {
    var $btn = $(this).button('loading')
    $btn.button('reset')
    $.post("/",
        {
            name: "Donald Duck",
            city: "Duckburg"
        },
        function (data, status) {
            // console.log("Data: " + data + "\nStatus: " + status);

            // replace by a new dice
            // $("#svg_img").html(data);

            // rotate
            // $({ deg: 0 }).animate({ deg: 360 }, {
            //     duration: 1200,
            //     step: function (now, fx) {
            //         $("#svg_img").css({
            //             transform: "rotate(" + now + "deg)"
            //         });
            //     }
            // });


            // animateScene();
            // setTimeout(stopScene, 3000);

            // var yourDice = Math.floor(Math.random() * 6);
            var yourDice = data;
            console.log("Your dice: " + yourDice);
            centerElement(yourDice);
        });
})

