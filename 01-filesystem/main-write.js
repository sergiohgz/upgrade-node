const fs = require('fs');

const coche = {
    marca: 'Volkswagen',
    modelo: 'Golf',
    potencia: 150
};

// fs.writeFile(
//     './coche.json',
//     JSON.stringify(coche), // SERIALIZAR
//     (error) => {
//         if (error) {
//             console.error('Error al escribir en el fichero:', error);
//         } else {
//             console.log('Fichero escrito correctamente');
//         }
//     }
// )

fs.writeFile(
    './coche.txt',
    coche.marca + ' ' + coche.modelo + ' -> ' + coche.potencia + 'CV',
    (error) => {
        if (error) {
            console.error('Error al escribir en el fichero:', error);
        } else {
            console.log('Fichero escrito correctamente');
        }
    }
)
