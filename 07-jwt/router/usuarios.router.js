const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const {
  SALTOS_ENCRIPTADO_PASSWORD,
  SECRET_SESSION,
} = require("../config/config");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { logger } = require("../middlewares/logger.middleware");
const Usuario = require('../models/Usuario');

const router = express.Router();

// POST para registro
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
        const error = new Error('Usuario ya registrado');
        return next(error);
    }

    const encryptedPassword = await bcrypt.hash(password, SALTOS_ENCRIPTADO_PASSWORD);
    const newUser = new Usuario({ email, password: encryptedPassword });

    const userDb = await newUser.save();

    return res.status(201).json(userDb);
  } catch (error) {
    return next(error);
  }
});

// POST para login
router.post("/login", [logger], async (req, res, next) => {
  try {
    //Buscamos al user en bd
    const userInfo = await Usuario.findOne({ email: req.body.email });
    //Comparamos la contraseña
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      //eliminamos la contraseña del usuario
      userInfo.password = null;
      //creamos el token con el id y el name del user
      const token = jwt.sign(
        {
          id: userInfo._id,
          email: userInfo.email,
        },
        req.app.get('secretKey'),
        { expiresIn: "1h" }
      );
      //devolvemos el usuario y el token.
      return res.status(200).json({ user: userInfo, token: token });
    } else {
      const error = new Error();
      error.status = 401;
      return next(error);
    }
  } catch (err) {
    return next(err);
  }
});

// POST para logout
router.post("/logout", (req, res, next) => {
  res.sendStatus(200);
});

module.exports = router;
