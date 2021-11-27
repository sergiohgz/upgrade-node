const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario');

const LocalStrategy = passportLocal.Strategy;
const saltos = 10;

passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                // 1. Buscar si existe un usuario registrado con el email
                const usuarioExistente = await Usuario.findOne({ email });
                if (usuarioExistente) {
                    const error = new Error('Usuario ya registrado');
                    return done(error);
                }

                // 2. Si el usuario no existe, vamos a encriptar la contraseña
                const passwordEncriptada = await bcrypt.hash(password, saltos);

                // 3. Creamos el usuario que escribiremos en DB (Mongo)
                const nuevoUsuario = new Usuario({ email, password: passwordEncriptada });
                const usuarioGuardado = await nuevoUsuario.save();

                // 4. Indicar que ya se ha hecho
                usuarioGuardado.password = undefined; // No vamos a mandar la contraseña encriptada fuera del servidor
                done(null, usuarioGuardado);
            } catch(error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                // 1. Buscar si existe el usuario registrado
                const usuario = await Usuario.findOne({ email });

                // 2. Si el usuario no existe, lanzamos un error
                if (!usuario) {
                    const error = new Error('Usuario no registrado');
                    return done(error);
                }

                // 3. Si el usuario SI existe, comprobamos que la contraseña sea correcta
                const esValidaContrasena = await bcrypt.compare(password, usuario.password);
                if (!esValidaContrasena) {
                    const error = new Error('Contraseña incorrecta');
                    return done(error);
                }

                // 4. Si es correcta la contraseña, proceder a iniciar sesión
                usuario.password = undefined;
                return done(null, usuario);
            } catch(error) {
                done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser((usuarioId, done) => {
    Usuario.findById(usuarioId)
        .then((usuarioExistente) => {
            done(null, usuarioExistente);
        })
        .catch((error) => {
            done(error)
        });
});
