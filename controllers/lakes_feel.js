const Usuario = require('../models/usuario');
const Recarga = require('../models/recarga');
const { validateRequestWithBody } = require('twilio/lib/webhooks/webhooks');

var controller = {

    obtenerPerfilQr:async(req,res)=>{

        try {
            
            const usuario = await Usuario.findById('641a44974ea6b00014d8fbf6');

            return res.status(200).json(usuario);

        } catch (error) {
            
            return res.status(400).json({ok:false})

        }

    },
    agregarAbonoCliente:async(req,res)=>{

        try {
            
            const newRecarga = new Recarga(req.body);

            await Usuario.findByIdAndUpdate({'_id':req.body.id},{$push:{recargas:newRecarga}});

            return res.status(200).json({ok:true});

        } catch (error) {
            
            return res.status(400).json({ok:false});

        }

    }

}

module.exports = controller;