import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import { toast } from "react-toastify";

import API from "../api/api";

import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const location = useLocation();

  const cartItems =
    useSelector((state) => state.cart) || [];

  // BUY NOW PRODUCT
  const buyNowProduct =
    location.state?.product;

  const buyNow =
    location.state?.buyNow;

  // USE BUY NOW PRODUCT OR CART ITEMS
  const items = buyNow
    ? [buyNowProduct]
    : cartItems;

  const total = items.reduce(
    (a, b) => a + Number(b.price),
    0
  );

  const [name, setName] = useState("");

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [pincode, setPincode] =
    useState("");

  const [payment, setPayment] =
    useState("");

  if (!items.length) {

    return (

      <div className="empty-cart">

        <h2>Your Cart is Empty</h2>

      </div>
    );
  }

  const handlePayment = async () => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;
    }

    if (
      !name ||
      !address ||
      !city ||
      !pincode ||
      !payment
    ) {

      alert("Please fill all details");

      return;
    }

    try {

      const { data } =
        await API.post(
          "/payment/create-order",
          {
            amount: total
          }
        );

      const options = {

        key:
          "rzp_test_SrcM2id3DT5AM5",

        amount: data.amount,

        currency: data.currency,

        order_id: data.id,

        name: "V-Shop",

        description:
          "Product Payment",

        handler: async function (
          response
        ) {

          try {

            await API.post(
              "/payment/verify",
              response
            );

            await API.post(
              "/orders/create",
              {
                items,
                totalAmount: total
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

            toast.success(
              "Order Placed Successfully 🎉"
            );

            navigate(
              "/ordersuccess"
            );

          } catch (error) {

            console.log(error);

            toast.error(
              "Payment Verification Failed"
            );
          }
        },

        prefill: {

          name,

          email:
            "test@gmail.com",

          contact:
            "9999999999"
        },

        theme: {

          color: "#ff9900"
        }
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );
    }
  };

  return (

    <div className="checkout">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* LEFT */}

        <div className="checkout-left">

          <div className="checkout-box">

            <h2>
              Delivery Address
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) =>
                setCity(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) =>
                setPincode(
                  e.target.value
                )
              }
            />

          </div>

          <div className="checkout-box">

            <h2>
              Payment Method
            </h2>

            <label>

              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) =>
                  setPayment(
                    e.target.value
                  )
                }
              />

              UPI

            </label>

            <label>

              <input
                type="radio"
                name="payment"
                value="Card"
                onChange={(e) =>
                  setPayment(
                    e.target.value
                  )
                }
              />

              Card

            </label>

            <label>

              <input
                type="radio"
                name="payment"
                value="COD"
                onChange={(e) =>
                  setPayment(
                    e.target.value
                  )
                }
              />

              Cash On Delivery

            </label>

          </div>

        </div>

        {/* RIGHT */}

        <div className="checkout-right">

          {items.map((item) => (

            <div
              key={item.id}
              className="checkout-item"
            >

              <img
                src={item.image}
                alt=""
              />

              <div>

                <p>
                  {item.name}
                </p>

                <h3>
                  ₹{item.price}
                </h3>

              </div>

            </div>
          ))}

          <hr />

          <h2>

            Total : ₹{total}

          </h2>

          <button
            className="place-order-btn"
            onClick={handlePayment}
          >

            Pay & Place Order

          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;




// import React, { useState } from "react";

// import { useNavigate } from "react-router-dom";

// import { useSelector } from "react-redux";

// import { toast } from "react-toastify";

// import API from "../api/api";

// import "./Checkout.css";

// function Checkout() {

//   const navigate = useNavigate();

//   const items =
//   useSelector((state) => state.cart) || [];

//   const total = items.reduce(

//     (a, b) => a + Number(b.price),

//     0
//   );

//   const [name, setName] = useState("");

//   const [address, setAddress] = useState("");

//   const [city, setCity] = useState("");

//   const [pincode, setPincode] = useState("");

//   const [payment, setPayment] = useState("");

//   // EMPTY CART
//   if (items.length === 0) {

//     return (

//       <div className="empty-cart">

//         <h2>Your Cart is Empty</h2>

//       </div>
//     );
//   }

//   // PAYMENT FUNCTION
//   const handlePayment = async () => {

//     const token =
//     localStorage.getItem("token");

//     // LOGIN CHECK
//     if (!token) {

//       alert("Please Login First");

//       navigate("/login");

//       return;
//     }

