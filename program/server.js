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
// const vision = require('@google-cloud/vision');
const admin = require('firebase-admin');

// JSON config Data
const siteData = require('./config/siteData.json');
const siteStyles = require('./config/siteStyles.json');
const siteScripts = require('./config/siteScripts.json');
const siteURLs = require('./config/siteURLs.json');
const siteBottom = require('./config/siteBottom.json');
const errorMessage = require('./config/errorMessages.json');

// const database = require('./database.js');

// Server Variables
const hostname = 'localhost';
var standardPort = process.env.PORT || 80;
var tlsPort = process.env.TLSPORT || 443;

const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://scms:7NKXJouDyrfm80pb@scms-cluster-ixu1e.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://summer-camp-management-system.firebaseio.com'
});

'use strict';

const request = require('request');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '041233173d5e4994b3544f2a719798dc';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect';
const uriBase2 = 'https://westus.api.cognitive.microsoft.com/face/v1.0/verify';

var now = new Date();
var str = (now.getMonth() + 1).toString() + "-" + now.getDate().toString() + "-" + now.getFullYear().toString() + "-" + now.getHours().toString() + ":" + now.getMinutes().toString() + ":" + now.getSeconds().toString() + ":" + now.getMilliseconds().toString();
var fname = str.replace(' ', '-').toLowerCase();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './html/uploads');
  },
  filename: function (req, file, cb) {

    // if (req.body.username) {
      // var fname = req.body.username.replace(' ', '-').toLowerCase();
      // cb(null, fname + path.extname(file.originalname))
    // }
    // else {
<<<<<<< HEAD
=======
      var fname = str.replace(' ', '-').toLowerCase();
>>>>>>> 75b71daf6616a88135e2498e989d8b51e13dcd7a
      cb(null, file.filename + fname + path.extname(file.originalname))
    // }
  }
})

var upload = multer({ storage: storage })

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

// MongoDB
// app.use(function(req, res, next){
//     req.db = db;
//     next();
// });

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

var currentHostName = 'http://162.255.87.207';
var uploadedRes;
var jsonResponse = [];

