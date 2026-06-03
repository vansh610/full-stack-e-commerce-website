import {useNavigate  } from "react-router-dom";
import "./product.css"
function ProductCard({id,name,price,image}){
    const navigate=useNavigate()

    return(
        <div onClick={()=>{
        console.log("clicked id:", id);
        navigate(`/product/${id}`)}}>
            <img src={image} alt="" />
            <h3>{name}</h3>
            <p>{price}</p>
        </div>
    )
}
export default ProductCard