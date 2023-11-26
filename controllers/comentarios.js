const ListaProductos = require('../models/lista_productos');
const Comentario = require('../models/comentarios');
const mongoose = require('mongoose');

var controller = {

    eliminarComentario:async(req,res)=>{

        try {
        
            await ListaProductos.findOneAndUpdate(
                {
                    "_id":mongoose.Types.ObjectId(req.body.uid),
                },
                {
                    $set:{'productos.$[i].comentarios.$[j].eliminado':true}
                },
                {
                    arrayFilters:[
                        {
                            "i._id":mongoose.Types.ObjectId(req.body.producto_uid),
                        },{
                            "j._id":mongoose.Types.ObjectId(req.body.comentario_uid),
                        }
                    ]
                }
            );
        
            return res.json({ok:true});
    
        } catch (error) {
    
            return res.json({
                error
            });
    
        }

    },noDestacarComentario:async(req,res)=>{

        try {
        
            await ListaProductos.findOneAndUpdate(
                {
                    "_id":mongoose.Types.ObjectId(req.body.uid),
                },
                {
                    $set:{'productos.$[i].comentarios.$[j].destacado':false}
                },
                {
                    arrayFilters:[
                        {
                            "i._id":mongoose.Types.ObjectId(req.body.producto_uid),
                        },{
                            "j._id":mongoose.Types.ObjectId(req.body.comentario_uid),
                        }
                    ]
                }
            );
        
            return res.json({ok:true});
    
        } catch (error) {
            
    
            return res.json({
                error
            });
    
        }

    },
    destacarComentario:async(req,res)=>{

        try {
        
            await ListaProductos.findOneAndUpdate(
                {
                    "_id":mongoose.Types.ObjectId(req.body.uid),
                },
                {
                    $set:{'productos.$[i].comentarios.$[j].destacado':true}
                },
                {
                    arrayFilters:[
                        {
                            "i._id":mongoose.Types.ObjectId(req.body.producto_uid),
                        },{
                            "j._id":mongoose.Types.ObjectId(req.body.comentario_uid),
                        }
                    ]
                }
            );
        
            return res.json({ok:true});
    
        } catch (error) {
            
    
            return res.json({
                error
            });
    
        }

    },
    nuevoComentario:async(req,res)=>{

        const comentario = new Comentario(req.body);
    
        comentario.eliminado = false;
    
        try {
            
            await ListaProductos.findOneAndUpdate(
                {
                    '_id':req.body.uid,'productos._id':mongoose.Types.ObjectId(req.body.producto_uid)
                },
                {
                    $push:{'productos.$.comentarios':comentario}
                }
            );
        
            return res.json({comentario});
    
        } catch (error) {
            
            return res.json({
                error
            });
    
        }

    },
    reacionComentario:async(req,res)=>{

        try {
        
            await ListaProductos.updateMany(
                
                {
                    "_id":mongoose.Types.ObjectId(req.body.uid),
                },{
                    $inc:{
                        'productos.$[i].comentarios.$[j].reacciones':1,
                    }
                },
                {
                    arrayFilters:[
                        {
                            "i._id":mongoose.Types.ObjectId(req.body.producto_uid),
                        },{
                            "j._id":mongoose.Types.ObjectId(req.body.comentario_uid),
                        }
                    ]
                }
                
            )
    
    
            return res.json({
                ok:true
            });
    
        } catch (error) {
            
            return res.json({
                true:false
            });
    
        }

    },
    modificarComentario:async(req,res)=>{

        const { precio,comentario,encabezado } = req.body;

        try {
        
            await ListaProductos.updateMany(
                {
                    "_id":mongoose.Types.ObjectId(req.body.uid),
                },
                {
                    $set:{
                        'productos.$[i].comentarios.$[j].calificacion':precio,
                        'productos.$[i].comentarios.$[j].comentario':comentario,
                        'productos.$[i].comentarios.$[j].encabezado':encabezado,
                    }
                },
                {
                    arrayFilters:[
                        {
                            "i._id":mongoose.Types.ObjectId(req.body.producto_uid),
                        },{
                            "j._id":mongoose.Types.ObjectId(req.body.comentario_uid),
                        }
                    ]
                }
            );
    
            return res.json({
                ok:true
            });
        
        } catch (error) {
    
            return res.json({
                ok:false,
            });
    
        }

    },
    modificarAniversario:async(req,res)=>{

        const { precio,comentario,encabezado } = req.body;

        try {
        
            await ListaProductos.updateMany(
                {
                    "_id":mongoose.Types.ObjectId(req.body.uid),
                },
                {
                    $set:{
                        'productos.$[i].comentarios.$[j].calificacion':precio,
                        'productos.$[i].comentarios.$[j].comentario':comentario,
                        'productos.$[i].comentarios.$[j].encabezado':encabezado,
                    }
                },
                {
                    arrayFilters:[
                        {
                            "i._id":mongoose.Types.ObjectId(req.body.producto_uid),
                        },{
                            "j._id":mongoose.Types.ObjectId(req.body.comentario_uid),
                        }
                    ]
                }
            );
    
            return res.json({
                ok:true
            });
        
        } catch (error) {
    
            return res.json({
                ok:false,
            });
    
        }

    }

}

module.exports = controller;