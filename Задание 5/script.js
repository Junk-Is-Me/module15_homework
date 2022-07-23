const sendButton = document.querySelector('.send_btn');
const geoButton = document.querySelector('.geo_btn');
const inputText = document.querySelector('input');
const chatField = document.querySelector('.chat_field');
let current_latitude = '';
let current_longtitude = '';

const echoChat = new WebSocket('wss://ws.ifelse.io');

document.addEventListener("DOMContentLoaded", () => {
    echoChat.onopen = () => {};
  });

const printMessage = (text, from) => {
    let message = document.createElement('p');
    message.innerHTML = text;
    from == 'client' ? message.classList.add('p_client') : message.classList.add('p_server');
    chatField.prepend(message);
}


const echoSend = (text) => {    
    if(echoChat.readyState) { 
        echoChat.send(text);
        echoChat.onmessage = (event) => {
            printMessage(event.data, 'server');
        }
    }
}

sendButton.addEventListener('click', (e) => {
    e.preventDefault();

    let message = String(inputText.value);    
    printMessage(message, 'client');
    echoSend(message);    
})

geoButton.addEventListener('click', (e) => {
    e.preventDefault();

    const success = (position) => {

        current_latitude = position.coords.latitude;
        current_longtitude = position.coords.longitude;

        let geoLink = `<a href="https://www.openstreetmap.org/#map=18/${current_latitude}/${current_longtitude}" target="_blank">Геопозиция</a>`;        
        printMessage(geoLink, 'server');
     }
 
     const error = (position) => console.log(position);
     
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error);
    } 
}) 