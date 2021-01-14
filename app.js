const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;


    console.log(email + firstName + lastName);

    request({
        url: 'https://us7.api.mailchimp.com/3.0/lists/2a7ae49a9c/members',
        json: {
            'email_address': email,
            'status': 'subscribed',
            'merge_fields': {
                'FNAME': firstName,
                'LNAME': lastName
            }
        },
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'apikey e87516484389ff5ea081440b4945a5bd-us7'
        }
    }, function(error, response, body) {
        if (response.statusCode === 200) {
            console.log(response.statusCode, '>>>>> USER ADDED TO MAILCHIMP');
            res.sendFile(__dirname + "/success.html");

        } else {
            res.sendFile(__dirname + "/failure.html");



        }
    });



    /* const data = {
         members: [{
             email_address: email,
             status: "subscribed",
             merge_fields: {
                 FNAME: firstName,
                 LNAME: lastName
             }
         }]
     }

     const jsonData = JSON.stringify(data);

     const url = "https://us7.api.mailchimp.com/3.0/lists/2a7ae49a9c"

     const option = {
         methode: "POST",
         auth: "yaw:e87516484389ff5ea081440b4945a5bd-us7"
     }*/



    /*  const request = https.request(url, option, function(response) {

          if (response.statusCode === 200) {

              res.send("Success");

          } else {
              res.send("fail");
          }

          response.on("data", function(data) {

              console.log(JSON.parse(data));

          })



      })

      console.log("this json data : " + jsonData);
      request.write(jsonData);
      request.end();*/
});

app.post("/failure", function(req, res) {

    res.redirect("/");

})



app.listen(process.env.PORT || 3000, function() {

    console.log("my server is up");

})