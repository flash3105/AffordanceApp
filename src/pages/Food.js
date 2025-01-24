import React from 'react';
import './Food.css';

const Food = () => {
  const foodOptions = [
    { name: 'Grocery', image: '/images/grocery.jpeg' },
    { name: 'Luxury Restaurants', image: '/images/resturant.jpg' },
    { name: 'Fast Foods', image: '/images/fastfood.jpeg' },
    { name: 'Drinks', image: '/images/drinks.jpeg' },
  ];

  return (
    <div className="foodpage-container">
      <h1 className="foodpage-title">Food Options</h1>
      <div className="food-options">
        {foodOptions.map((option, index) => (
          <div key={index} className="food-tile">
            <img src={option.image} alt={option.name} className="food-image" />
            <span className="food-name">{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
