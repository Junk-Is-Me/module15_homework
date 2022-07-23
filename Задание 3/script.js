const button = document.querySelector('button');
const sizeScreen = document.querySelector('.size_screen');
const sizeBrowser = document.querySelector('.size_browser');
const coordinates = document.querySelector('.coordinates_text');


button.addEventListener('click', (e) => {
    e.preventDefault();

    sizeScreen.innerHTML = `Размеры экраны монитора: ${window.screen.width} x ${window.screen.height}`;
    
    const success = (position) => {
        coordinates.innerHTML = `<p>Широта: ${position.coords.latitude}</p>
                                 <p>Долгота: ${position.coords.longitude}</p>`;        
     }
 
     const error = (position) => {
         coordinates.innerHTML = 'Невозможно получить данные местоположения';
         console.log(position);
     }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error);
    } 

})