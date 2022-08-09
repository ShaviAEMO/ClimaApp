const axios = require('axios');




class Busquedas{

    historial = ['Madrid', 'londres','Berlin'];

    constructor (){
/*TODO:
leer base de datos
*/
 
}

get paramsMapbox(){
    return {
        'limit':6,
        'language': 'es',
        'access_token': process.env.MAPBOX_KEY
    
    }
}

async ciudad(lugar=''){
 //console.log('Ciudad',lugar); 
 try{

    const instance = axios.create({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox
 })
    const resp= await instance.get();
    console.log(resp.data);
    
    return[];
 }catch(error){
console.log('El servicio no esta disponiblea')
return[];

 }  

}

}



module.exports = Busquedas;