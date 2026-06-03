import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../api/api";

import { useDispatch } from "react-redux";

import { AddItem } from "../redux/cartSlice";

import { toast } from "react-toastify";

import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await API.get(`/products/${id}`);

        console.log(res.data);

        setProduct(res.data.product);

      } catch (error) {

        console.log(error);

      }
    };

    fetchProduct();

  }, [id]);

  // LOADING
  if (!product) {

    return <h1>Loading...</h1>;
  }

  return (

    <div className="product-details-container">

      {/* LEFT SIDE */}
      <div className="product-left">

        <img
          src={product.image}
          alt={product.title}
        />

      </div>

      {/* CENTER */}
      <div className="center">

        <h1>{product.title}</h1>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p className="desc">
          {product.description}
        </p>

        <hr />

        <h2>About this item</h2>

        <ul className="li">

          <li>High quality premium product</li>

          <li>Easy replacement available</li>

          <li>Cash on Delivery available</li>

          <li>Secure packaging and fast delivery</li>

          <li>Best seller in {product.category}</li>

          <li>Trusted product with excellent ratings</li>

        </ul>

        <hr />

        <h2>Available Offers</h2>

        <ul>

          <li>💳 10% Instant Discount on Cards</li>

          <li>🚚 Free Delivery Available</li>

          <li>🔥 Limited Time Deal</li>

          <li>🎁 Buy More Save More</li>

        </ul>

        <hr />

        <h2>Delivery Information</h2>

        <p>Delivery in 3-5 business days</p>

        <p>Cash on Delivery Available</p>

        <p>7 Days Easy Return</p>

        <p>1 Year Warranty Available</p>

      </div>

      {/* RIGHT SIDE */}
      <div className="Right">

        <h2 className="price">

          ₹ {product.price}

        </h2>

        <p>

          Inclusive of all taxes

        </p>

        <p>

          FREE delivery across India

        </p>

        <p>

          In Stock ✅

        </p>

        <p>

          Sold by Trusted Seller

        </p>

        <button
  className="bttn"

  onClick={() => {

    const token =
    localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;
    }

    dispatch(

      AddItem({

        id: product._id,

        name: product.title,

        price: product.price,

        image: product.image
      })
    );

    toast.success(

      "Product Added To Cart 🛒",

      {

        position: "top-right",

        autoClose: 2000
      }
    );
  }}
>

  Add To Cart

</button>
       <button
  className="btn-buy"
  onClick={() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;
    }

    navigate("/checkout", {
      state: {
        buyNow: true,
        product: {
          id: product._id,
          name: product.title,
          price: product.price,
          image: product.image
        }
      }
    });

  }}
>
  Buy Now
</button>
      </div>

    </div>
  );
}

export default ProductDetails;