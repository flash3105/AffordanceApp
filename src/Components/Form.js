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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("shop", formData.shop);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("price", formData.price);
  
    // Append file if available
    if (formData.picture) {
      formDataToSend.append("file", formData.picture);
    }
  
    fetch(apiUrl, {
      method: "POST",
      body: formDataToSend, // No need to set 'Content-Type', fetch will automatically set it for FormData
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
