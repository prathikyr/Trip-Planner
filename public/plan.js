function addPlace(){
	document.getElementById('addPlace').style.display = 'block';
	document.getElementById('addActivity').style.display = 'none';
	document.getElementById('addImages').style.display = 'none';
}
function addActivity(){
	document.getElementById('addActivity').style.display = 'block';
	document.getElementById('addPlace').style.display = 'none';
	document.getElementById('addImages').style.display = 'none';
}
function addImages(){
	document.getElementById('addImages').style.display = 'block';
	document.getElementById('addPlace').style.display = 'none';
	document.getElementById('addActivity').style.display = 'none';
}
function hello(){
	document.getElementById('hi').innerHTML = "hello world";
}

function login(){
	document.getElementById('login').style.display = 'block';
	document.getElementById('reg').style.display = 'none';
}
function reg(){
	document.getElementById('login').style.display = 'none';
	document.getElementById('reg').style.display = 'block';
}
var im = 0;
function init(){
	document.body.style.backgroundImage = "url('bg-images/bg1.jpg')";
	window.setInterval(function(){
		changeBg();
	}, 3000);
}
function changeBg(){
	var images = ['bg-images/bg1.jpg', 'bg-images/bg2.jpg', 'bg-images/bg3.jpg', 'bg-images/bg4.jpg', 'bg-images/bg5.jpg', 'bg-images/bg6.jpg', 'bg-images/bg7.jpg', 'bg-images/bg8.jpg', 'bg-images/bg9.jpg', 'bg-images/bg10.jpg', 'bg-images/bg11.jpg', 'bg-images/bg12.jpg', 'bg-images/bg13.jpg', 'bg-images/bg14.jpg', 'bg-images/bg15.jpg'];
	
	var x = images[im];
	console.log(x);
	document.body.style.backgroundImage = "url("+x+")";
	im = (im+1)%15;
}
			
// function updatePlace(){
// 	document.getElementById('addPlace').style.display = 'none';
// 	document.getElementById('addImages').style.display = 'none';
// 	console.dir("Done");
// 	var placeDetails = {};
// 	placeDetails.place = document.getElementById('place').value;
// 	placeDetails.distance = document.getElementById('distance').value;
// 	placeDetails.arrival = document.getElementById('arrival').value;
// 	placeDetails.departure = document.getElementById('departure').value;
// 	utility.addPlace(placeDetails, function(){
// 		console.log("Done");
// 	});
// }