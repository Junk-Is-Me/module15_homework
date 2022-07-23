const button = document.querySelector('button');
const timezoneP = document.querySelector('.result_timezone');
const date_timeP =document.querySelector('.result_date_time');

let current_latitude = '';
let current_longtitude = '';

button.addEventListener('click', (e) => {
    e.preventDefault();

    const success = (position) => {

        current_latitude = position.coords.latitude;
        current_longtitude = position.coords.longitude;

        fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${current_latitude}&long=${current_longtitude}`)
            .then((response) => {
                return response.json()
            })       
            .then((data) => {
                timezoneP.innerHTML = `Часовой пояс: ${data.timezone}`;
                date_timeP.innerHTML = `Дата и время: ${data.date_time_txt}`;
            })
     }
 
     const error = (position) => console.log(position);
     
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error);
    } 
})