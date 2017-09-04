
let user = {
	coins: 100,
	towers: [],
	towerCost: 40
}

window.onload = function(){
	let scene = new THREE.Scene();
	let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight , 0.1, 100);
	let renderer = new THREE.WebGLRenderer();

	let canBuild = false;
	let objectWasPicked;
	let axes = new THREE.AxisHelper( 20 );
	scene.add(axes);

	let stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb
	document.body.appendChild( stats.dom );

	renderer.setClearColor(0x2E2E2E);

	renderer.setSize(window.innerWidth, window.innerHeight);
	//shadow enable
	renderer.shadowMap.enabled = true;


	//light
	let spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 0, 90, -10 );
	spotLight.castShadow = true;
	scene.add(spotLight );

	//floor
	let planeGeometry = new THREE.PlaneBufferGeometry(107.5,60,1,1);
	let planeMaterial = new THREE.MeshLambertMaterial({color: 0x424242});
	let plane = new THREE.Mesh(planeGeometry,planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x=-0.5*Math.PI;
	plane.name = "FLOOR";
	scene.add(plane);

	camera.position.x = 0;
	camera.position.y = 90;
	camera.position.z = 20;

	camera.lookAt(scene.position);

//DATA
	let _st = false;
	let plateTypes = [
		["","portal","","","","","","","","","","","","","","","","","",""],
		["plate","road","","","","","","","","","","","","","","","","","",""],
		["plate","road","","","","","","","","","","","","","","","","","",""],
		["plate","road","plate","plate","","","","","","","","","","","","","","","",""],
		["","road","road","road","road","plate","","","","","","","","","","","","","",""],
		["","plate","plate","plate","road","road","","","","","","","","","","","","","",""],
		["","","","","","road","","","","","plate","plate","plate","plate","","","","","",""],
		["","","","","","road","plate","plate","plate","road","road","road","road","road","road","","","","",""],
		["","","","","","road","road","road","road","road","plate","plate","","plate","road","plate","","","",""],
		["","","","","","plate","plate","plate","plate","","","","","","road","plate","plate","plate","plate",""],
		["","","","","","","","","","","","","","","road","road","road","road","road","base"] ];
	//plate generation:
	function newPlate(){
		let dm = 5;
		let h = 2;
		let plateDist = 0.5;
		//по ширині
		let inW = plane.geometry.parameters.width/(dm+plateDist);
		//по довжині
		let inH = plane.geometry.parameters.height/(dm+plateDist)
		let plateColor;
		console.log("w: "+inW+" h: "+inH);
		for(let i = 0; i < inW; i++){
			for(let j = 0; j < inH; j++){
				switch(plateTypes[j][i]){
					case "road": plateColor = 0x515151;
					break;
					case "plate": plateColor = 0x242424;
					break;
					case "base": plateColor = 0x008e0e;
					break;
					case "portal": plateColor = 0xcc53bb;
					break;
					default: plateColor = 0x070707;
					break;
				}
				if(plateTypes[j][i]!=""){
					let plateGeometry = new THREE.BoxBufferGeometry(dm, h, dm);
					let plateMaterial = new THREE.MeshLambertMaterial({color: plateColor});
					let plate = new THREE.Mesh(plateGeometry, plateMaterial);
					let posX = i*dm+i*plateDist;
	 				let posY = h;
					let posZ = j*dm+j*plateDist;
					plate.position.set(posX-plane.geometry.parameters.width/2+dm/2, posY, posZ-plane.geometry.parameters.height/2+dm/2);
					plate.name = plateTypes[j][i];
					scene.add(plate);
				}
			}
		}
		
	}
	function showDialog(){
		$(".dialog").animate({bottom: "40px"},500);
	}
	function hideDialog(){
		$(".dialog").animate({bottom: "-120px"},500);
	}
	function build(PL){
		
		let x = PL.position.x;
		let y = PL.position.y;
		let z = PL.position.z;
		let towerGeometry = new THREE.BoxBufferGeometry(2, 4, 2);
		let towerMaterial = new THREE.MeshLambertMaterial({color: 0x00FF40});
		let tower = new THREE.Mesh(towerGeometry, towerMaterial);
		tower.position.set(x,y+1,z);
		tower.name = "tower";
		scene.add(tower);
		
		user.towers.push({
			x: PL.position.x,
			y: PL.position.y,
			z: PL.position.z
		});
	}	

	//pick object
	let raycaster = new THREE.Raycaster();
	renderer.domElement.addEventListener("click", function (event) {
		event.preventDefault();
		// Определяем положение мыши относительно элемента
		let br = this.getBoundingClientRect();
		mouseX = (event.clientX - br.left) / renderer.domElement.offsetWidth * 2 - 1;
		mouseY = 1 - (event.clientY - br.top) / renderer.domElement.offsetHeight * 2;
		//console.log( "mouse x : " + mouseX.toFixed(2) );
		//console.log( "mouse y : " + mouseY.toFixed(2) );

		let vector = new THREE.Vector3(mouseX, mouseY, 0).unproject(camera);
		raycaster.set(camera.position, vector.sub( camera.position ).normalize());
		let intersects = raycaster.intersectObject(scene, true);
		if (intersects.length > 0) {
			//console.log(intersects[0].object.name);
			let one = scene.getObjectByName(intersects[0].object.name);
			document.getElementById("typeEcho").innerHTML = "<span>type: "+one.name+"</span>";
			//doing smth
			//console.log(intersects[ 0 ].object.position);
			if ( objectWasPicked != intersects[ 0 ].object ) {

				if ( objectWasPicked ) objectWasPicked.material.emissive.setHex( objectWasPicked.currentHex );

				objectWasPicked = intersects[0].object;
				objectWasPicked = intersects[ 0 ].object;
				objectWasPicked.currentHex = objectWasPicked.material.emissive.getHex();
				if( objectWasPicked.name != "FLOOR" ) objectWasPicked.material.emissive.setHex( 0xff0000 );
				if(objectWasPicked.name == "plate"){
					showDialog();
					$('.dialog button').click(function(){
						if($(this).attr("class")=='yes'){
							//canBuild = true;
							build(objectWasPicked);
							hideDialog();
						}else{
							//canBuild = false;
							hideDialog();
						}
					});
				}
			}
		}else{
			if ( objectWasPicked ) objectWasPicked.material.emissive.setHex( objectWasPicked.currentHex );
				objectWasPicked = null;
				//close panel
		}
	});



		
	newPlate();

	$("#output").append(renderer.domElement);
	let animate = function () {	

		requestAnimationFrame( animate );
		stats.begin();
			renderer.render(scene, camera);
		stats.end();
		}
	
	animate();


//START
	$('.start').click(function(){
		if($(this).text()=="START"){
			_st = true;
			$('.start').text("PAUSE");
		}else{
			_st = false;
			$('.start').text("START");
		}
	});
}