// facerec Path
app.post('/upload-facerec',
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res, next) => {
    const tempPath = req.file.path;
    var fileName = req.file.filename + fname + path.extname(req.file.originalname);
    var targetPath = path.join(__dirname, "./html/", fileName);

    if ( (path.extname(req.file.originalname).toLowerCase() === ".png") || (path.extname(req.file.originalname).toLowerCase() === ".jpg") || (path.extname(req.file.originalname).toLowerCase() === ".jpeg") ) {
      var imageUrl = currentHostName + '/uploads/' + fileName;

      // Request parameters.
      var params = {
          'returnFaceId': 'true'
      };

      console.log("imageUrl", imageUrl);

      var options = {
          uri: uriBase,
          qs: params,
          body: '{"url": ' + '"' + imageUrl + '"}',
          headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key' : subscriptionKey
          }
      };

      request.post(options, (error, response, body) => {
        if (error) {
          console.log('Error: ', error);
          res.status(500).render('500', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom
          });
          return;
        }
        console.log("body", body);
        uploadedRes = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('Upload Response\n');
        console.log(uploadedRes);

        if (!uploadedRes.faceId) {
          res.status(500).render('500', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom
          });
          return;
          next();
        }

        var campersDB = db.collection('campers').find({});
        var campersData;

        campersDB.toArray(function (err, campersData) {
          if (err && !uploadedRes) {
            res.status(500).render('500', {
              site: siteData,
              styles: siteStyles,
              scripts: siteScripts,
              navItems: siteURLs,
              bottom: siteBottom
            });
          } else {
            /*
             * Use documents in peopleDocs to construct arguments
             * to our view template and then use res.render() to
             * render the page with the template and its arguments.
             */
             // console.log(campersData);
             // for (var i = 0; i < campersData.length; i++) {
             //   // Request parameters.
             //   const params = {
             //       'returnFaceId': 'true'
             //   };
             //
             //   const options = {
             //       uri: uriBase,
             //       qs: params,
             //       body: '{"url": ' + '"' + currentHostName + campersData[i].face + '"}',
             //       headers: {
             //           'Content-Type': 'application/json',
             //           'Ocp-Apim-Subscription-Key' : subscriptionKey
             //       }
             //   };
             //
             //   request.post(options, (error, response, body) => {
             //     if (error) {
             //       console.log('Error: ', error);
             //       return;
             //     }
             //     jsonResponse.push(JSON.stringify(JSON.parse(body), null, '  '));
             //     console.log('JSON Response\n');
             //     console.log(jsonResponse);
             //   });
             // }

             var result = [];

             for (var i = 0; i < campersData.length; i++) {

               // Request parameters.
               const params2 = {};

               console.log("\nuploadedRes");
               console.log(uploadedRes);
               console.log("\nuploadedRes.faceId");
               console.log(uploadedRes.faceId);
               console.log("\ncampersData[i].faceId");
               console.log(campersData[i].faceId);

               const options2 = {
                   uri: uriBase2,
                   qs: '{}',
                   body: {
                     "faceId1": uploadedRes.faceId,
                     "faceId2": campersData[i].faceId
                   },
                   headers: {
                       'Content-Type': 'application/json',
                       'Ocp-Apim-Subscription-Key' : subscriptionKey
                   }
                   // json: true
               };

               request.post(options2, (error, response, body) => {
                 if (error) {
                   console.log('Error: ', error);
                   return;
                 }
                 result.push(JSON.stringify(JSON.parse(body), null, '  '));
                 console.log('Result Response\n');
                 console.log(result);

                 var highestI = 0;

                 for (var i = 0; i < result.length; i++) {
                   if ( (result.isIdentical === true) && (result.confidence >= highestI) ) {
                     highestI = i;
                     return;
                   }
                   else {
                     res.status(404).send('Face Not Found');
                     return;
                   }
                 }

                 res.redirect(301, '/campers/' + campersData[highestI]);

               });

               // while (result[i]) {
               //
               // }

             }

             // var highestI = 0;
             //
             // for (var i = 0; i < result.length; i++) {
             //   if ( (result.isIdentical === true) && (result.confidence >= highestI) ) {
             //     highestI = i;
             //   }
             //   else {
             //     res.status(404).send('Face Not Found');
             //   }
             // }
             //
             // res.redirect(301, '/campers/' + campersData[highestI]);

           }
         });

      });

      // var campersDB = db.collection('campers').find({});
      // var campersData;
      //
      // campersDB.toArray(function (err, campersData) {
      //   if (err) {
      //     res.status(500).render('500', {
      //       site: siteData,
      //       styles: siteStyles,
      //       scripts: siteScripts,
      //       navItems: siteURLs,
      //       bottom: siteBottom
      //     });
      //   } else {
      //     /*
      //      * Use documents in peopleDocs to construct arguments
      //      * to our view template and then use res.render() to
      //      * render the page with the template and its arguments.
      //      */
      //      // console.log(campersData);
      //      // for (var i = 0; i < campersData.length; i++) {
      //      //   // Request parameters.
      //      //   const params = {
      //      //       'returnFaceId': 'true'
      //      //   };
      //      //
      //      //   const options = {
      //      //       uri: uriBase,
      //      //       qs: params,
      //      //       body: '{"url": ' + '"' + currentHostName + campersData[i].face + '"}',
      //      //       headers: {
      //      //           'Content-Type': 'application/json',
      //      //           'Ocp-Apim-Subscription-Key' : subscriptionKey
      //      //       }
      //      //   };
      //      //
      //      //   request.post(options, (error, response, body) => {
      //      //     if (error) {
      //      //       console.log('Error: ', error);
      //      //       return;
      //      //     }
      //      //     jsonResponse.push(JSON.stringify(JSON.parse(body), null, '  '));
      //      //     console.log('JSON Response\n');
      //      //     console.log(jsonResponse);
      //      //   });
      //      // }
      //
      //      var result = [];
      //
      //      for (var i = 0; i < campersData.length; i++) {
      //
      //        // Request parameters.
      //        // const params = {};
      //
      //        const options = {
      //            uri: uriBase2,
      //            // qs: params,
      //            body: {
      //              "faceId1": uploadedRes.faceId,
      //              "faceId2": campersData[i].faceId
      //            },
      //            headers: {
      //                'Content-Type': 'application/json',
      //                'Ocp-Apim-Subscription-Key' : subscriptionKey
      //            }
      //        };
      //
      //        request.post(options, (error, response, body) => {
      //          if (error) {
      //            console.log('Error: ', error);
      //            return;
      //          }
      //          result.push(JSON.stringify(JSON.parse(body), null, '  '));
      //          console.log('Result Response\n');
      //          console.log(result);
      //
      //          var highestI = 0;
      //
      //          for (var i = 0; i < result.length; i++) {
      //            if ( (result.isIdentical === true) && (result.confidence >= highestI) ) {
      //              highestI = i;
      //            }
      //            else {
      //              res.status(404).send('Face Not Found');
      //            }
      //          }
      //
      //          res.redirect(301, '/campers/' + campersData[highestI]);
      //
      //        });
      //
      //        // while (result[i]) {
      //        //
      //        // }
      //
      //      }
      //
      //      // var highestI = 0;
      //      //
      //      // for (var i = 0; i < result.length; i++) {
      //      //   if ( (result.isIdentical === true) && (result.confidence >= highestI) ) {
      //      //     highestI = i;
      //      //   }
      //      //   else {
      //      //     res.status(404).send('Face Not Found');
      //      //   }
      //      // }
      //      //
      //      // res.redirect(301, '/campers/' + campersData[highestI]);
      //
      //    }
      //  });

    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(400)
          .render('400', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom,
            errorMessage: errorMessage[1]
          });
      });
    }
  }
);

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


