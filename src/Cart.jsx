import { useContext } from "react";
import Modal from "./Modal";
import { CartContext } from "./store/Cartcontext";
import Button from "./Button";
import { userProgressContext } from './store/UserProgresss';
import CartItem from "./CartItems";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userprogressCtx = useContext(userProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose  ()  {
    userprogressCtx.hideCart(); 
  };

  const handleGoToCheckout = () => {
    userprogressCtx.showCheckout(); 
  };

  return (
    <Modal classname="cart" open={userprogressCtx.progress === "cart"} >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          < CartItem 
          price={item.price}
          name={item.name}
          quantity={item.quantity}
          item={item}
          id={item.id}
          />
        ))}
      </ul>
      <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>Close</Button>
      {cartCtx.items.length>0 &&(<Button onClick={handleGoToCheckout}>Go to Checkout</Button>)}  
      </p>
    </Modal>
  );
}
