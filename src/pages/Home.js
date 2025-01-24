// HomePage.js
import React from 'react';
import {useNavigate} from 'react-router-dom';
import './Home.css';

const Home = () => {

  const navigate = useNavigate();  
  const options = [
    { name: 'Food', icon: '🍔' ,route:'/food'},
    { name: 'Entertainment', icon: '🎬',route:'/entertainment' },
    { name: 'Transport', icon: '🚗' ,route:'transport'},
    { name: 'Hotels', icon: '🏨',route:'hotels' },
  ];

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Explore Options</h1>
      <div className="tile-container">
        {options.map((option, index) => (
          <div key={index} className="tile" onClick={() => option.route ? navigate(option.route):alert(option.name)}>
            <span className="tile-icon">{option.icon}</span>
            <span className="tile-name">{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
