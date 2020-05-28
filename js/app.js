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
    // Información de localización.
    $('.localizacion').html(datos.name);

    //Información de temperatura. (Cambio de kelvin a grados.)
    var temp = kelvinACelsius(datos.main.temp);
    $('#temp').html(temp);
    $('#temp').addClass('celsius');
    
    // Al hacer click sobre la temperatura podremos cambiar entre grados celsius o fahrenheit.
    $('.seccionTemperatura').click(function(){
        if($('#temp').hasClass('celsius')){
            temp = kelvinAFahrenheit(datos.main.temp);
            $('#temp').html(temp);
            // Eliminamos la clase anterior y añadimos la nueva clase.
            $('#temp').addClass('fahrenheit').removeClass('celsius');
            
            // Lo mismo realizamos con el span.
            $('span').remove();
            $('.seccionTemperatura').append($('<span>').html('º F'));
        } else{
            temp = kelvinACelsius(datos.main.temp);
            $('#temp').html(temp);
            // Eliminamos la clase anterior y añadimos la nueva clase.
            $('#temp').removeClass('fahrenheit').addClass('celsius');

            // Lo mismo realizamos con el span.
            $('span').remove();
            $('.seccionTemperatura').append($('<span>').html('º C'));
        }
    });

    // Descripciones de temperatura.
    if (temp < -10){
        $('.descripcionTemperatura').text('Hace un frio que congela las piedras.');
    } else if (temp < 0){
        $('.descripcionTemperatura').text('Hace muchisimo frio.');
    } else if (temp < 10){
        $('.descripcionTemperatura').text('Hace frio.');
    } else if (temp < 20){
        $('.descripcionTemperatura').text('Hace un poquito de frio.');
    } else if (temp < 30){
        $('.descripcionTemperatura').text('La temperatura es agradable.');
    } else{
        $('.descripcionTemperatura').text('Hace mucho calor.');
    }

    // Agregar icono correspondiente.
    var icono = `http://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png`;
    var img = $('<img>').attr('src', icono);
    var p = $('<p>');
    
    p.append(img);
    $('.zonaHoraria').append(p);
}

function kelvinACelsius(kelvin){
    // Formula kelvin a grados.
    var grados = kelvin - 273.15;

    // Redondeamos a un decimal.
    return grados.toFixed(1);
}

function kelvinAFahrenheit(kelvin){
    // Formula kelvin a fahrenheit.
    var grados = (kelvin - 273.15) * 1.8 + 32;

    // Redondeamos a un decimal.
    return grados.toFixed(1);
}