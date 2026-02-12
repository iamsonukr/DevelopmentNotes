import { useSelector } from "react-redux"

const AddToCart=()=>{
    const cartData=useSelector((state)=>state.cart);

    return(
        <div className="actions">
        <div className="cart">
          🛒 <span className="count">{cartData.value}</span>
        </div>
        <button  className="btn">Login</button>
      </div>
    )
}

export default AddToCart