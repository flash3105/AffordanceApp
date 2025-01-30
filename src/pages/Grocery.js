import React, { useState, useEffect } from "react";
import "./Grocery.css";
import Form from "../Components/Form"; // Import the reusable form

const Grocery = () => {
  const [groceries, setGroceries] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch groceries from API
  useEffect(() => {
    fetch("http://localhost:5189/api/grocery") 
      .then((response) => response.json())
      .then((data) => setGroceries(data))
      .catch((error) => console.error("Error fetching groceries:", error));
  }, []);

  // Handle adding new item
  const handleAddItem = (newItem) => {
    setGroceries([...groceries, newItem]);
    setShowForm(false);
  };

  return (
    <div className="grocery-container">
      <h1 className="grocery-title">Grocery Items</h1>

      <button className="add-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Item"}
      </button>

      {showForm && <Form apiUrl="http://localhost:5189/api/grocery" onAddItem={handleAddItem} />}

      <div className="grocery-list">
        {groceries.map((item) => (
          <div key={item.id} className="grocery-item">
            {item.picture && <img src={item.picture} alt={item.name} className="grocery-image" />}
            <h3>{item.name}</h3>
            <p>Shop: {item.shop}</p>
            <p>Size: {item.size}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grocery;
