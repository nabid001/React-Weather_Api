import { useState } from "react";
import axios from "axios";
import Current_Weather from "./components/current-weather/Current_Weather";
import Search from "./components/search/Search";
import Forecast from "./components/forecast/Forecast";
import "./App.css";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(false);
  const [forecast, setForecast] = useState(false);

  const handleOnSerachChande = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeather = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c121b68272e769f54cfa5e40db4989b&units=metric`
    );
    const forecast = axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7c121b68272e769f54cfa5e40db4989b&units=metric`
    );

    Promise.all([currentWeather, forecast]).then(async (res) => {
      const WeatherResponse = res[0].data;
      const forecastResponse = res[1].data;

      setCurrentWeather(WeatherResponse);
      setForecast(forecastResponse);
    });

    setCurrentWeather(currentWeather.data);
  };
  return (
    <div className="container">
      <Search onSerachChande={handleOnSerachChande} />
      {currentWeather && <Current_Weather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default App;
