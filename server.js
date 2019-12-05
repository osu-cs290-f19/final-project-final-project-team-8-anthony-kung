/**********************************************************
 * Summer Camp Management System                          *
 * File Name: server.js                                   *
 * Created by: Anthony Kung <hello@anthonykung.com>       *
 * Date: Nov 24, 2019                                     *
 **********************************************************/

const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const Handlebars = require("handlebars");

const hostname = 'localhost';
var port = 80;

app.get('/', function (req, res) {
  app.status(200).send(__dirname + '/html/index.html');
});

app.use(express.static('html'));

app.get('*', function (req, res) {
  app.send('404');
});

app.listen(port, () => console.log('SCMS listening on port ' + port + '!'));
