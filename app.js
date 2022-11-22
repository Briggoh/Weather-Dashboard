// Declaring a variable that will store the user-inputted city
let city ="";

// Variable declaration
let searchCity = $("#search-city");
let searchButton = $("#search-button");
let clearButton = $("#clear-history");
let currentCity = $("#current-city");
let currentTemperature = $("#temperature");
let currentHumidty= $("#humidity");
let currentWSpeed=$("#wind-speed");
let currentUvindex= $("#uv-index");
let sCity=[];

// Checks to see if city exists in storage
function find(c){
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;

//setting up my API key 
let APIKey = "f5463c710a507bc638be3354a58139dd";

// Displays current and future weather
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
};
// Here we create the AJAX call
function currentWeather(city){
    // Retrieves data from API
    const queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){
        console.log(response);
        //Data object from server-side API
        const weathericon= response.weather[0].icon;
        const iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        const date=new Date(response.dt*1000).toLocaleDateString();.
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
        // Convert the temp to fahrenheit
        const tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempF).toFixed(2)+"&#8457");
        // display humidity 
        $(currentHumidty).html(response.main.humidity+"%");
        // display wind speed
        const ws=response.wind.speed;
        const windsmph=(ws*2.237).toFixed(1);
        $(currentWSpeed).html(windsmph+"MPH");
        // display UV index
        UVIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if(response.cod==200){
            sCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
            if (sCity==null){
                sCity=[];
                sCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(sCity));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(sCity));
                    addToList(city);
                }
            }
        }

    });
}