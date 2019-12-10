$(function() {
  var params = {
      // Request parameters
  };

  $.ajax({
      url: "https://westus.api.cognitive.microsoft.com/face/v1.0/identify?" + $.param(params),
      beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","041233173d5e4994b3544f2a719798dc");
      },
      type: "POST",
      // Request body
      data: '{
        "largePersonGroupId": "sample_group",
        "faceIds": [
          "c5c24a82-6845-4031-9d5d-978df9175426",
          "65d083d4-9447-47d1-af30-b626144bf0fb"
        ],
        "maxNumOfCandidatesReturned": 1,
        "confidenceThreshold": 0.5
      }',
  })
  .done(function(data) {
      alert("success");
  })
  .fail(function() {
      alert("error");
  });
});
