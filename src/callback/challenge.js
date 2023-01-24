const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // instanciamos xmlhttprequest.
const API = 'https://api.escuelajs.co/api/v1'; // API donde vamos a traer los datos.

function fetchData(urlApi, callback) { // función donde generamos la conexión, recibe urlApi y un callback.
    let xhttp = new XMLHttpRequest(); // generamos una nueva instancia más corta en xhttp.
    xhttp.open('GET', urlApi, true); // abrimos una conexión con el método GET, urlApi y true para asincronismo.
    xhttp.onreadystatechange = function (event) { // cuando este cambio suceda, escuchamos el estado:
        if (xhttp.readyState === 4) { // comparamos el estado que sea igual a 4 (completado).
            if (xhttp.status === 200) { // comparamos el estatus sea igual a 200 (solicitud correcta).
                callback(null, JSON.parse(xhttp.responseText)); // retornamos callback null en error. Parse de datos.
            } else { // si lo anterior no ocurre:
                const error = new Error('Error' + urlApi); // generamos un nuevo error + urlApi.
                return callback(error, null); // retornamos callback con el error y null(para los datos).
            };
        };
    };
    xhttp.send(); // Enviamos el llamado o solitud.
};

fetchData(`${API}/products`, function (error1, data1) { // llamamos la función con argumentos de url y func anónima.
    if (error1) return console.error(error1); // si se genera error retornamos error, info en data 1.
    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2) { // volvemos a llamar a la función.
        if (error2) return console.error(error2); // retornamos error2 (si se produce) e info guardada en data2.
        fetchData(`${API}/categories/${data2.category.id}`, function(error3, data3) { // 3er llamado a la func.
            if (error3) return console.error(error3); // retorn. error3 (si se produce). Info guardada en data3.
            console.log(data1[0]); 
            console.log(data2.title); 
            console.log(data3.name); 
        });
    });
});