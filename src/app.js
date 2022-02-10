import { convertDate } from "./utils";

let cityname = ""
let regionCode = ""

async function GetWeather()
{
    //fetch geolocation
    let response = await fetch(`https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=90210`);
    let data = await response.json();
    cityname = data.city;
    regionCode = data.regionCode;
    console.log(data);
    //fetch forecast endpoint
    response = await fetch(`https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&date=01/24/2020`);
    data = await response.json();
    console.log(data);


    document.querySelector("h1").innerHTML += cityname + ", " + regionCode;

    
    for(let i = 0; i < 3; i++){
        let img = document.getElementById(`img${i}`);
        let info = data.daily.data[i];
        if (info.icon == "cloudy"){           /*when updating icons needed to append hashedNames/parcel server preCached img */
            img.src = "/cloudy.d8afbff7.png"
        }
        if (info.icon == "sunny"){
            img.src = "/sunny.104d9cd4.png"
        }
        if (info.icon == "snow"){
            img.src = "/snow.af099d52.png"
        }
        if (info.icon == "rain"){
            img.src = "/rain.536e76f6.png"
        }

        let type = document.getElementById(`type${i}`);
        type.innerHTML = info.icon;

        let temp = document.getElementById(`temp${i}`);
        temp.innerHTML = `<br>${info.apparentTemperatureHigh} / ${info.apparentTemperatureLow} F`
    }
}
GetWeather();


