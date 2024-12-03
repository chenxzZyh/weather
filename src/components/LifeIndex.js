import React from 'react';
import './LifeIndex.css';

const indexIcons = {
  umbrella: '☔',
  dressing: '👕',
  car_washing: '🚗',
  travel: '🏖️',
  flu: '🤒',
  sport: '⚽',
  uv: '☀️',
  comfort: '😊'
};

const LifeIndex = ({ data }) => {
  const { suggestion } = data;

  const indexItems = [
    { key: 'umbrella', title: '雨伞指数' },
    { key: 'dressing', title: '穿衣指数' },
    { key: 'car_washing', title: '洗车指数' },
    { key: 'travel', title: '旅游指数' },
    { key: 'flu', title: '感冒指数' },
    { key: 'sport', title: '运动指数' },
    { key: 'uv', title: '紫外线指数' },
    { key: 'comfort', title: '舒适度指数' }
  ];

  return (
    <div className="life-index">
      <h3>生活指数</h3>
      <div className="index-grid">
        {indexItems.map(item => (
          suggestion[item.key] && (
            <div key={item.key} className="index-item">
              <div className="index-icon">{indexIcons[item.key]}</div>
              <div className="index-content">
                <h4>{item.title}</h4>
                <p className="index-brief">{suggestion[item.key].brief}</p>
                <div className="index-details">
                  <p>{suggestion[item.key].details}</p>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default LifeIndex; 