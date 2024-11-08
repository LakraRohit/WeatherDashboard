

import axios from 'axios';

const API_KEY = 'a5da13c4d9890ee54bedbaeb61a6ab1a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }OS in terminal

};
