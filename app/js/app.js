//To add iOS support
window.iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;

//If its iOS, then remove the video element and camera element.
if (window.iOS) {
	// document.querySelector('video').remove(); //removing the video element

	//Creating the camera element
	var camera = document.createElement('input');
	camera.setAttribute('type', 'file');
	camera.setAttribute('capture', 'camera');
	camera.id = 'camera';

	var frame = document.createElement('img');
	frame.id = 'frame';

	var noSupportText = document.createElement('h2');
	noSupportText.className = "no-support";
	noSupportText.textContent = "Press the camera icon below to take a pic or load a QR Code to scan."

	//Add the camera and img element to DOM
	var pageContentElement = document.querySelector('.app__layout-content');
	pageContentElement.appendChild(camera);
	pageContentElement.appendChild(frame);
	pageContentElement.appendChild(noSupportText);

	//On camera change
	camera.addEventListener('change', function(e) {
		var file = e.target.files[0];
		frame.src = URL.createObjectURL(file);
	});
}