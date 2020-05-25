// Cargamos el script una vez se haya cargado el documento HTML en su totalidad.
$().ready(function(){
    // Obtenemos la ubicación exacta sabiendo la latitud y longitud de nuestra posición.
    var latitud;
    var longitud;
    var clave = '473eecb882198e770d88ec9b71a41535';
    

    // Si el navegador tiene habilitada la localización obtendremos la latitud y la longitud de la posición actual. En caso contrario mostraremos un mensaje de error. TODO: Realizar un pop-up para mostrar el mensaje de error.
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
            latitud = posicion.coords.latitude;
            longitud = posicion.coords.longitude;

            // Guardamos la dirección de la api en una variable para utilizarla con comodidad.
            var api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${clave}`;
            // Petición AJAX para obtener toda la información de las cordenadas solicitadas.
            $.ajax({
                type: "GET",
                url: api,
                dataType: "JSON",
                success: function (response) {
                    console.log(response);
                    insertarDatos(response);
                }
            });

            
    });

    }else{
        h1.textContent = 'Algo ha ido mal. No se puede obtener la localización.'
    }
});

function insertarDatos(datos){
    var localizacion = datos.name; 
    $('.localizacion').append(localizacion);

    var temperatura = datos.main.temp;
}