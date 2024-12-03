import React from 'react';
import WeatherAnimation from './WeatherAnimation';
import LifeIndex from './LifeIndex';
import './WeatherCard.css';

// 天气状况对应的emoji
const weatherEmojis = {
  '晴': '☀️',
  '多云': '⛅',
  '阴': '☁️',
  '雨': '🌧️',
  '小雨': '🌦️',
  '中雨': '🌧️',
  '大雨': '⛈️',
  '暴雨': '🌊',
  '雪': '❄️',
  '小雪': '🌨️',
  '中雪': '❄️',
  '大雪': '☃️',
  '雾': '🌫️',
  '霾': '😷',
  '风': '🌪️',
  '大风': '💨',
  '雷阵雨': '⛈️',
  '阵雨': '🌦️',
  '默认': '🌈'  // 默认emoji
};

function WeatherCard({ data }) {
  const { current, forecast } = data;
  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).replace(/\//g, '/');

  // 获取对应的天气emoji
  const getWeatherEmoji = (text) => {
    return weatherEmojis[text] || weatherEmojis['默认'];
  };

  // 获取天气对应的背景类名
  const getWeatherClass = (text) => {
    const weatherMap = {
      '晴': 'sunny',
      '多云': 'cloudy',
      '阴': 'overcast',
      '小雨': 'rainy',
      '中雨': 'rainy',
      '大雨': 'rainy',
      '暴雨': 'rainy',
      '雷阵雨': 'thunder',
      '小雪': 'snowy',
      '中雪': 'snowy',
      '大雪': 'snowy',
      '雾': 'foggy',
      '霾': 'foggy',
    };
    return weatherMap[text] || 'sunny';
  };

  // 判断是否是夜间（18:00 - 06:00）
  const isNight = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  };

  const weatherClass = getWeatherClass(current.now.text);
  const timeClass = isNight() ? 'night' : '';

  return (
    <div className={`weather-card ${weatherClass} ${timeClass}`}>
      <WeatherAnimation type={weatherClass} />
      <div className="weather-content">
        <div className="weather-info">
          <div className="current-weather">
            <h2>{current.location.name}</h2>
            <p className="date">{today}</p>
            
            <div className="temperature">
              <span className="temp-value">{current.now.temperature}°</span>
            </div>

            <div className="weather-icon">
              {getWeatherEmoji(current.now.text)} {current.now.text}
            </div>

            <div className="weather-details">
              <p>体感温度: {current.now.feels_like}°C</p>
              <p>湿度: {current.now.humidity}%</p>
              <p>气压: {current.now.pressure} hPa</p>
            </div>
          </div>

          <div className="forecast-container">
            <h3>未来天气预报</h3>
            <div className="forecast">
              {forecast.daily.map((day, index) => (
                <div key={index} className="forecast-day">
                  <p className="date">{day.date.split('-').slice(1).join('/')}</p>
                  <div className="weather-icon">
                    {getWeatherEmoji(day.text_day)}
                  </div>
                  <div className="forecast-temp">
                    <span className="high">{day.high}°</span>
                    <span className="low">{day.low}°</span>
                  </div>
                  <p className="weather-text">{day.text_day}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {data.lifeIndex && <LifeIndex data={data.lifeIndex} />}
      </div>
    </div>
  );
}

export default WeatherCard; 