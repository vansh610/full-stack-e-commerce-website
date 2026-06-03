import React, { useState } from "react";

import "./Signup.css";

import API from "../../api/api";

import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/users/register",
        formData
      );

      console.log(res.data);

      alert("Signup Successful");

      navigate("/login");

    } catch (error) {

  console.log(error);

  if (error.response?.status === 409) {

    alert("Email already exists");

  } else if (error.response?.status === 500) {

    alert("Server Error");

  } else {

    alert(
      error.response?.data?.message ||
      "Signup Failed"
    );
  }
}
  };

  return (

    <div className="signup-page">

      <form
        className="signup-form"
        onSubmit={handleSubmit}
      >

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
        />

        <button type="submit">

          Sign Up

        </button>

        <p>

          Already have account?

          <Link to="/login">

            Login

          </Link>

        </p>

      </form>

    </div>
  );
}

export default Signup;