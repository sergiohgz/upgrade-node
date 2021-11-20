const express = require('express');

const router = express.Router();
const basePath = '/usuarios';

router.get('/:userId', (req, res) => {
    const usuarioId = req.params.userId;
    res.send(`Not implemented: GetUser -> ${usuarioId}`);
});

router.get('/', (req, res) => {
    res.send('Not implemented: GetUsers');
});

router.post('/', (req, res) => {
    res.send('Not implemented: PostUser');
});

router.put('/', (req, res) => {
    res.send('Not implemented: PutUser');
});

router.delete('/', (req, res) => {
    res.send('Not implemented: DeleteUser');
});

router.use('/', (req, res) => {
    res.status(405).send('Método no encontrado');
})

module.exports = {
    router,
    basePath,
};
