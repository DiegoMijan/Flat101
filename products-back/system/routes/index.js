'use strict';
const express = require( 'express' );
const path = require( 'path' );
const fs = require( 'fs' );
const pluralize = require('pluralize');
const router = express.Router();
const packageJson = require( '../../package.json' ),
    routesPath = path.resolve(`${__dirname}/../../src/routes`),
    PATHS = fs.readdirSync(routesPath),
    moduleMapper = [];

// Mapear rutas
PATHS.forEach( ( module ) => {
    if( module !== 'app.js' ) {
        const name = module.split( '.' )[ 0 ];
        router.use( `/${pluralize.plural( name )}`, require( path.resolve( routesPath, module ) ) );
        moduleMapper.push( {
            'Modulo': name,
            'Rutas': `/${pluralize.plural( name )}`
        } );
    }
} );

console.table( moduleMapper );

router.get( '/', ( req, res ) => {
    res.json( { 'status': true, 'message': `Bienvenido a ${packageJson.name} V ${packageJson.version}` } );
} );

router.use( '*', ( req, res, next ) => {
    const error = new Error( 'Recurso no encontrado' );
    error.statusCode = 404;
    next( error );
} );

module.exports = router;