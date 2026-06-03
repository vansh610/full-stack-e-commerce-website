import React, { useEffect, useState } from 'react';

import API from "../../api/api";

import bg from "../../assets/bg0.gif";

import "./Home.css";

import { category } from '../../category';

import Product from '../../components/Product/Product';

function Home() {

    const [products, setProducts] = useState([]);

    const [filteredProducts, setFilteredProducts] =
        useState([]);

    const [selectedCategory, setSelectedCategory] =
        useState("Trending Products");

    // FETCH PRODUCTS

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const res =
                    await API.get("/products");

                setProducts(res.data.products);

                // SHOW ONLY FIRST 8 PRODUCTS INITIALLY

                setFilteredProducts(
                    res.data.products.slice(0, 8)
                );

            } catch (error) {

                console.log(error);
            }
        };

        fetchProducts();

    }, []);

    // CATEGORY FILTER

    const filterProducts = (categoryName) => {

        // ALL CATEGORY

        if (
            categoryName.toLowerCase() === "all"
        ) {

            setFilteredProducts(
                products.slice(0, 8)
            );

            setSelectedCategory(
                "Trending Products"
            );

        } else {

            const updatedProducts =
                products.filter(

                    (item) =>

                        item.category
                            ?.toLowerCase()
                            ===
                        categoryName
                            .toLowerCase()
                );

            setFilteredProducts(
                updatedProducts
            );

            setSelectedCategory(
                categoryName
            );
        }

        // AUTO SCROLL

        document
            .querySelector(".product-section")
            ?.scrollIntoView({

                behavior: "smooth"
            });
    };

    return (

        <div className='Home'>

            {/* HERO SECTION */}

            <div className="hero-bg">

                <img
                    src={bg}
                    alt="hero"
                />

            </div>

            {/* CATEGORY SECTION */}

            <div className="category-section-wrapper">

                <div className="category-section">

                    {

                    category.map((item) => (

                        <div
                            key={item.id}
                            className="category-card"
                            onClick={() =>
                                filterProducts(
                                    item.name
                                )
                            }
                        >

                            <img
                                src={item.image}
                                alt=""
                            />

                            <span>

                                {item.name}

                            </span>

                        </div>
                    ))
                    }

                </div>

            </div>

            {/* HEADING */}

            <h1>

                {selectedCategory}

            </h1>

            {/* PRODUCTS */}

            <div className="product-section">

                {

                filteredProducts.length > 0 ? (

                    filteredProducts.map((item) => (

                        <Product
                            key={item._id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            id={item._id}
                        />
                    ))

                ) : (

                    <h2 className='no-product'>

                        No Products Found

                    </h2>
                )
                }

            </div>

        </div>
    );
}

export default Home;