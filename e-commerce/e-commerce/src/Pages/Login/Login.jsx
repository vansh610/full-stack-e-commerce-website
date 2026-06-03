import React, { useState } from "react";

import "./Login.css";

import API from "../../api/api";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { loginSuccess } from "../../redux/authSlice";

function Login() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // ✅ HANDLE LOGIN / REGISTER
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // ✅ LOGIN
      if (isLogin) {

        const res = await API.post(
          "/users/login",
          {
            email,
            password
          }
        );

        console.log("LOGIN:", res.data);

        // ✅ SAVE USER IN REDUX + LOCALSTORAGE
        dispatch(

  loginSuccess({

    user: res.data.user,

    token: res.data.accessToken
  })
);

// SAVE IN LOCAL STORAGE

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

localStorage.setItem(
  "token",
  res.data.accessToken
);

         toast.success(
        
              "Login Successful 🛒",
            
      {

        position: "top-right",

        autoClose: 1000
      }
              
        );

        navigate("/checkout");

      } else {

        // ✅ REGISTER
        const res = await API.post(
          "/users/register",
          {
            username,
            email,
            password
          }
        );

        console.log("REGISTER:", res.data);

        toast.success(
        
              "Registration Successful 🛒",
            
      {

        position: "top-right",

        autoClose: 1000
      }

    )
        setIsLogin(true);
      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (

    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <h2>

          {isLogin
            ? "Login"
            : "Create new Account"}

        </h2>

        {/* REGISTER ONLY */}
        {

          !isLogin && (

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              required
            />
          )
        }

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <button type="submit">

          {isLogin
            ? "Login"
            : "Register"}

        </button>

        <p className="switch-auth">

  {

    isLogin ? (

      <>
        Don't have an account?

        <span
          onClick={() => setIsLogin(false)}
          className="switch-link"
        >
          Signup
        </span>
      </>

    ) : (

      <>
        Already have an account?

        <span
          onClick={() => setIsLogin(true)}
          className="switch-link"
        >
          Login
        </span>
      </>
    )
  }

</p>
      </form>

    </div>
  );
}

export default Login;