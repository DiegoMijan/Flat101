'use strict';
const autoBind = require( 'auto-bind' );

class ProductService{
    constructor(model){
        this.model = model;
        autoBind(this);
    }

    async findAllProducts(){
        return this.model.findAllProducts();
    }

    async createProduct(data){
        try{
            const product = await this.model.createProduct(data);
            if(!product){
                const error = new Error("Error al crear el producto");
                error.statusCode = 422;
                throw error;
            }
            return this.findAllProducts();
        }catch(error){
            throw error;
        }
    }

}

module.exports = { ProductService };