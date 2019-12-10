

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// const firebase = require("firebase/app");

// Add the Firebase products that you want to use
// require("firebase/auth");
// require("firebase/firestore");

'use strict';

const request = require('request');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '041233173d5e4994b3544f2a719798dc';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect';

// facerec Path
app.post('/upload-facerec',
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    var targetPath = path.join(__dirname, "./html/", req.file.path);

    if ( (path.extname(req.file.originalname).toLowerCase() === ".png") || (path.extname(req.file.originalname).toLowerCase() === ".jpg") ) {
      var imageUrl = '/uploads/' + req.file.filename;

      // Request parameters.
      const params = {
          'returnFaceId': 'true',
          'returnFaceLandmarks': 'false',
          'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
              'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
      };

      const options = {
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
          return;
        }
        let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('JSON Response\n');
        console.log(jsonResponse);
      });

      res
      .status(200)
      .send();
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
