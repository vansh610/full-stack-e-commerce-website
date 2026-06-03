import React from 'react';

import { useNavigate } from 'react-router-dom';

import "./Product.css";

function Product({ id, title, price, image }) {

  const navigate = useNavigate();

  return (

    <div
      className="product"
      onClick={() => navigate(`/product/${id}`)}
      style={{ cursor: "pointer" }}
    >

      <div className="img-box">

        <img
          src={image}
          alt={title}
        />

      </div>

      <div className="product-info">

        <h3>{title}</h3>

        <p>Rs {price}</p>

      </div>

      <button className="add-cart-btn">

        View Product

      </button>

    </div>
  );
}

export default Product;