

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));

app.get("/", function(req,res)
{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res)
{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/6ac6e12c23";

    const options = {
        method : "POST",
        auth : "edward:ba456b26f0c94abad50f79b510fa6026-us7"
    };

    const request = https.request(url, options, function(response)
    {
        if(response.statusCode == 200)
        {
            res.sendFile(__dirname +"/success.html");
        }
        else {
            res.sendFile(__dirname +"/failure.html");
        }
        response.on("data", function(data){

        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function()
{
    console.log("up and running in 3000");
})


//ba456b26f0c94abad50f79b510fa6026-us7

//6ac6e12c23