// app.use('/campers', database);
// var campersData = require('./config/campersData.json');
// campers Path
// app.get('/campers', function (req, res, next) {
  // res.status(200).render('campers', {
//     site: siteData,
//     styles: siteStyles,
//     scripts: siteScripts,
//     navItems: siteURLs,
//     bottom: siteBottom,
//     campers: campersData
//   });
// });

// campers Path
app.get('/campers', function (req, res, next) {

  var campersDB = db.collection('campers').find({});
  var campersData;

  campersDB.toArray(function (err, campersData) {
    if (err) {
      res.status(500).render('500', {
        site: siteData,
        styles: siteStyles,
        scripts: siteScripts,
        navItems: siteURLs,
        bottom: siteBottom
      });
    } else {
      /*
       * Use documents in peopleDocs to construct arguments
       * to our view template and then use res.render() to
       * render the page with the template and its arguments.
       */
       // console.log(campersData);

       res.status(200).render('campers', {
         site: siteData,
         styles: siteStyles,
         scripts: siteScripts,
         navItems: siteURLs,
         bottom: siteBottom,
         campers: campersData
       });
    }
  });
});

// campers Path
app.get('/campers/:userName', function (req, res, next) {
  var userName = req.params.userName.replace(' ', '-').toLowerCase();
  var campersDB = db.collection('campers').find({});
  var campersData;

  campersDB.toArray(function (err, campersData) {
    if (err) {
      res.status(500).render('500', {
        site: siteData,
        styles: siteStyles,
        scripts: siteScripts,
        navItems: siteURLs,
        bottom: siteBottom
      });
    }
    else {
     /*
      * Use documents in peopleDocs to construct arguments
      * to our view template and then use res.render() to
      * render the page with the template and its arguments.
      */
      // console.log(campersData);
      // console.log(campersData.length);
      for (var i = 0; i < campersData.length; i++) {
        // console.log(campersData[i].name.replace(' ', '-').toLowerCase());
        if (campersData[i].name.replace(' ', '-').toLowerCase() === userName) {
          res.status(200).render('camper', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom,
            campers: campersData[i]
          });
          return;
        }
        else if (i === campersData.length - 1) {
          next();
        }
      }
    }
  });
});

