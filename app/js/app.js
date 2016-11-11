var notification = document.querySelector('#toast-notification');

//To send toast notification
function sendToastNotification(msg, timer, actionText, actionHandler) {
	var data = {
		message: msg || '',
		timeout: timer || 3000
	};
	if (actionText && actionHandler) {
		data.actionHandler =  actionHandler;
		data.actionText =  'open';
	}

	if (notification && notification.MaterialSnackbar) {
		notification.MaterialSnackbar.showSnackbar(data);
	}
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('../sw.js', { scope: '/' }).then(function(reg) {
		if (reg.installing) {
			console.log('Service worker installing');
			sendToastNotification('App is ready for offline use', 4000);
		} else if(reg.waiting) {
			console.log('Service worker installed');
		} else if(reg.active) {
			console.log('Service worker active');
		}
	}).catch(function(error) {
		console.log('Registration failed with ' + error); // Registration failed
	});
}

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
	noSupportText.textContent = "Press the camera icon below to take a pic or load a qr code to scan."

	//Add the camera and img element to DOM
	var pageContentElement = document.querySelector('.page-content');
	pageContentElement.appendChild(camera);
	pageContentElement.appendChild(frame);
	pageContentElement.appendChild(noSupportText);

	//On camera change
	camera.addEventListener('change', function(e) {
		var file = e.target.files[0];
		frame.src = URL.createObjectURL(file);
	});
}
