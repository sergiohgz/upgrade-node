const http = require('http');
const fs = require('fs');

const PORT = 3000;

const htmlToRespond = `<html>
    <body>
        <h1>Upgrade Hub - Node server</h1>
        <p>Soy un documento HTML que envíamos manualmente desde el servidor</p>
    </body>
</html>`;

const requestHandler = (request, response) => {
    // console.log('PETICION QUE NOS LLEGA:', request);
    // console.log('-------------------------------------');
    // console.log('RESPUESTA QUE PODEMOS DAR:', response);
    // response.send();
    // response.end("El servidor está activo");
    if (request.url === '/') {
        response.setHeader('Content-Type', 'text/html');
        response.end(htmlToRespond);
        return;
    }
    if (request.url === '/usuarios') {
        // Leer el fichero que corresponda y responder con los usuarios que tenemos en dicho fichero
        fs.readFile('./usuarios.json', (error, data) => {
            if (error) {
                response.writeHead(500);
                response.end('Error en servidor, vuelva a intentarlo más tarde');
                return;
            }
            // const usuarios = JSON.parse(data);
            response.setHeader('Content-Type', 'application/json');
            // response.end(JSON.stringify(usuarios));
            response.end(data.toString());
        });
        return;
    }
    response.writeHead(404);
    response.end('Elemento no encontrado');
};

const server = http.createServer(requestHandler);

server.listen(PORT, (error) => {
    if (error) {
        console.error('Error al arrancar mi servidor:', error);
    }
    console.log("Servidor arrancado correctamente");
});
