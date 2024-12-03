import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [city, setCity] = useState('上海');
  const [days, setDays] = useState(1);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'SbJL4CgYIvPnkZj78';

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    if (!city) return;
    
    setLoading(true);
    setError('');
    
    try {
      const [currentWeather, forecast, lifeIndex] = await Promise.all([
        fetch(`https://api.seniverse.com/v3/weather/now.json?key=${API_KEY}&location=${encodeURIComponent(city)}`),
        fetch(`https://api.seniverse.com/v3/weather/daily.json?key=${API_KEY}&location=${encodeURIComponent(city)}&days=${days}`),
        fetch(`https://api.seniverse.com/v3/life/suggestion.json?key=${API_KEY}&location=${encodeURIComponent(city)}`)
      ]);

      if (!currentWeather.ok || !forecast.ok || !lifeIndex.ok) {
        throw new Error('API 请求失败');
      }

      const currentData = await currentWeather.json();
      const forecastData = await forecast.json();
      const lifeData = await lifeIndex.json();

      setWeatherData({
        current: currentData.results[0],
        forecast: forecastData.results[0],
        lifeIndex: lifeData.results[0]
      });
    } catch (err) {
      setError('获取天气信息失败，请稍后重试');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="search-container">
        <input
          type="text"
          placeholder="输入城市名称"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <select 
          value={days} 
          onChange={(e) => setDays(Number(e.target.value))}
          className="days-select"
        >
          <option value="1">1天</option>
          <option value="2">2天</option>
          <option value="3">3天</option>
        </select>
        <button onClick={fetchWeather}>获取天气</button>
      </div>

      {loading && <div className="loading">加载中...</div>}
      {error && <div className="error">{error}</div>}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App; 