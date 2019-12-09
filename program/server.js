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
const multer = require("multer");

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

const upload = multer({
  dest: "/html/uploads"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

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

// Pricing Path
app.get('/pricing', function (req, res, next) {
  res.status(200).render('pricing', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// About Path
app.get('/about', function (req, res, next) {
  res.status(200).render('about', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// contact Path
app.get('/contact', function (req, res, next) {
  res.status(200).render('contact', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// login Path
app.get('/login', function (req, res, next) {
  res.status(200).render('login', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// register Path
app.get('/register', function (req, res, next) {
  res.status(200).render('register', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// facerec Path
app.get('/facerec', function (req, res, next) {
  res.status(200).render('facerec', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// nfc Path
app.get('/nfc', function (req, res, next) {
  res.status(200).render('nfc', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// pay Path
app.get('/pay', function (req, res, next) {
  res.status(200).render('pay', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// ptt Path
app.get('/ptt', function (req, res, next) {
  res.status(200).render('ptt', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// beacon Path
app.get('/beacon', function (req, res, next) {
  res.status(200).render('beacon', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// campers Path
app.get('/campers', function (req, res, next) {
  res.status(200).render('campers', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// staffs Path
app.get('/staffs', function (req, res, next) {
  res.status(200).render('staffs', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// schedule Path
app.get('/schedule', function (req, res, next) {
  res.status(200).render('schedule', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// responders Path
app.get('/responders', function (req, res, next) {
  res.status(200).render('responders', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// profile Path
app.get('/profile', function (req, res, next) {
  res.status(200).render('profile', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// dashboard Path
app.get('/dashboard', function (req, res, next) {
  res.status(200).render('dashboard', {
    site: siteData,
    styles: siteStyles,
    scripts: siteScripts,
    navItems: siteURLs,
    bottom: siteBottom
  });
});

// upload post Path
app.post('/upload',
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else if (path.extname(req.file.originalname).toLowerCase() === ".jpeg") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png and .jpg files are allowed!");
      });
    }
  }
);

// upload get path
app.get('/upload', function (req, res) {
  res.status(404).render('upload', {
      site: siteData,
      styles: siteStyles,
      scripts: siteScripts,
      navItems: siteURLs,
      bottom: siteBottom
  });
});

// upload get path
app.get('/uploads/:resources', (req, res) => {
  var resources = req.params.resources.toLowerCase();
  res.sendFile(path.join(__dirname, "./uploads/", resources));
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
