const fs = require("fs");

fs.readFile('./usuarios.json', (error, data) => {
    if (error) {
        console.error('ERROR:', error);
        console.log('DATA cuando es un error = ', data);
    } else {
        // const typeData = typeof (data.toString());
        // const parsedData = JSON.parse(data);
        // const typeParsedData = typeof parsedData;
        // console.log('data:', data.toString());
        // console.log('tipo de data:', typeData);
        // console.log('parsedData:', parsedData);
        // console.log('tipo de parsedData:', typeParsedData);
        const usuarios = JSON.parse(data); // DE-SERIALIZAR
        usuarios.forEach((usuario) => {
            // console.log(`${usuario.nombre} ${usuario.apellido}`);
            console.log(usuario.nombre + ' ' + usuario.apellido);
        });
    }
});
