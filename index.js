const {  inquirerMenu, pausa } = require("./helpers/inquirer");


const main = async() => {
    let opt

    do{
         opt = await  inquirerMenu();
        console.log({opt});

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