import React, { useEffect, useState,useRef } from 'react'
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
import Kalguksu from '../assets/foodKalguksu.png'
import Bibimbop from '../assets/foodBibimbop.png'
import Bujji from '../assets/foodBudaejjigae.png'
import Chicken from '../assets/foodChicken.png'
import Tteok from '../assets/foodTteokbokki.png'
import Sundubu from '../assets/foodSundubu.png'
import Jja from '../assets/foodJjajangmyeon.png'
import Kimchijeon from '../assets/foodKimchijeon.png'
import Mulnaeng from '../assets/foodMulnaengmyeon.png'
import Samgyeop from '../assets/foodSamgyeopsal.png'
import Samgye from '../assets/foodSamgyetang.png'
import Gamja from '../assets/foodGamja.png'
import Pajeon from '../assets/foodPajeon.png'
import Ramyeon from '../assets/foodRamyeon.png'


const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);
    const inputRef = useRef()
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
    const countryname = {
        "KR": "Republic of Korea",
        "JP": "Japan",
        "CN": "China",
        "US": "USA",
        "GB": "United Kingdom",
        "DE": "Germany",
        "FR": "French",
        "IT": "Italia",
        "ES": "Spain",
        "RU": "Russia",
        "BR": "Brazil",
        "IN": "India",
        "CA": "Canada",
        "AU": "Australia",
        "MX": "Mexico",
        "ZA": "Republic of South Africa",
        "AR": "Argentina",
        "SA": "Saudi Arabia",
        "TR": "Türkiye",
        "ID": "Indonesia",
        "VN": "Viet Nam",
        "TH": "Thailand",
        "MY": "Malaysia",
        "SG": "Singapore",
        "PH": "Philippines",
        "NZ": "New Zealand",
        "SE": "Sweden",
        "CH": "Swiss",
        "NL": "Netherlands",
        "BE": "Belgium",
        "NO": "Norway",
        "FI": "Finland",
        "DK": "Denmark",
        "PL": "Poland",
        "GR": "Greece",
        "PT": "Portugal",
        "AE": "United Arab Emirates",
        "EG": "Egypt",
        "IR": "Islamic Iran",
        "IQ": "Iraq",
        "IL": "Israel",
        "PK": "Pakistan",
        "BD": "Bangladesh",
        "NG": "Nigeria",
        "KE": "Kenya",
        "UA": "Ukraine",
        "AT": "Austria",
        "CZ": "Czech",
        "HU": "Hungary",
        "IE": "Ireland",
        "RO": "Romania",
        "AQ" : "Antartica"
};
    const debounceRef = useRef(null);
    const search = async (city) =>{
        if (debounceRef.current) return;

        debounceRef.current = setTimeout(() => {
            debounceRef.current = null;
        },3000);
      
        if(city ===""){
            alert("Enter City Name");
            return;
        }

        try{
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            const country = countryname[data.sys.country] || data.sys.country;
            const menu = getRecommendedMenu(data.weather[0].main, data.main.temp);
            setWeatherData({
                temperature: Math.floor(data.main.temp),
                country: country,
                city: data.name,
                icon: icon,
                condition: String(data.weather[0].main),
                menuImage: menu.image,
                menuName: menu.name,
                menuDescription: menu.description,
                menuvideo : menu.foodvideo
            })
        }catch(error){
            setWeatherData(false);
            alert("Oops! We couldn't find this city.😥");
            console.error("Error in fetching weather Data");
        };
    }
    useEffect(()=>{
        search("Auckland");
    },[])
    const foggyConditions = ['Haze', 'Smoke', 'Mist', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall'];
    const rainyConditions = ['Rain', 'Drizzle'];
    const getRecommendedMenu = (condition, temperature) => {
        if (foggyConditions.includes(condition)) {
            return {
                image: Kalguksu,
                name: 'Kalguksu',
                description: 'Let the fog wrap around you while hot, hand-cut noodles warm you up from within.',
                foodvideo : 'https://youtu.be/5Ceg1QN56p0?si=nLWhcLKNPq-lHILw'
            };
        }
        if (condition === 'Clear' && temperature >= 30) {
            return {
                image: Mulnaeng,
                name: 'Mul-naengmyeon',
                description: 'Beat the heat with icy cold broth and chewy noodles the ultimate summer dish!',
                foodvideo : 'https://youtu.be/QIgLSko7Kmc?si=4GEXNPU-3VTCnO-H'
            };
        }

        if (condition === 'Clear' && temperature >= 20) {
            return {
                image: Bibimbop,
                name: 'Bibimbap',
                description: 'A colorful mix of veggies and rice light, nutritious, and perfect for sunny days.',
                foodvideo : 'https://youtube.com/shorts/Q05BvncrHSc?si=_OZA89pQPi8sliHn'
            };
        }

        if (condition === 'Clear') {
            return {
                image: Bujji,
                name: 'Budae Jjigae',
                description: 'A hearty, spicy stew with sausage and cheese comfort in every bite, even on bright days.',
                foodvideo : 'https://youtu.be/euVyBKNfxkk?si=hQ66asT5OedV5gGi'
            };
        }

        if (condition === 'Clouds' && temperature >= 30) {
            return {
                image: Samgye,
                name: 'Samgyetang',
                description: 'Replenish your energy with nourishing ginseng chicken soup under the blazing cloudy sky.',
                foodvideo : 'https://youtu.be/JUmFtHqwrnk?si=T9-ZE8vfWLYKD8xZ'
            };
        }
        if (condition === 'Clouds' && temperature >= 20) {
            return {
                image: Samgyeop,
                name: 'Samgyeopsal',
                description: 'Fire up the grill for juicy pork belly nothing beats K-BBQ in warm, cloudy weather. 저기압일때는 고기 앞으로!',
                foodvideo : 'https://youtu.be/23tRGHUX3qM?si=0n04ZM5S69zttZ08'
            };
        }
        if (condition === 'Clouds') {
            return {
                image: Sundubu,
                name: 'Sundubu Jjigae',
                description: 'A cozy bowl of soft tofu stew to warm your body and soul on a gray day.',
                foodvideo : 'https://youtu.be/Mg9zeD01kEw?si=L5ovVtB_Que5F3CH'
            };
        }
        if (rainyConditions.includes(condition) &&  temperature >= 30) {
            return {
                image: Pajeon,
                name: 'Haemul Pajeon',
                description: 'Enjoy the sizzle of seafood pancake while watching the rain summer monsoon comfort.',
                foodvideo : 'https://youtube.com/shorts/OTpcP7g-VrY?si=kcLT36i7sh4POp5T'
            };
        }
        if (rainyConditions.includes(condition)  &&  temperature >= 20) {
            return {
                image: Kimchijeon,
                name: 'Kimchi Jeon + Makgeolli',
                description: 'Tangy kimchi pancake and chilled rice wine a rainy-day pairing loved by all.',
                foodvideo : 'https://youtu.be/UYnb7Ueug-Y?si=bf5MpIHjqiTmMm2I'
            };
        }
        if (rainyConditions.includes(condition) ) {
            return {
                image: Tteok,
                name: 'Tteokbokki',
                description: 'A spicy kick of chewy rice cakes to add fun and warmth to a cloudy sky.',
                foodvideo : 'https://youtube.com/shorts/n2UrPDt4ARU?si=DhEu19VOxitfXE5X'
            };
        }
        if (condition === 'Thunderstorm' || condition === 'Tornado'){
            return{
                image: Ramyeon,
                name:'Ramyeon',
                description: 'Simple, steamy noodles with egg and green onions the perfect companion to a rumbling sky.',
                foodvideo : 'https://youtube.com/shorts/tnVXYUGr1d8?si=EQwkHZhWf8ScnHOO'
            }
        }
        if (condition === 'Snow') {
            return {
            image: Gamja,
            name: 'Gamjatang',
            description: 'A steaming hot pork bone stew packed with potatoes perfect to thaw frozen hands.',
            foodvideo : 'https://youtu.be/dfET5tfvnxw?si=GwbQpcBtpI2U1Iqv'
            };
        }

        return {
            image: Chicken,
            name: 'K-Chicken',
            description: "Korea's sween and crunch chicken is perfect for any weather.",
            foodvideo : 'https://youtube.com/shorts/u3qDzuBoOnY?si=Jk2WUPyLktii0Qca'
        };
    }

        

    return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref = {inputRef} type='text' placeholder='Enter City Name'/>
            <img src ={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData ? <>
        <p className='country'>{weatherData.country},</p>
        <p className='city'>{weatherData.city}</p>
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
            <img src ={weatherData.menuImage} alt="" className='menu-img'/>
            <p className='menu'>{weatherData.menuName}</p>
            <p className='introduction'>{weatherData.menuDescription}</p>
            <a href={weatherData.menuvideo} title="Button border orange" className="button btnFloat btnOrange"></a>
        </div></>:<></>}
        
    </div>
  )
}

export default Weather