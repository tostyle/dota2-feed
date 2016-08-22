'use strict';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import express from 'express';
import exphbs from 'express-handlebars';
import AppContainer from './app/app';
import HelloServer from './app/componenets/helloServer';


import path from 'path'

import serverRoute from './app/serverRoute';
// console.log(serverRoute);


// console.log(reactHtml);
// var react = require('react')
// var express = require('express');
// var exphbs  = require('express-handlebars');
// require('./public/bundle');

var app = new express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(serverRoute);
app.use(express.static('app'));
app.use(express.static('public'));
app.get('/',function(req,res){
  var reactHtml = ReactDOMServer.renderToString(<HelloServer/>);
  res.render('home',{ content : reactHtml });

});
app.get('/client',function(req,res){
     res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
