const express = require("express");
const https = require("https");
const app = express();

app.use(express.urlencoded());

app.get("/", function (req, res) {
  //res.send("Server is up and running");

  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //console.log("Post request Received");

  const query = req.body.cityName;
  const apiKey = "1bb6e54848f8ff3894763627419da897";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
    apiKey +
    "&q=" +
    query +
    "&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //console.log(weatherDescription);
      //res.send("The temperature in Toronto is " + temp + " degrees Celcius")

      res.write("<p> The weather is currently " + weatherDescription + "</p>");
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celcius</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
