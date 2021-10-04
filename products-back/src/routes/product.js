'use strict';
const ProductController = require( '../controllers/ProductController' );
const express = require( 'express' ),
    router = express.Router();

router.get( '/list', ProductController.findAllProducts);
router.post( '/create', ProductController.createProduct);

module.exports = router;