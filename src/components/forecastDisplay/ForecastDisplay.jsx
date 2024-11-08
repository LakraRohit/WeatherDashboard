import axios from 'axios';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';

const ForecastDisplay = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (city) {
      fetchForecastData(city);
    }
  }, [city]);

  const fetchForecastData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a5da13c4d9890ee54bedbaeb61a6ab1a&units=metric`
      );
      const data = response.data.list;

      // Group forecast data by day
      const groupedData = [];
      const seenDays = new Set();

      data.forEach((entry) => {
        const date = DateTime.fromSeconds(entry.dt).toFormat('ccc'); // Format the day
        const temp = entry.main.temp;
        const weather = entry.weather[0].description;
        const iconCode = entry.weather[0].icon; // Get the icon code

        if (!seenDays.has(date)) {
          groupedData.push({ day: date, temp, weather, iconCode });
          seenDays.add(date);
        }
      });

      setForecastData(groupedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading forecast...</div>;
  }

  return (
    <div className='ml-3 w-full'>
      <div className='text-white font-thin capitalize'>
        <span className='text-8xl'>{city}</span>
      </div>

      <div className='text-white mt-5 font-thin'>Weekly Forecast</div>
      <hr className='bg-white/60 h-[1px] w-8/12 border-none my-5' />

      <div className='md:flex md:space-x-4 mb-5 md:mb-0 ml-5 md:ml-0 text-white font-thin grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-0'>
        {forecastData.map((day, index) => (
          <div
            key={index}
            className={`w-32 h-32 flex flex-col justify-between pt-1 pb-1 items-center bg-opacity-70 rounded-2xl ${['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500'][index % 5]}`}
          >
            <div className='text-sm'>{day.day}</div>
            <div className='text-xl'>
              {/* Use the icon code to dynamically fetch the weather icon */}
              <img
                className='w-16'
                src={`http://openweathermap.org/img/wn/${day.iconCode}@2x.png`}
                alt={day.weather}
              />
            </div>
            <div className='text-sm'>{Math.round(day.temp)}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
