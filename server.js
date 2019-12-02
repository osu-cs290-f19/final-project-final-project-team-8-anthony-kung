/**********************************************************
 * Summer Camp Management System                          *
 * File Name: server.js                                   *
 * Created by: Anthony Kung <hello@anthonykung.com>       *
 * Date: Nov 24, 2019                                     *
 **********************************************************/


const http = require('http');
const url = require('url');
const express = require('express');
const app = express();

const hostname = 'localhost';
const port = 80;

app.use(express.static('html'));

app.get('/', function (req, res) {
  res.send('Hello World');
});
 
app.listen(port, () => console.log('Example app listening on port ${port}!'));
