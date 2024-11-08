import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaRegCircle } from "react-icons/fa";
import { FaTemperatureHigh, FaWind } from "react-icons/fa6";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";

const WeatherDisplay = ({ weatherData }) => {
    const [isCelsius, setIsCelsius] = useState(true);

    if (!weatherData) return <div className="text-white">Enter a city to get the weather.</div>;

    const {
        name,
        main: { temp, humidity, temp_max, temp_min },
        wind: { speed },
        weather,
        sys: { sunrise, sunset },
        timezone
    } = weatherData;

    const weatherCondition = weather[0].main;

    // Calculate city time
    const cityTime = new Date(Date.now() + (timezone * 1000));
    const day = cityTime.toLocaleDateString('en-US', { weekday: 'short' });
    const time = cityTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const date = cityTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const year = cityTime.getFullYear();

    // Temperature conversions based on toggle
    const convertTemp = (temp) => isCelsius ? temp : (temp * 9/5) + 32;
    const displayedTemperature = Math.round(convertTemp(temp));
    const maxTemperature = Math.round(convertTemp(temp_max));
    const minTemperature = Math.round(convertTemp(temp_min));

    const handleTempToggle = () => {
        setIsCelsius(!isCelsius);
    };

    return (
        <div className="flex flex-col justify-center items-center font-thin px-4 sm:px-0">
            <div className='mt-3' onClick={handleTempToggle}>
                {isCelsius ? (
                    <TbTemperatureFahrenheit className='text-white ml-1 text-lg hover:cursor-pointer active:scale-95' />
                ) : (
                    <TbTemperatureCelsius className='text-white ml-1 text-lg hover:cursor-pointer active:scale-95' />
                )}
            </div>

            <div className='text-white text-lg mt-8 font-normal'>
                {day} | {time} | {date} | {year}
            </div>

            <div className='text-white font-bold text-3xl mt-7'>
                {name}
            </div>

            <div className='text-white text-lg mt-8 w-full sm:w-11/12 flex flex-col sm:flex-row'>
                {/* Weather Icon & Condition */}
                <div className="flex flex-col justify-center items-center w-full sm:w-1/3 text-5xl">
                    <img
                        className="w-64 sm:w-80"
                        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} // Use the icon code from weather data
                        alt={weatherCondition}
                    />
                    <div className="text-lg font-thin">{weatherCondition}</div>
                </div>

                {/* Temperature Section */}
                <div className="flex justify-center items-center w-full sm:w-1/3 text-7xl mt-5 sm:mt-0">
                    <div>{displayedTemperature}</div>
                    <div>
                        <FaRegCircle className="text-sm mb-8" />
                    </div>
                </div>

                {/* Wind, Humidity, Max/Min Temperature */}
                <div className="flex flex-col justify-center items-center w-full sm:w-1/3 space-y-5 mt-5 sm:mt-0">
                    <div className="flex justify-center w-full items-center text-sm">
                        <FaTemperatureHigh className="text-red-500" /> Real Time: {Math.round(temp)}
                    </div>
                    <div className="flex justify-center w-full items-center text-sm">
                        <WiHumidity className="text-lg text-blue-500" /> Humidity: {humidity}%
                    </div>
                    <div className="flex justify-center items-center text-sm w-full">
                        <FaWind className="text-cyan-400" /> <span className='text-[0.7rem]'>Wind Speed:</span> <span className="text-[0.8rem]">{speed}</span> <span className="text-[0.5rem] ml-1">Km/h</span>
                    </div>
                </div>
            </div>

            {/* Sunrise, Sunset, High/Low Temperatures */}
            <div className='text-white flex flex-col sm:flex-row justify-center items-center mt-12 space-x-0 sm:space-x-1 font-thin text-sm'>
                <div className="flex items-center mb-2 sm:mb-0">
                    <FiSunrise className="mr-1" />
                    <span className='text-[0.8rem]'>Rise {new Date(sunrise * 1000).toLocaleTimeString()}</span>
                </div>
                <span>|</span>
                <div className="flex items-center mb-2 sm:mb-0">
                    <FiSunset className="mr-1" />
                    <span className='text-[0.8rem]'>Set {new Date(sunset * 1000).toLocaleTimeString()}</span>
                </div>
                <span>|</span>
                <div className="flex items-center mb-2 sm:mb-0">
                    <FaArrowUp className="mr-1" />
                    <span className='text-[0.8rem]'>High {maxTemperature}°</span>
                </div>
                <span>|</span>
                <div className="flex items-center mb-2 sm:mb-0">
                    <FaArrowDown className="mr-1" />
                    <span className='text-[0.8rem]'>Low {minTemperature}°</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
