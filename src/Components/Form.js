import React, { useState } from "react";
import "./Form.css";

const Form = ({ apiUrl, onAddItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    shop: "",
    size: "",
    price: "",
    picture: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newItem) => {
        onAddItem(newItem);
        setFormData({ name: "", shop: "", size: "", price: "", picture: "" });
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="shop" placeholder="Shop" value={formData.shop} onChange={handleChange} required />
      <input type="text" name="size" placeholder="Size" value={formData.size} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input type="text" name="picture" placeholder="Picture URL (optional)" value={formData.picture} onChange={handleChange} />
      <input type="file" name="picture" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