// staffs Path
app.get('/staffs', function (req, res, next) {
  var staffsDB = db.collection('staffs').find({});
  var staffsData;

  staffsDB.toArray(function (err, staffsData) {
    if (err) {
      res.status(500).render('500', {
        site: siteData,
        styles: siteStyles,
        scripts: siteScripts,
        navItems: siteURLs,
        bottom: siteBottom
      });
    } else {
      /*
       * Use documents in peopleDocs to construct arguments
       * to our view template and then use res.render() to
       * render the page with the template and its arguments.
       */
       // console.log(campersData);

       res.status(200).render('staffs', {
         site: siteData,
         styles: siteStyles,
         scripts: siteScripts,
         navItems: siteURLs,
         bottom: siteBottom,
         staffs: staffsData
       });
    }
  });
});

// campers Path
app.get('/staffs/:userName', function (req, res, next) {
  var userName = req.params.userName.replace(' ', '-').toLowerCase();
  var staffsDB = db.collection('staffs').find({});
  var staffsData;

  staffsDB.toArray(function (err, staffsData) {
    if (err) {
      res.status(500).render('500', {
        site: siteData,
        styles: siteStyles,
        scripts: siteScripts,
        navItems: siteURLs,
        bottom: siteBottom
      });
    }
    else {
     /*
      * Use documents in peopleDocs to construct arguments
      * to our view template and then use res.render() to
      * render the page with the template and its arguments.
      */
      // console.log(campersData);
      // console.log(campersData.length);
      for (var i = 0; i < staffsData.length; i++) {
        // console.log(campersData[i].name.replace(' ', '-').toLowerCase());
        if (staffsData[i].name.replace(' ', '-').toLowerCase() === userName) {
          res.status(200).render('staff', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom,
            staffs: staffsData[i]
          });
          return;
        }
        else if (i === staffsData.length - 1) {
          next();
        }
      }
    }
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

  var respondersDB = db.collection('responders').find({});
  var respondersData;

  respondersDB.toArray(function (err, respondersData) {
    if (err) {
      res.status(500).render('500', {
        site: siteData,
        styles: siteStyles,
        scripts: siteScripts,
        navItems: siteURLs,
        bottom: siteBottom
      });
    } else {
      /*
       * Use documents in peopleDocs to construct arguments
       * to our view template and then use res.render() to
       * render the page with the template and its arguments.
       */
       // console.log(campersData);

       res.status(200).render('responders', {
         site: siteData,
         styles: siteStyles,
         scripts: siteScripts,
         navItems: siteURLs,
         bottom: siteBottom,
         responders: respondersData
       });
    }
  });
});

// campers Path
app.get('/responders/:userName', function (req, res, next) {
  var userName = req.params.userName.replace(' ', '-').toLowerCase();
  var respondersDB = db.collection('responders').find({});
  var respondersData;

  respondersDB.toArray(function (err, respondersData) {
    if (err) {
      res.status(500).render('500', {
        site: siteData,
        styles: siteStyles,
        scripts: siteScripts,
        navItems: siteURLs,
        bottom: siteBottom
      });
    }
    else {
     /*
      * Use documents in peopleDocs to construct arguments
      * to our view template and then use res.render() to
      * render the page with the template and its arguments.
      */
      // console.log(campersData);
      // console.log(campersData.length);
      for (var i = 0; i < respondersData.length; i++) {
        // console.log(campersData[i].name.replace(' ', '-').toLowerCase());
        if (respondersData[i].name.replace(' ', '-').toLowerCase() === userName) {
          res.status(200).render('responder', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom,
            responders: respondersData[i]
          });
          return;
        }
        else if (i === respondersData.length - 1) {
          next();
        }
      }
    }
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


const handleError = (err, res) => {
  res
    .status(500)
    .render('500', {
      site: siteData,
      styles: siteStyles,
      scripts: siteScripts,
      navItems: siteURLs,
      bottom: siteBottom
    });
};

// const upload = multer({
  // dest: "uploads/"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });

// upload post Path
app.post('/upload-camper',
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    var fileName = req.file.filename + fname + path.extname(req.file.originalname);
    var targetPath = path.join(__dirname, "./html/", fileName);

    if ( (path.extname(req.file.originalname).toLowerCase() === ".png") || (path.extname(req.file.originalname).toLowerCase() === ".jpg") || (path.extname(req.file.originalname).toLowerCase() === ".jpeg")  ) {

      // Request parameters.
      const params = {
          'returnFaceId': 'true'
      };

      const options = {
          uri: uriBase,
          qs: params,
          body: '{"url": ' + '"' + currentHostName + '/uploads/' + fileName + '"}',
          headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key' : subscriptionKey
          }
      };

      var jsonResponse;

      request.post(options, (error, response, body) => {
        if (error) {
          console.log('Error: ', error);
          return;
        }
        jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('Upload Response\n');
        console.log(jsonResponse);
      // });

      // console.log(jsonResponse);

      // while (!jsonResponse) {
      //   if (jsonResponse)
      //     break;
      // }

        db.collection('campers').insertOne({
        	name: req.body.username,
          alert: req.body.voiceAlert,
          medical: req.body.userMedical,
          medications: req.body.userMedications,
          class: req.body.userClass,
          supervisor: req.body.userSup,
    	    age: req.body.userAge,
          guardian: req.body.userGuardian,
          contact: req.body.userContact,
          face: '/uploads/' + req.file.filename,
          faceId: jsonResponse.faceId
        });

      });

      res
      .status(200)
      .render('uploaded', {
        site: siteData,
        styles: siteStyles,
        scripts: siteScripts,
        navItems: siteURLs,
        bottom: siteBottom
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(400)
          .render('400', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom,
            errorMessage: errorMessage[1]
          });
      });
    }
  }
);

// upload post Path
app.post('/upload-staff',
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    var targetPath = path.join(__dirname, "./html/", req.file.path);

    if ( (path.extname(req.file.originalname).toLowerCase() === ".png") || (path.extname(req.file.originalname).toLowerCase() === ".jpg") || (path.extname(req.file.originalname).toLowerCase() === ".jpeg") ) {

      // Request parameters.
      const params = {
          'returnFaceId': 'true'
      };

      const options = {
          uri: uriBase,
          qs: params,
          body: '{"url": ' + '"' + currentHostName + '/uploads/' + req.file.filename + '"}',
          headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key' : subscriptionKey
          }
      };

      var jsonResponse;

      request.post(options, (error, response, body) => {
        if (error) {
          console.log('Error: ', error);
          return;
        }
        jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('Upload Response\n');
        console.log(jsonResponse);
      // });

      // console.log(jsonResponse);

      // while (!jsonResponse) {
      //   if (jsonResponse)
      //     break;
      // }

        db.collection('staffs').insertOne({
        	name: req.body.username,
          alert: req.body.voiceAlert,
          medical: req.body.userMedical,
          medications: req.body.userMedications,
          class: req.body.userClass,
          supervisor: req.body.userSup,
    	    age: req.body.userAge,
          guardian: req.body.userGuardian,
          contact: req.body.userContact,
          face: '/uploads/' + req.file.filename,
          faceId: jsonResponse.faceId
        });

      });

      res
      .status(200)
      .render('uploaded', {
        site: siteData,
        styles: siteStyles,
        scripts: siteScripts,
        navItems: siteURLs,
        bottom: siteBottom
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(400)
          .render('400', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom,
            errorMessage: errorMessage[1]
          });
      });
    }
  }
);

