import QRReader from './vendor/qrscan.js';
import {snackbar} from './snackbar.js';
import styles from '../css/styles.css';

//To check result is url or not
function isURL(url) {
  var regExp = new RegExp('^(?:[a-z]+:)?//', 'i');
  return regExp.test(url);
}

//Initializing qr scanner
window.addEventListener('load', (event) => {
  if (window.iOS) {
    document.querySelector('#camera').click(); //Open camera options on load
  }
  else {    
    QRReader.init();
  }
});

var copiedText = null;
var scanBtnElement = document.querySelector('.custom-btn');
var dialogElement = document.querySelector('.app__dialog');
var dialogOpenBtnElement = document.querySelector('.app__dialog-open');
var dialogCloseBtnElement = document.querySelector('.app__dialog-close');
var scanningEle = document.querySelector('.custom-scanner');
var textBoxEle = document.querySelector('#result');
var menuIconElement = document.querySelector('.app__header-icon');
var menuElement = document.querySelector('.menu');
var menuOverlayElement = document.querySelector('.menu__overlay');

//Menu click event
menuIconElement.addEventListener('click', showMenu, false);
menuOverlayElement.addEventListener('click', hideMenu, false);

//Dialog close btn event
dialogCloseBtnElement.addEventListener('click', hideDialog, false);
dialogOpenBtnElement.addEventListener('click', openInBrowser, false);

//To open result in browser
function openInBrowser() {
  console.log('Result: ', copiedText);
  window.open(copiedText, '_blank', 'toolbar=0,location=0,menubar=0');
  copiedText = null;
}

//To show menu
function showMenu() {
  menuElement.classList.add('menu--show');
  menuOverlayElement.classList.add('menu__overlay--show');
}

//To hide menu
function hideMenu() {
  menuElement.classList.remove('menu--show');
  menuOverlayElement.classList.remove('menu__overlay--show');
}

//Fab btn to scan
scanBtnElement.addEventListener('click',  () => {
  snackbar.show('Scanning please wait...', 2000);
  scanningEle.style.display = 'block';
  QRReader.scan((result) => {
    copiedText = result;
    textBoxEle.value = result;
    textBoxEle.select();
    scanningEle.style.display = 'none';
    if (isURL(result)) {
      dialogOpenBtnElement.style.display = 'inline-block';
    }
    dialogElement.classList.remove('app__dialog--hide');
  });
});

//Hide dialog
function hideDialog() {
  dialogElement.classList.add('app__dialog--hide');
}

//If service worker is installed, show offline usage notification
navigator.serviceWorker.ready.then((registration) => {
  if (registration.installing) {
    snackbar.show('App is ready for offline usage.', 5000);
  }
})
