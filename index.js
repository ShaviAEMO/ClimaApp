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
            const lugarSel = lugares.find(l => l.id === id);
            console.log({lugarSel});
            //clima

            //mostrar resultados
               console.log('\n Infomacion de la ciudad \n'.green);
               console.log('Ciudad: ',lugarSel.nombre);
               console.log('Lat: ',lugarSel.lat);
               console.log('Lng: ',lugarSel.lng);
               console.log('Temperatura: ',);
               console.log('Min: ',);
               console.log('Max: ',);


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