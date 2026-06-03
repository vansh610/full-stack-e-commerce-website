import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./OrderSuccess.css"
function OrderSuccess() {
    const navigate=useNavigate()
     
  return (
    <div className="success">
        <h1>Congrats Order Placed Successfully</h1>
        <p>Your order has been confirmed</p>
        <button onClick={()=>navigate("/")}>
            Continue Shopping
        </button>
    </div>
  )
}

export default OrderSuccess