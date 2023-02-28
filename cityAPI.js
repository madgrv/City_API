//API rapidapi
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c6430b44d5msh6b2b206e320f38fp14fb53jsnec79598483bb',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

//API open.meteo
const optionsWeather = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'api.open-meteo.com',
        'Access-Control-Allow-Origin': '*',
	}
};

// let city = "London".toLowerCase()//Hard code city, for testing

async function getInfo() {
    let citySearch = document.getElementById("citySearch").value.toLowerCase();

    try {
        let res = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=${citySearch}&sort=-population`, options)
        //Data: Rapidapi.com (to display on the front end)
        let cityInfo = await res.json()
        // console.log(JSON.stringify(cityInfo)) //This was used to check the information and find the key names

        //Store results into separate variables
        let cityName = cityInfo.data[0].name
        let region = cityInfo.data[0].region
        let country = cityInfo.data[0].country
        let countryCode = cityInfo.data[0].countryCode
        let population = cityInfo.data[0].population
        let latitude = cityInfo.data[0].latitude
        let longitude = cityInfo.data[0].longitude

        //I'll use the retrieved latitude and longitude variables to complete the meteo URL below with template literals and find the weather information
        //Changed API to Open Meteo as the one provided had a daily limit (also to display in the front end)
        let result2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true&start_date=2023-01-24&end_date=2023-01-24`)
        // console.log(JSON.stringify(weatherData)) //This was used to check the information and find the key names
        let weatherData = await result2.json();
        let temp = weatherData.current_weather.temperature;
        let elevation = weatherData.elevation;

        document.getElementById("cityName").innerHTML = `City: ${cityName}`
        document.getElementById("region").innerHTML = `Region: ${region}`
        document.getElementById("country").innerHTML = `Country: ${country}`
        document.getElementById("temperature").innerHTML = `Current temperature: ${temp}`
        document.getElementById("countryCode").innerHTML = `Country code: ${countryCode}`
        document.getElementById("population").innerHTML = `population: ${population}`
        document.getElementById("elevation").innerHTML = `Elevation: ${elevation}m`
        document.getElementById("latitude").innerHTML = `latitude: ${latitude}`
        document.getElementById("longitude").innerHTML = `longitude: ${longitude}`

    } catch (error) {
        console.error("There was an error = " + error)
    }
}

// document.getElementById("citySearch").addEventListener("keyup", function(e) {
//     if (e.keyCode === 13) { //if enter (keyCode 13) is pressed...
//         document.getElementById("button").click(); //simulates click action on the addButton id element
//         console.log("click")
//     }
// }); //needs double chcking

// getInfo() //call function, used for testing and debugging



/*
Sources:

https://rapidapi.com/wirefreethought/api/geodb-cities/
    [Accessed 07/Feb/2023]

https://rapidapi.com/weatherbit/api/weather/
    [Accessed 07/Feb/2023]
    
https://open-meteo.com
    [Accessed 07/Feb/2023]

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    [Accessed 07/Feb/2023]

*/