const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
    })

app.post("/", function(req, res) {
  var query = req.body.cityname;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=eea8047293fe8bdde0faced61d8386f3&units=metric";

  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send()
    })
  })
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
