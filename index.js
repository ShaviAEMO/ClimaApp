require('dotenv').config()
const {  inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() => {

    const busquedas = new Busquedas();
    let opt

    do{
         opt = await  inquirerMenu();

        switch(opt){
            case 1:
                //mostrar mensaje
            const termino = await leerInput('Ciudad: ')
            
            //buscar los lugares
            const lugares = await busquedas.ciudad(termino);
            
            //seleccionar el lugar
            const id = await listarLugares(lugares);
            if(id ==='0') continue;
            const lugarSel = lugares.find(l => l.id === id);

            //Guardar en BD
            busquedas.agregarHistorial(lugarSel.nombre);
            //clima
            const lat = lugarSel.lat
            const log= lugarSel.lng
            const ubicacionCLima = await busquedas.climaLugar(lat,log);
            //mostrar resultados
               console.clear();
               console.log('\n Infomacion de la ciudad \n'.green);
               console.log('Ciudad: ',lugarSel.nombre.green);
               console.log('Lat: ',lugarSel.lat);
               console.log('Lng: ',lugarSel.lng);
               console.log('Temperatura: ',ubicacionCLima.temp);
               console.log('Min: ',ubicacionCLima.min);
               console.log('Max: ',ubicacionCLima.max);
               console.log('estatus del clima: ',ubicacionCLima.desc.green);
            break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i)=>{
                    const idx =`${i + 1}.`.green;
                    console.log(`${idx} ${ lugar}`);
                })
            break;
        }

        if(opt !== 0) await pausa();

    }while( opt !== 0)
    
}

main();


// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello Shavi seras ina ver..');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });