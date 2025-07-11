import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import scloud_icon from '../assets/scatteredcloud.png'
import fog_icon from '../assets/fog.png'
import thunder_icon from '../assets/thunderstorm.png'
import Kalguksu from '../assets/Kalguksu.png'

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": scloud_icon,
        "03n": scloud_icon,
        "04d": scloud_icon,
        "04n":scloud_icon,
        "09d":drizzle_icon,
        "09n":drizzle_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "11d":thunder_icon,
        "11n":thunder_icon,
        "13d":snow_icon,
        "13n":snow_icon,
        "50d":fog_icon,
        "50n":fog_icon
    }

    const search = async (city) =>{
        try{
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            const time = new Date((data.dt + data.timezone) * 1000);
            setWeatherData({
                temperature: Math.floor(data.main.temp),
                country: data.sys.country,
                city: data.name,
                icon: icon,
                localtime: time,
                condition: String(data.weather[0].main)
            })
        }catch(error){

        };
    }
    useEffect(()=>{
        search("Auckland");
    },[])
    return (
    <div className='weather'>
        <div className='search-bar'>
            <input type='text' placeholder='Search'/>
            <img src ={search_icon} alt="" />
        </div>
        <p className='country'>{weatherData.country},</p>
        <p className='city'>{weatherData.city}</p>
        {/* <p className='day'>{weatherData.localtime}</p> */}
        <div className='temperaturecondition'>
            <img src={weatherData.icon} alt=""  className='weather-icon'/>
            <div className='weathercondition'>
                <div className='number'>
                    <p className='temperature'>{weatherData.temperature}</p>
                    <p className='celcius'>°C</p>
                </div>
                <p className='condition'>{weatherData.condition}</p>
            </div>
        </div>
        <div className='menu-info'>
            <p className='today'>Today's Menu</p>
            <img src ={Kalguksu} alt="" className='menu-img'/>
            <p className='menu'>Kalguksu</p>
            <p className='introduction'>Hot soup and chewy noodles to warm you up on a cloudy day.</p>
             <a href="" title="Button border orange" className="button btnFloat btnOrange"></a>
        </div>
    </div>
  )
}

export default Weather
