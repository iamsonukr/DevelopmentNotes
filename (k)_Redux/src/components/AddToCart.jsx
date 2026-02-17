import { useDispatch, useSelector } from "react-redux"
import { clearCart, removeItem } from "../redux/slice";

const AddToCart=()=>{
    const cartData=useSelector((state)=>state.cart);
    const dispatch=useDispatch()

    return(
        <div className="actions">
        <div className="cart">
          🛒 <span className="count">{cartData.items.length || 0}</span>
        </div>
        
        <button onClick={()=>dispatch(clearCart())}  className="btn">Clear Cart</button>
      </div>
    )
}

export default AddToCart