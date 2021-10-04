'use strict';
const express = require('express');
const apiRoutes = require( '../system/routes' );

module.exports.setRoutes = ( app ) => {

    app.get('/', function (req, res) {
        res.send('Welcome to the easy farm.');
    });

    app.use( '/api', apiRoutes );

     app.use( '/*', ( req, res ) => {
        const error = new Error( 'Requested path does not exist.' );

        error.statusCode = 404;
        res.status( error.statusCode ).json( 'Error' );
    } );
};