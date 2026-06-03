import React from 'react'
import { AiFillDelete } from "react-icons/ai"
import "./CartCard.css"
import image1 from "../../assets/image1.jpg"
import { useDispatch } from 'react-redux'
import { RemoveItem } from '../../redux/cartSlice'
function CartCard({name,price,image,id,item,handleBuyNow}) {
    let dispatch=useDispatch()
  return (
    <div className='cartCard'>
        <div className="left-card">
        <img src={image} alt="" />
        <div className="name-price">
            <span>{name}</span>
            <span>Rs {price}/-</span>
        </div>
        </div>
        <div className="right-card">
            <button onClick={()=>{
                dispatch(RemoveItem(id))
            }}>Remove <AiFillDelete /></button>
            <button onClick={()=>handleBuyNow(item)}>
                Buy now
            </button>
        </div>
    </div>
  )
}

export default CartCard