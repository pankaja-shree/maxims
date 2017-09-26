
$(document).ready(function(){
  
  var key = "a9445f3cb154571ad56fc734ee9bc91c";
  var lat, lon, api, city, apidata;
  var cel = false;
  
  getLoc();
  setInterval(getLoc, 1800000);
  
  function getLoc(){
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(weatherInfo);
  }
  }
  
  function tempToggle(ftemp,c){
    if(c) return Math.round((ftemp-32) * (5/9)) +' C';
    return Math.round(ftemp) + ' F';
  }
  
  function renderData(json,cel){
    var ft = json.main.temp;
                var currentTemp = tempToggle(json.main.temp,cel);
                var des = json.weather[0].description;
                city = json.name;

                $("#lat").html('Latitude: '+ lat.toFixed(2)); 
                $("#lon").html('Longitude: ' + lon.toFixed(2));
                $("#city").html(city);
                $(".temp").html(currentTemp);
                $("#weather").html(des);
                $("#speed").html(' ' + json.wind.speed + ' mps');
     
                var iconsrc = 'http://openweathermap.org/img/w/'+json.weather[0].icon+'.png';
          
                document.getElementById("weather-image").src = iconsrc;
  }
  
  function weatherInfo(pos){
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
/* to work on http: 
      $.getJSON("http://ipinfo.io/json",function(data){
        
        var loc = data.loc;
        loc = loc.split(",");
        lat = loc[0];
        lon = loc[1];
        city = data.city;
        api = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&APPID="+key;
        console.log(api);
        */
   api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&APPID="+key;
        $.getJSON(api,function(json){
                apidata = json;
                renderData(json,cel);
                
              $("#toggle").click(function(){
                 cel = !cel;
                 renderData(apidata,cel);
              });
            });
      
    }
  

          
  
});