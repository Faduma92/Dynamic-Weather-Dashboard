
$(document).ready(function () {

  document.getElementsByClassName("list-group-item").val = localStorage.getItem("Locations");

  $("#run-search").click(function () {
    var newListItem = $("#listSearch").val()
    var newList = $("<li>")

    newList.addClass("list-group-item")
    newList.text(newListItem)
    $("#myList").prepend(newList);
    $("#listSearch").val("");
    localStorage.setItem("Locations", newListItem);


  });
});

moment();
var currentDate = moment().format('MMMM Do YYYY');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {



    var getIP = 'http://ip-api.com/json/';
    $.ajax(getIP).then(function (location) {
      console.log(location)
    })

    var getIP = 'http://ip-api.com/json/';
    var openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather'
    $.ajax(getIP).then(function (location) {
      $.getJSON(openWeatherMap, {
        lat: location.lat,
        lon: location.lon,
        units: 'metric',
        APPID: 'f8056ffb97d36155e37b425ec3d9a879'
      }).done(function (weather) {
        console.log(weather)
        console.log(weather.main.temp)
        console.log(location.city)
        console.log(weather.weather[0].icon)
        console.log(weather.dt)





        var getIP = 'http://ip-api.com/json/';
        var openWeatherMapUV = "http://api.openweathermap.org/data/2.5/uvi"

        $.ajax(getIP).then(function (location) {
          $.getJSON(openWeatherMapUV, {
            lat: location.lat,
            lon: location.lon,

            APPID: 'f8056ffb97d36155e37b425ec3d9a879'
          }).done(function (UV) {
            console.log("UV:" + UV.value)
            $("#UVindex").text("UV Index: " + UV.value)
          })



          var unix_timestamp = weather.dt
          var date = new Date(unix_timestamp * 1000);
          // Hours part from the timestamp
          var hours = date.getHours();
          // Minutes part from the timestamp
          var minutes = "0" + date.getMinutes();
          // Seconds part from the timestamp
          var seconds = "0" + date.getSeconds();

          // Will display time in 10:30:23 format
          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

          console.log(formattedTime);

          // 5 Day forecast for Geolocation

          var key = "f8056ffb97d36155e37b425ec3d9a879";
          var city = location.city;
          var url = "https://api.openweathermap.org/data/2.5/forecast";

          $.ajax({
            url: url, //API Call
            dataType: "json",
            type: "GET",
            data: {
              q: city,
              appid: key,
              units: "metric",
            },
            success: function (data) {
              console.log('5 Day Forecast:', data) // For testing
              console.log(data.list[0])
              console.log(data.list[8])
              console.log(data.list[16])
              console.log(data.list[24])
              console.log(data.list[32])



              $("#temp0").text("Temp: " + data.list[0].main.temp + "  °C")
              $("#humidity0").text("Humidity: " + data.list[0].main.humidity + "%")
              $("#cardDate0").text(data.list[0].dt_txt)
              var icon = "https://openWeatherMap.org/img/w/" + data.list[0].weather[0].icon + ".png"
              var image = $("#icon0").attr("src", icon)

              $("#icon0").append(image)

              $("#temp8").text("Temp: " + data.list[8].main.temp + "  °C")
              $("#humidity8").text("Humidity: " + data.list[8].main.humidity + "%")
              $("#cardDate8").text(data.list[8].dt_txt)
              var icon = "https://openWeatherMap.org/img/w/" + data.list[8].weather[0].icon + ".png"
              var image = $("#icon8").attr("src", icon)

              $("#icon8").append(image)

              $("#temp16").text("Temp: " + data.list[16].main.temp + "  °C")
              $("#humidity16").text("Humidity: " + data.list[16].main.humidity + "%")
              $("#cardDate16").text(data.list[16].dt_txt)
              var icon = "https://openWeatherMap.org/img/w/" + data.list[16].weather[0].icon + ".png"
              var image = $("#icon16").attr("src", icon)

              $("#icon16").append(image)

              $("#temp24").text("Temp: " + data.list[24].main.temp + "  °C")
              $("#humidity24").text("Humidity: " + data.list[24].main.humidity + "%")
              $("#cardDate24").text(data.list[24].dt_txt)
              var icon = "https://openWeatherMap.org/img/w/" + data.list[24].weather[0].icon + ".png"
              var image = $("#icon24").attr("src", icon)

              $("#icon24").append(image)

              $("#temp32").text("Temp: " + data.list[32].main.temp + "  °C")
              $("#humidity32").text("Humidity: " + data.list[32].main.humidity + "%")
              $("#cardDate32").text(data.list[32].dt_txt)
              var icon = "https://openWeatherMap.org/img/w/" + data.list[32].weather[0].icon + ".png"
              var image = $("#icon32").attr("src", icon)

              $("#icon32").append(image)




            }
          });


          // Change DOM elements



          $("#temperature-degree").text(weather.main.temp)
          $("#location-timezone").text(location.city)
          $("#currentDate").text(currentDate)
          $("#humidity").text("Humidity: " + weather.main.humidity + "%")
          $("#windspeed").text("Wind speed: " + weather.wind.speed + "km/h")
          var icon = "https://openWeatherMap.org/img/w/" + weather.weather[0].icon + ".png"
          var image = $("#weatherImage").attr("src", icon)
          image.width('200px').height('200px')
          $("#weatherImage").append(image)
        })
      })

    })



  })




  $("#run-search").on("click", function (event) {
    event.preventDefault();

    var cityName = $("#listSearch").val().trim();
    console.log(cityName)

    var apiKey = 'f8056ffb97d36155e37b425ec3d9a879'
    var units = 'metric'

    var openWeatherMap = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + units + "&appid=" + apiKey
    $.ajax({
      url: openWeatherMap,
      lat: location.lat,
      lon: location.lon,


    }).done(function (weather) {
      console.log(weather)
      console.log(weather.main.temp)
      console.log(weather.name)
      console.log(weather.weather[0].icon)
      console.log(openWeatherMap)
      console.log(weather.coord.lon)
      console.log(weather.coord.lat)
      // Change DOM elements

      $("#temperature-degree").text(weather.main.temp)
      $("#location-timezone").text(weather.name)
      $("#currentDate").text(currentDate)
      $("#humidity").text("Humidity: " + weather.main.humidity + "%")
      $("#windspeed").text("Wind speed: " + weather.wind.speed + "km/h")
      var icon = "https://openWeatherMap.org/img/w/" + weather.weather[0].icon + ".png"
      var image = $("#weatherImage").attr("src", icon)
      image.width('200px').height('200px')
      $("#weatherImage").append(image)

      var APPID = 'f8056ffb97d36155e37b425ec3d9a879'
      var locationLon = weather.coord.lon
      var locationLat = weather.coord.lat
      var openWeatherMapUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APPID + "&lat=" + locationLat + "&lon=" + locationLon;
      $.ajax({
        url: openWeatherMapUV,
        method: "GET"

      }).done(function (UV) {
        console.log("UV:" + UV.value)
        $("#UVindex").text("UV Index: " + UV.value)
      })



    })



    var key = "f8056ffb97d36155e37b425ec3d9a879";
    var city = $("#listSearch").val().trim();
    var url = "https://api.openweathermap.org/data/2.5/forecast";

    $.ajax({
      url: url, //API Call
      dataType: "json",
      type: "GET",
      data: {
        q: city,
        appid: key,
        units: "metric",
      },
      success: function (data) {
        console.log('5 Day Forecast:', data) // For testing
        console.log(data.list[0])
        console.log(data.list[8])
        console.log(data.list[16])
        console.log(data.list[24])
        console.log(data.list[32])
        console.log(data.list[0].weather[0].icon)


        $("#temp0").text("Temp: " + data.list[0].main.temp + "  °C")
        $("#humidity0").text("Humidity: " + data.list[0].main.humidity + "%")
        $("#cardDate0").text(data.list[0].dt_txt)
        var icon = "https://openWeatherMap.org/img/w/" + data.list[0].weather[0].icon + ".png"
        var image = $("#icon0").attr("src", icon)

        $("#icon0").append(image)

        $("#temp8").text("Temp: " + data.list[8].main.temp + "  °C")
        $("#humidity8").text("Humidity: " + data.list[8].main.humidity + "%")
        $("#cardDate8").text(data.list[8].dt_txt)
        var icon = "https://openWeatherMap.org/img/w/" + data.list[8].weather[0].icon + ".png"
        var image = $("#icon8").attr("src", icon)

        $("#icon8").append(image)

        $("#temp16").text("Temp: " + data.list[16].main.temp + "  °C")
        $("#humidity16").text("Humidity: " + data.list[16].main.humidity + "%")
        $("#cardDate16").text(data.list[16].dt_txt)
        var icon = "https://openWeatherMap.org/img/w/" + data.list[16].weather[0].icon + ".png"
        var image = $("#icon16").attr("src", icon)

        $("#icon16").append(image)

        $("#temp24").text("Temp: " + data.list[24].main.temp + "  °C")
        $("#humidity24").text("Humidity: " + data.list[24].main.humidity + "%")
        $("#cardDate24").text(data.list[24].dt_txt)
        var icon = "https://openWeatherMap.org/img/w/" + data.list[24].weather[0].icon + ".png"
        var image = $("#icon24").attr("src", icon)

        $("#icon24").append(image)

        $("#temp32").text("Temp: " + data.list[32].main.temp + "  °C")
        $("#humidity32").text("Humidity: " + data.list[32].main.humidity + "%")
        $("#cardDate32").text(data.list[32].dt_txt)
        var icon = "https://openWeatherMap.org/img/w/" + data.list[32].weather[0].icon + ".png"
        var image = $("#icon32").attr("src", icon)

        $("#icon32").append(image)




      }
    });
  })
}
