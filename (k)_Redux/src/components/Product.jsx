import { useState } from "react";
import { addItem } from "../redux/slice";
import { useDispatch } from "react-redux";

const Product = () => {
    const dispatch=useDispatch();
    
  const product = {
    id: 1,
    name: "Wireless Headphones",
    price: 2999,
    image: "https://images.pexels.com/photos/33915459/pexels-photo-33915459.jpeg",
  };

  return (
    <div className="product-page">
      <div className="product-card">
        <img src={product.image} alt={product.name} />

        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>

        <button onClick={()=>dispatch(addItem(1))}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
