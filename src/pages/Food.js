import React from 'react';
import {useNavigate} from 'react-router-dom';
import './Food.css';

const Food = () => {
  
  const navigate = useNavigate();  
  const foodOptions = [
    { name: 'Grocery', image: '/images/grocery.jpeg' ,route:'/grocery'},
    { name: 'Luxury Restaurants', image: '/images/resturant.jpg',route:'/restaurant' },
    { name: 'Fast Foods', image: '/images/fastfood.jpeg',route:'/fastfoods' },
    { name: 'Drinks', image: '/images/drinks.jpeg',route:'/drinks' },
  ];
  
  return (
    <div className="foodpage-container">
      <h1 className="foodpage-title">Food Options</h1>
      <div className="food-options">
        {foodOptions.map((option, index) => (
          <div key={index} className="food-tile" onClick={() => option.route ? navigate(option.route):alert(option.name)}>
            <img src={option.image} alt={option.name} className="food-image" />
            <span className="food-name">{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
