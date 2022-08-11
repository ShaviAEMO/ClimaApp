const fs = require('fs');

const axios = require('axios');




class Busquedas{

    historial = [];
    dbPath = './db/database.json';

    constructor (){
/*TODO:
leer base de datos
*/
this.leerBD(); 
}

get historialCapitalizado(){
    return this.historial.map(lugar =>{
        let palabras = lugar.split('');
        palabras = palabras.map(p => p[0].toUpperCase()+ p.substring(1));
        return palabras.join('')
    })

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
    return resp.data.features.map( lugar =>({
id: lugar.id,
nombre:lugar.place_name,
lng:lugar.center[0],
lat:lugar.center[1],
}));
    
    return[];
 }catch(error){
console.log('El servicio no esta disponiblea')
return[];

 }  

}

get paramsClimaLugar(){
    return {
        'appid': process.env.OPENWEATHER_KAY,
        'lang': 'es',
        'units':'metric',
        
    
    }
}

async climaLugar(lat='',log=''){
    try{
        //instancia axios
        const instanceClima = axios.create({
            baseURL:`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}`,
            params: this.paramsClimaLugar
        })
        //resp.data
        const resp2 = await instanceClima.get();
        const {main,weather} =  resp2.data;
        return {
            desc:weather[0].description,
            min:main.temp_min,
            max:main.temp_max,
            temp:main.temp
        }
    
        }catch{
        return['error en la api'];
    }
}

agregarHistorial(lugar = ''){


    //prevenir duplicados
    if(this.historial.includes(lugar.toLocaleLowerCase())){
        return;
    }
     this.historial.unshift(lugar.toLocaleLowerCase())

    // grabar en BD
    this.guardarDB();
}

guardarDB(){

    const payload ={
        historial: this.historial
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));

}

leerBD(){
 if(!fs.existsSync(this.dbPath))return;
  const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'});
  const data = JSON.parse(info);

  this.historial = data.historial;
}

}



module.exports = Busquedas;