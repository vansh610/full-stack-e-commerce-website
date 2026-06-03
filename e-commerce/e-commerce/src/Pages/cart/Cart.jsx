import React from 'react';

import "./Cart.css";

import CartCard from '../../components/cartCard/CartCard';

import { useSelector } from 'react-redux';

import ec from "../../assets/emptycart.png";

import { useNavigate } from 'react-router-dom';

function Cart() {

  const cartItems = useSelector(state => state.cart) || [];

  const total = cartItems.reduce(
    (a, b) => a + Number(b.price),
    0
  );

  const navigate = useNavigate();

  const handleBuyNow = (item) => {

    navigate("/checkout", { state: item });
  };

  return (

    <div className="cart-container">

      {/* LEFT SIDE */}

      <div className="cart-left">

        {

        cartItems.length <= 0 ? (

          <div className="empty-cart">

            <img src={ec} alt="" />

            <h1>Empty Cart</h1>

          </div>

        ) : (

          cartItems.map((item) => (

            <CartCard
              key={item.id}
              item={item}
              name={item.name}
              price={item.price}
              image={item.image}
              id={item.id}
              handleBuyNow={handleBuyNow}
            />

          ))
        )}

      </div>

      {/* RIGHT SIDE */}

      <div className="price-section">

        <h2>Price Details</h2>

        <div className="price-row">

          <p>

            Total Product :

          </p>

          <span>

            {cartItems.length}

          </span>

        </div>

        <div className="price-row">

          <p>

            Total Price :

          </p>

          <span>

            ₹{total}

          </span>

        </div>

        <hr />

        <div className="total-amount">

          <p>

            Total Amount

          </p>

          <span>

            ₹{total}

          </span>

        </div>

        <button
          className="check-btn"
          onClick={() => navigate("/checkout")}
        >

          Proceed to Buy

        </button>

      </div>

    </div>
  );
}

export default Cart;