//     // FORM VALIDATION
//     if (

//       name.trim() === "" ||

//       address.trim() === "" ||

//       city.trim() === "" ||

//       pincode.trim() === "" ||

//       payment === ""

//     ) {

//       alert("Please fill all details");

//       return;
//     }

//     try {

//       // CREATE ORDER
//       const { data } =
//       await API.post(

//         "/payment/create-order",

//         {
//           amount: total
//         }
//       );

//       const options = {

//         key:
//         "rzp_test_SrcM2id3DT5AM5",

//         amount: data.amount,

//         currency: data.currency,

//         order_id: data.id,

//         name: "Ecommerce Store",

//         description:
//         "Product Payment",

//         handler: async function (
//           response
//         ) {

//           try {

//             // VERIFY PAYMENT
//             await API.post(

//               "/payment/verify",

//               response
//             );

//             // SAVE ORDER
//             await API.post(

//               "/orders/create",

//               {

//                 items: items,

//                 totalAmount: total
//               },

//               {

//                 headers: {

//                   Authorization:
//                   `Bearer ${token}`
//                 }
//               }
//             );

//             toast.success(

//           "Order Placed Successfully 🎉",

//          {

//             position: "top-right",

//             autoClose: 2500
//            }
//             );

//             navigate(
//               "/ordersuccess"
//             );

//           } catch (error) {

//             console.log(error);

//             toast.success(

//           "Order failed",

//           {

//           position: "top-right",

//           autoClose: 2500
//           }
//           );;
//           }
//         },

//         prefill: {

//           name: name,

//           email:
//           "test@gmail.com",

//           contact:
//           "9999999999"
//         },

//         theme: {

//           color: "#ff9900"
//         }
//       };

//       const razorpay =
//       new window.Razorpay(options);

//       razorpay.open();

//     } catch (error) {

//       console.log(error);

//       alert("Something went wrong");
//     }
//   };

//   return (

//     <div className="checkout">

//       <h1>Checkout</h1>

//       <div className="checkout-container">

//         {/* LEFT */}
//         <div className="checkout-left">

//           <div className="checkout-box">

//             <h2>
//               Delivery Address
//             </h2>

//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) =>
//                 setName(
//                   e.target.value
//                 )
//               }
//             />

//             <input
//               type="text"
//               placeholder="Address"
//               value={address}
//               onChange={(e) =>
//                 setAddress(
//                   e.target.value
//                 )
//               }
//             />

//             <input
//               type="text"
//               placeholder="City"
//               value={city}
//               onChange={(e) =>
//                 setCity(
//                   e.target.value
//                 )
//               }
//             />

//             <input
//               type="text"
//               placeholder="Pincode"
//               value={pincode}
//               onChange={(e) =>
//                 setPincode(
//                   e.target.value
//                 )
//               }
//             />

//           </div>

//           {/* PAYMENT */}
//           <div className="checkout-box">

//             <h2>
//               Payment Method
//             </h2>

//             <div className="payment-method">

//               <label>

//                 <input
//                   type="radio"
//                   name="pay"
//                   value="upi"
//                   onChange={(e) =>
//                     setPayment(
//                       e.target.value
//                     )
//                   }
//                 />

//                 UPI

//               </label>

//               <label>

//                 <input
//                   type="radio"
//                   name="pay"
//                   value="card"
//                   onChange={(e) =>
//                     setPayment(
//                       e.target.value
//                     )
//                   }
//                 />

//                 Debit Card

//               </label>

//               <label>

//                 <input
//                   type="radio"
//                   name="pay"
//                   value="cod"
//                   onChange={(e) =>
//                     setPayment(
//                       e.target.value
//                     )
//                   }
//                 />

//                 Cash On Delivery

//               </label>

//             </div>

//           </div>

//         </div>

//         {/* RIGHT */}
//         <div className="checkout-right">

//           {

//             items.map((item) => (

//               <div
//                 className="checkout-item"
//                 key={item.id}
//               >

//                 <img
//                   src={item.image}
//                   alt=""
//                 />

//                 <div>

//                   <p>{item.name}</p>

//                   <h3>
//                     ₹ {item.price}
//                   </h3>

//                 </div>

//               </div>
//             ))
//           }

//           <hr />

//           <h2>
//             Total: ₹ {total}
//           </h2>

//           <button
//             className="place-order-btn"
//             onClick={handlePayment}
//           >

//             Pay & Place Order

//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Checkout;