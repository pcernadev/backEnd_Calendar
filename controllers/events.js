const { response } = require("express");

const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const eventoGuardado = new Evento(req.body);

  try {
    eventoGuardado.user = req.uid;

    await eventoGuardado.save();
    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el Administrador",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const { uid } = req;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con este id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(404).json({
        ok: false,
        msg: "No tiene privilegios para editar este evento",
      });
    }

    const eventoNuevo = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      eventoNuevo,
      { new: true }
    );

    return res.json({
      ok: true,
      eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el Administrador",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const { uid } = req;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con este id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(404).json({
        ok: false,
        msg: "No tiene privilegios para eliminar este evento",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    return res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el Administrador",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
