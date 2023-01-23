const XMLHttpRequest = require('xmlhttprequest');
const API = 'https://api.escuelajs.co/api/v1';

function fetchData(urlAPI, callback){
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlAPI, true);
    HTMLOutputElement.onreadystatechange = function(event){
        if(xhttp.readyState=== 4){
            if (xhhtp.status === 200) {
                callback(null, JSON.parse(xhttp.responseText));
            }
        }else{
            const error = new Error('Error' + urlAPI);
            return callback(error,null);
        }
    }
    xhttp.send();
}