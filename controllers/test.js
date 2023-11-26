const ListaProductos = require('../models/lista_productos');
const Notificacion = require('../notificaciones');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');
const Ventas = require('../models/venta');
const { response } = require("express");
const mongoose = require('mongoose');
const moment = require('moment');

const test= async(req,res = response) =>{
    const data = {
        tokenId:'cbuRKMi9Ru2k4oGgH16WT2:APA91bFiEbQ9ZWpfPK2RxYOnALOpqKXQ2_RJtAszm2-IdyjCkkn3OpEap8dUwLEESDpSe9MfEUKp5gUG3im8cpyvHHv4V787WeRA9eRlw0EWaooPgm_DaDo_nlM2c29g7WZ4bQNRr8Ci',
        titulo:'Enviado desde NodeJS',
        mensaje:'Si puede perros 7u7',
    };

    Notificacion.sendPushToOneUser(data);

    return res.status(200).json({ok:true});

}
const add = async(req,res)=>{

    const nuevoProducto = new Producto(req.body);

    await ListaProductos.findOneAndUpdate({_id:'6346b3fbefbb82db511b64be'},{$push:{'productos':nuevoProducto}});

    return res.status(200).json({ok:true,producto:nuevoProducto});
    
}

const repartidores = async(req,res) =>{

    const repartidores = await Usuario.find({transito:false,repartidor:true,online_repartidor:true}).sort( { ultima_tarea: 1 }).limit(1);

    if(repartidores.length >0){
        res.json({ok:true, repartidores});
    }else{
        res.json({ok:false, repartidores});
    }

}

const actulizarVentaRepartidor = async(req,res)=>{

    try{

        await Ventas.findOneAndUpdate(
            {
                "_id":mongoose.Types.ObjectId('636c4955f05a370be45189a7')
            },
            {
                $set:{'pedidos.$[i].repartidor':'6352dde2642e410016f994fc'}
            },
            {
                arrayFilters:[
                    {
                        "i._id":mongoose.Types.ObjectId("636c4957f05a370be45189ad")
                    }
                ]
            }
        );

        return res.json({ok:true});

    }catch(e){

        return res.json({
            e
        });

    }

}
 
const pedidosPendientes = async(req,res)=>{

    const enviosSimConfirmar = await Ventas.aggregate(
        [
        {$match:{}},
        {$unwind:'$pedidos'},
        {$project:{'pedido':'$pedidos'}},
        {$project:{
            "productos": "$pedido.productos",
            "_id": "$pedido._id",
            "total": "$pedido.total",
            "tienda": "$pedido.tienda",
            "repartidor": "$pedido.repartidor",
            "imagen": "$pedido.imagen",
            "ubicacion":"$pedido.ubicacion",
            "direccion":"$pedido.direccion" ,
            "punto_venta":"$pedido.punto_venta" ,
            "efectivo":"$pedido.efectivo" ,
            "usuario":"$pedido.usuario" ,
            "pagado":"$pedido.pagado" ,
            "preparado":"$pedido.preparado" ,
            "enviado":"$pedido.enviado" ,
            "entregado":"$pedido.entregado" ,
            "confirmado":"$pedido.confirmado",
            "createdAt":"$pedido.createdAt"
        }},
        {
            $match:{
            'tienda':'Capitan Naza',
            'confirmado':false,
            'createdAt':{
                $gte : new Date("2022-07-24T00:00:00+00:00"), 
                $lt :  new Date("2022-07-24T23:59:59+00:00"), 
            }
        }},
        
    ])

    const dateP= new Date();

    const myDate = moment(dateP).format('L');

    const gte = moment(myDate).subtract(10,'hours');
    const lt = moment( myDate).add(13,'hours').add(59,'minutes').add(59,'seconds');

    return res.json({
        gte,
        lt
    });

}

module.exports = {
    test,add,repartidores,pedidosPendientes,actulizarVentaRepartidor
}