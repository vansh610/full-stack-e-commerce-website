import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/authSlice";

import { FaShopify } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";

import API from "../../api/api";

import "./Nav.css";

function Nav() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) => state.cart
    );

    const user = useSelector(
        (state) => state.auth.user
    );

    const [search, setSearch] = useState("");

    const [allProducts, setAllProducts] =
        useState([]);

    const [suggestions, setSuggestions] =
        useState([]);

    const [showBottomNav, setShowBottomNav] =
        useState(true);

    // FETCH PRODUCTS

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const res =
                    await API.get("/products");

                setAllProducts(
                    res.data.products
                );

            } catch (error) {

                console.log(error);
            }
        };

        fetchProducts();

    }, []);

    // SCROLL EFFECT

    useEffect(() => {

        let lastScroll = 0;

        const handleScroll = () => {

            if (
                window.scrollY > lastScroll &&
                window.scrollY > 100
            ) {

                setShowBottomNav(false);

            } else {

                setShowBottomNav(true);
            }

            lastScroll = window.scrollY;
        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };

    }, []);

    // SEARCH

    const handleSearchChange = (e) => {

        const value = e.target.value;

        setSearch(value);

        if (!value.trim()) {

            setSuggestions([]);

            return;
        }

        const filtered =
            allProducts.filter((item) =>
                item.title
                    ?.toLowerCase()
                    .includes(
                        value.toLowerCase()
                    )
            );

        setSuggestions(
            filtered.slice(0, 8)
        );
    };

    const handleSuggestionClick = (
        product
    ) => {

        setSearch("");

        setSuggestions([]);

        navigate(
            `/product/${product._id}`
        );
    };

    const handleSearch = (e) => {

        e.preventDefault();

        if (!suggestions.length) return;

        navigate(
            `/product/${suggestions[0]._id}`
        );

        setSearch("");

        setSuggestions([]);
    };

    // LOGOUT

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        dispatch(logout());

        navigate("/");
    };

    return (

        <div className="nav">

            <div className="top-nav">

                {/* LOGO */}

                <Link
                    to="/"
                    className="logo-link"
                >

                    <div className="logo">

                        <FaShopify />

                        <span>
                            V-Shop
                        </span>

                    </div>

                </Link>

                {/* SEARCH */}

                <div
                    className="search-wrapper"
                >

                    <form
                        className="search-box"
                        onSubmit={
                            handleSearch
                        }
                    >

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={
                                handleSearchChange
                            }
                        />

                        <button
                            type="submit"
                        >

                            <IoIosSearch />

                        </button>

                    </form>

                    {suggestions.length >
                        0 && (

                        <div className="search-dropdown">

                            {suggestions.map(
                                (
                                    product
                                ) => (

                                    <div
                                        key={
                                            product._id
                                        }
                                        className="search-item"
                                        onClick={() =>
                                            handleSuggestionClick(
                                                product
                                            )
                                        }
                                    >

                                        <img
                                            src={
                                                product.image
                                            }
                                            alt=""
                                        />

                                        <div>

                                            <h4>

                                                {
                                                    product.title
                                                }

                                            </h4>

                                            <p>

                                                ₹
                                                {
                                                    product.price
                                                }

                                            </p>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </div>

                {/* RIGHT */}

                <div className="nav-right">

                    {!user ? (

                        <Link
                            to="/login"
                        >

                            <button className="auth-btn">

                                Login /
                                Signup

                            </button>

                        </Link>

                    ) : (

                        <div className="profile-box">

                            <div className="profile-circle">

                                {user.username
                                    ?.charAt(
                                        0
                                    )
                                    .toUpperCase()}

                            </div>

                            <div className="profile-info">

                                <span className="hello">

                                    Hello,

                                </span>

                                <span className="username">

                                    {
                                        user.username
                                    }

                                </span>

                            </div>

                            <button
                                className="logout-btn"
                                onClick={
                                    handleLogout
                                }
                            >

                                Logout

                            </button>

                        </div>
                    )}

                    <Link to="/cart">

                        <div className="cart-box">

                            <FiShoppingCart />

                            <span>

                                {
                                    cartItems.length
                                }

                            </span>

                        </div>

                    </Link>

                </div>

            </div>

            {/* BOTTOM NAV */}

            <div
                className={`bottom-nav ${
                    showBottomNav
                        ? "show"
                        : "hide"
                }`}
            >

                <Link to="/">
                    <li>Home</li>
                </Link>

                <Link to="/shop">
                    <li>Shop</li>
                </Link>

                <Link to="/cart">
                    <li>Cart</li>
                </Link>

                <Link to="/contact">
                    <li>Contact</li>
                </Link>

            </div>

        </div>
    );
}

export default Nav;







