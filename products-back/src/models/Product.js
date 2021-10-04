const { Double } = require('bson');
const mongoose = require('mongoose');
const {Schema} = require('mongoose');

class Product{
    initSchema(){
        const ProductSchema = new Schema({
            name: {
                'type': String,
                'required': true
            },
            description: {
                'type': String
            },
            price:{
                'type': Number,
                'required': true
            },
            stock: {
                'type': Boolean,
                'required': true
            },
            img: {
                'type': String
            },
            created_at: {
                'type': Date 
            }

        });

        ProductSchema.statics.createProduct = function(data){
            try{
                data.created_at = new Date();
                const productItem = this.create(data);
                if(!productItem){
                    console.log("ERROR no se crea el elemento");
                    return false;
                }
                return true;
            }catch(error){
                throw error;
            }
        };

        ProductSchema.statics.findAllProducts = function(){
            return this.find().sort({'created_at':'desc'});
        };

        try {
            mongoose.model( 'Product', ProductSchema );
        } catch ( e ) {
            console.log("Error en el esquema de productos", e.message);
        }
    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'Product' );
    }
}


module.exports = { Product }