// upload-fr post Path
app.post('/upload-fr',
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    var targetPath = path.join(__dirname, "./html/", req.file.path);

    if ( (path.extname(req.file.originalname).toLowerCase() === ".png") || (path.extname(req.file.originalname).toLowerCase() === ".jpg") || (path.extname(req.file.originalname).toLowerCase() === ".jpeg")  ) {

      // Request parameters.
      const params = {
          'returnFaceId': 'true'
      };

      const options = {
          uri: uriBase,
          qs: params,
          body: '{"url": ' + '"' + currentHostName + '/uploads/' + req.file.filename + '"}',
          headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key' : subscriptionKey
          }
      };

      var jsonResponse;

      request.post(options, (error, response, body) => {
        if (error) {
          console.log('Error: ', error);
          return;
        }
        jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('Upload Response\n');
        console.log(jsonResponse);
      // });

      // console.log(jsonResponse);

      // while (!jsonResponse) {
      //   if (jsonResponse)
      //     break;
      // }

        db.collection('responders').insertOne({
        	name: req.body.username,
          alert: req.body.voiceAlert,
          medical: req.body.userMedical,
          medications: req.body.userMedications,
          class: req.body.userClass,
          supervisor: req.body.userSup,
    	    age: req.body.userAge,
          guardian: req.body.userGuardian,
          contact: req.body.userContact,
          face: '/uploads/' + req.file.filename,
          faceId: jsonResponse.faceId
        });

      });

      res
      .status(200)
      .render('uploaded', {
        site: siteData,
        styles: siteStyles,
        scripts: siteScripts,
        navItems: siteURLs,
        bottom: siteBottom
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(400)
          .render('400', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom,
            errorMessage: errorMessage[1]
          });
      });
    }
  }
);

