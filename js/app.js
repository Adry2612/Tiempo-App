// Cargamos el script una vez se haya cargado el documento HTML en su totalidad.
$().ready(function(){
    // Obtenemos la ubicación exacta sabiendo la latitud y longitud de nuestra posición.
    var latitud;
    var longitud;
    var clave = 'f4fef4894d485299931f35ac6a8c05c0';
    var proxy = 'https://cors-anywhere.herokuapp.com/';

    // Si el navegador tiene habilitada la localización obtendremos la latitud y la longitud de la posición actual. En caso contrario mostraremos un mensaje de error. TODO: Realizar un pop-up para mostrar el mensaje de error.
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
            latitud = posicion.coords.latitude;
            longitud = posicion.coords.altitude;

            // Guardamos la dirección de la api en una variable para utilizarla con comodidad.
            var api = `${proxy}https://samples.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${clave}`;

            // Petición AJAX para obtener toda la información de las cordenadas solicitadas.
            $.ajax({
                type: "GET",
                url: api,
                dataType: "JSON",
                success: function (response) {
                    response.foreach(elemento =>{
                        console.log(elemento);
                    })
                }
            });
    });

    }else{
        h1.textContent = 'Algo ha ido mal. No se puede obtener la localización.'
    }
});