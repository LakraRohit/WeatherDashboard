import React, { useState } from 'react';
import { ImLocation } from "react-icons/im";
import { IoSearch } from "react-icons/io5";
import L1 from '../../assets/Weather/L1.jpg';
import { getWeatherData } from '../../services/weatherService';
import ForecastDisplay from '../forecastDisplay/ForecastDisplay';
import WeatherDisplay from '../weatherDispaly/WeatherDisplay';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for weather data

  const handleSearch = async () => {
    if (city) {
      setIsSearched(true);
      setIsLoading(true); // Set loading to true when searching

      try {
        const data = await getWeatherData(city);
        if (data) {
          setWeatherData(data); // Update weather data without unmounting component
        } else {
          console.error('No data found for the city');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsLoading(false); // Set loading to false after data fetch
      }
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <img className="w-full h-full object-cover" src={L1} alt="Weather Background" />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col lg:flex-row">
        {/* Forecast section */}
        <div className="w-full lg:w-2/3 h-full bg-opacity-gradient flex flex-col justify-center items-start">
          {isSearched && <ForecastDisplay city={city} />}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 h-aut0 md:h-f bg-black bg-opacity-70 backdrop-blur-sm flex flex-col items-center p-4">
          <div className='mt-3 text-3xl text-white font-sans text-center'>Weather Dashboard</div>
          <hr className="bg-white/60 h-[1px] w-11/12 border-none my-5" />

          <div className='mt-5 flex justify-center items-center bg-white w-full rounded-3xl'>
            <input
              className='capitalize ml-2 h-12 w-9/12 border-none focus:outline-none'
              placeholder='Enter City Name...'
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <ImLocation onClick={handleSearch} className='text-gray-400 text-lg cursor-pointer' />
          </div>

          <div className='mt-5 flex items-center'>
            <button onClick={handleSearch} className='active:scale-95 active:bg-blue-600 duration-100 shadow-md flex flex-row justify-center items-center bg-blue-500 text-white w-24 h-7 rounded-2xl'>
              <span className='mr-1'><IoSearch /></span> Search
            </button>
          </div>

          <div>
            {/* Display WeatherDisplay only when data is available */}
            <WeatherDisplay weatherData={weatherData} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