// upload post Path
app.post('/upload',
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    var targetPath = path.join(__dirname, "./html/", req.file.path);


    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      // fs.rename(tempPath, targetPath, err => {
        // if (err) return handleError(err, res);

        res
          .status(200)
          .render('uploaded', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom
          });
      // });

      // db.collection('campers').save(req.body, (err, result) => {
      //   if (err) return console.log(err)
      //
      //   console.log('saved to database')
      // })
      // db.collection('campers').find().toArray(function(err, results) {
      //
      // }

    } else if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
      // fs.rename(tempPath, targetPath, err => {
        // if (err) return handleError(err, res);

        res
          .status(200)
          .render('uploaded', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom
          });
      // });
    } else if (path.extname(req.file.originalname).toLowerCase() === ".jpeg") {
      // fs.rename(tempPath, targetPath, err => {
        // if (err) return handleError(err, res);

        res
          .status(200)
          .render('uploaded', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom
          });
      // });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(400)
          .render('400', {
            site: siteData,
            styles: siteStyles,
            scripts: siteScripts,
            navItems: siteURLs,
            bottom: siteBottom,
            errorMessage: errorMessage[1]
          });
      });
    }
  }
);

// upload get path
app.get('/upload', function (req, res) {
  res.status(200).render('upload', {
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
  res.status(200).sendFile(path.join(__dirname, "./uploads/", resources));
});

client.connect(err => {
  const collection = client.db("scms").collection("campers");
  // perform actions on the collection object


  client.close();
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

MongoClient.connect(uri, function (err, client) {
  if (err) {
    throw err;
  }
  db = mongoDBDatabase = client.db('scms');
  // Express Server
  app.listen(standardPort, function (err) {
    if (err) {
      throw err;
    }
    console.log("== Server listening on Standard Port", standardPort);

    // console.log(db.collection('campers').find({}));
  });
});

// // Express Server
// app.listen(standardPort, function (err) {
//   if (err) {
//     throw err;
//   }
//   console.log("== Server listening on Standard Port", standardPort);
// });

//app.listen(tlsPort, function (err) {
//  if (err) {
//    throw err;
//  }
//  console.log("== Server listening on TLS Port", tlsPort);
//});
