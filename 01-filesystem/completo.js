const fs = require('fs');

const archivo = './usuarios.json';

function anadirUsuario(nombre, apellido, edad, callback) {
    // 1. Leer usuarios y parsearlos a array de objetos
    fs.readFile(archivo, (error, data) => {
        if (error) {
            console.error('Error leyendo archivo', error);
            return;
        }
        const usuarios = JSON.parse(data);

        // 2. Añadir usuario a array
        usuarios.push({ id: usuarios[usuarios.length - 1].id + 1, nombre, apellido, edad });

        // 3. Escribir array nuevo en el mismo fichero
        fs.writeFile(archivo, JSON.stringify(usuarios), (errorEscritura) => {
            if (errorEscritura) {
                console.error('Error escribiendo archivo', errorEscritura);
                return;
            }
            console.log('Usuario añadido al fichero');
            callback();
        })
    });
}

anadirUsuario('Luis', 'Garcia', 20, () =>
    anadirUsuario('Miriam', 'De la Rosa', 28, () =>
        anadirUsuario('Javier', 'Gracia', 35, () => {
            console.log('Hemos añadido a los 3 usuarios');
        })
    )
);
