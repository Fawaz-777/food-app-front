import { useContext } from "react"
import { CartContext } from "./store/Cartcontext"

export default function CartItem({name,quantity,price,item,id}){

    const cartCtx=useContext(CartContext);
    function additem(){
        cartCtx.addItem(item);
    }
    function removeitem(){
        cartCtx.removeItem(id);

    }
    return( <li className="cart-item">
        <p>{name} - {quantity} * {price}</p>
        <p className="cart-item-actions">
            <button onClick={removeitem} >-</button>
            <span>{quantity}</span>
            <button onClick={additem}>+</button>

        </p>
        
         </li>)
}