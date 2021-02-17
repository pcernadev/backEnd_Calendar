/*
Rutas de acceso a usuario
host + /api/events
*/

const { Router } = require("express");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");

const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use(validarJWT);

router.get("/", getEventos);
router.post(
  "/",
  [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("start", "la fecha de inicio es obligatoria").custom(isDate),
    check("end", "la fecha fin es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

module.exports = router;
