/**********************************************************
 * Summer Camp Management System                          *
 * File Name: server.js                                   *
 * Created by: Anthony Kung <hello@anthonykung.com>       *
 * Date: Nov 24, 2019                                     *
 **********************************************************/

// Node.js Modules
const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const Handlebars = require("handlebars");
const exphbs = require('express-handlebars');
const fs = require('fs');

// JSON config Data
const siteData = require('./config/siteData.json');
const siteStyles = require('./config/siteStyles.json');
const siteScripts = require('./config/siteScripts.json');
const siteURLs = require('./config/siteURLs.json');
const siteBottom = require('./config/siteBottom.json');

// Server Variables
const hostname = 'localhost';
var standardPort = process.env.PORT || 80;
var tlsPort = process.env.TLSPORT || 443;

// Express-Handlebars Configurations
app.engine('handlebars', exphbs({
  defaultLayout: 'page',
  partialsDir: path.join(__dirname, 'theme/sections'),
  layoutsDir: path.join(__dirname, 'theme/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'theme/templates'));

// Static Directory
app.use(express.static('html'));

// Root Path
app.get('/', function (req, res, next) {
  res.status(200).render('index', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// 404
app.get('*', function (req, res) {
  res.status(404).render('404', {
      site: siteData,
      styles: siteStyles,
      scripts: siteScripts,
      navItems: siteURLs,
      bottom: siteBottom
  });
});

// Express Server
app.listen(standardPort, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on Standard Port", standardPort);
});

//app.listen(tlsPort, function (err) {
//  if (err) {
//    throw err;
//  }
//  console.log("== Server listening on TLS Port", tlsPort);
//});
