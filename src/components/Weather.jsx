import React from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import fog_icon from '../assets/fog.png'
import Kalguksu from '../assets/Kalguksu.png'
const Weather = () => {
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type='text' placeholder='Search'/>
            <img src ={search_icon} alt="" />
        </div>
        <p className='country'>New Zealand,</p>
        <p className='city'>Auckland</p>
        <p className='day'>Tue, Jul 30</p>
        <div className='temperaturecondition'>
            <img src={cloud_icon} alt=""  className='weather-icon'/>
            <div className='weathercondition'>
                <div className='number'>
                    <p className='temperature'>15</p>
                    <p className='celcius'>°C</p>
                </div>
                <p className='condition'>Cloudy</p>
            </div>
        </div>
        <div className='menu-info'>
            <p className='today'>Today's Menu</p>
            <img src ={Kalguksu} alt="" className='menu-img'/>
            <p className='menu'>Kalguksu</p>
            <p className='introduction'>Hot soup and chewy noodles to warm you up on a cloudy day.</p>
             <a href="" title="Button border orange" class="button btnFloat btnOrange"></a>
        </div>
    </div>
  )
}

export default Weather
