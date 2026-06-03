import React, { useEffect, useState } from "react";

import "./shop.css";

import { category } from "../../category";

import { FaShopify } from "react-icons/fa";

import Product from "../../components/Product/Product";

import API from "../../api/api";

import { useLocation } from "react-router-dom";

function Shop() {

  const [products, setProducts] = useState([]);

  const [cate, setcate] = useState([]);

  const location = useLocation();

  // FETCH PRODUCTS

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await API.get("/products");

        const allProducts =
          res.data.products;

        setProducts(allProducts);


        
        // SEARCH PARAM

        const searchParams =
          new URLSearchParams(
            location.search
          );

        const search =
          searchParams.get("search");

            console.log("Search Value:", search);
          console.log("Products:", allProducts);

        if (search) {

  const filtered =
  allProducts.filter((item) => {

    console.log(
      "Checking:",
      item.title,
      "Search:",
      search
    );

    return item.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

  });

console.log("Filtered:", filtered);

  setcate(filtered);

} else {

  setcate(allProducts);
}

      } catch (error) {

        console.log(error);
      }
    };

    fetchProducts();

  }, [location.search]);

  // CATEGORY FILTER

  function filterProducts(
    categoryName
  ) {

    if (categoryName === "All") {

      setcate(products);

      return;
    }

    const updatedata =
      products.filter(

        (item) =>

          item.category
            ?.toLowerCase()

            ===

          categoryName
            .toLowerCase()

      );

    setcate(updatedata);
  }

  return (

    <div className="shop">

      <div className="Heading">

        <span>

          Shop

        </span>

        <FaShopify />

      </div>

      <div className="Category-section-wrapper">

        <div
          className="category-card"
          onClick={() =>
            filterProducts("All")
          }
        >

          <div className="category-all">

            All

          </div>

        </div>

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

      <div className="product-section">

        {

          cate.length > 0 ?

          (

            cate.map((item) => (

              <Product

                key={item._id}

                id={item._id}

                title={item.title || item.name}

                price={item.price}

                image={item.image}

              />

            ))

          )

          :

          (

            <h2>

              No Products Found

            </h2>

          )

        }

      </div>

    </div>

  );
}

export default Shop;





// import React, { useEffect, useRef, useState } from 'react';

// import "./shop.css";

// import { category } from "../../category";

// import { FaShopify } from "react-icons/fa";

// import Product from '../../components/Product/Product';

// import { GiPlayButton } from "react-icons/gi";

// import { GiPreviousButton } from "react-icons/gi";

// import API from "../../api/api";

// function Shop() {

//   const [products, setProducts] = useState([]);

//   const [cate, setcate] = useState([]);

//   const scrollRef = useRef();

//   // FETCH PRODUCTS
//   useEffect(() => {

//     const fetchProducts = async () => {

//       try {

//         const res = await API.get("/products");

//         console.log(res.data.products);

//         setProducts(res.data.products);

//         setcate(res.data.products);

//       } catch (error) {

//         console.log(error);

//       }
//     };

//     fetchProducts();

//   }, []);

//   // CATEGORY FILTER
//   function filterProducts(categoryName) {

//     if (categoryName === "All") {

//       setcate(products);

//     } else {

//       const updatedata = products.filter(

//         (item) => item.category === categoryName

//       );

//       setcate(updatedata);
//     }
//   }

//   // SCROLL
//   const scrollCategories = (scrollOffset) => {

//     scrollRef.current.scrollBy({

//       left: scrollOffset,

//       behavior: "smooth",
//     });
//   };

//   return (

//     <div className='shop'>

//       <div className="Heading">

//         <span>Shop</span>

//         <FaShopify />

//       </div>

//       {/* CATEGORY SECTION */}
//       <div className="Category-section-wrapper">

//         <button
//           className="scroll-btn left"
//           onClick={() => scrollCategories(-200)}
//         >

//           <GiPreviousButton />

//         </button>

//         <div className="Category-section" ref={scrollRef}>

//           {category.map((item) => (

//             <div
//               key={item.id}
//               className="category-card"
//               onClick={() => {

//                 filterProducts(item.name);

//               }}
//             >

//               <img src={item.image} alt="" />

//               <span>{item.name}</span>

//             </div>

//           ))}

//         </div>

//         <button
//           className="scroll-btn right"
//           onClick={() => scrollCategories(200)}
//         >

//           <GiPlayButton />

//         </button>

//       </div>

//       {/* PRODUCTS */}
//       <div className="product-section">

//         {cate.map((item) => (

//           <Product
//             key={item._id}
//             id={item._id}
//             title={item.title}
//             price={item.price}
//             image={item.image}
//           />

//         ))}

//       </div>

//     </div>
//   );
// }

// export default Shop;