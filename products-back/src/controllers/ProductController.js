const { ProductService } = require( './../services/ProductService' );
const { Product } = require('../models/Product');
const autoBind = require( 'auto-bind' );
const productService = new ProductService(new Product().getInstance())

class ProductController{
    constructor(service){
        this.service = service;
        autoBind(this);
    }

    async findAllProducts(req, res, next){
        try{
            const response = await this.service.findAllProducts();
            await res.status(200).json(response);
        } catch (e){
            next(e);
        }
    }

    async createProduct(req, res, next){
        try{
            const registeredProductData = await this.service.createProduct(req.body);
            await res.status(200).json(registeredProductData);
        }catch (e){
            next(e);
        }
    }
}

module.exports = new ProductController( productService );