import { useContext } from "react";
import Modal from "./Modal";
import { CartContext } from "./store/Cartcontext";
import Input from "./input";
import Button from "./Button";
import { userProgressContext } from "./store/UserProgresss";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(userProgressContext);

    // Log to check if context is working
    console.log("Cart Context:", cartCtx);
    console.log("User Progress Context:", userProgressCtx);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    // Check if the progress is triggering the modal visibility
    console.log("Progress State:", userProgressCtx.progress);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }
    function handleBack() {
        console.log("Closing checkout modal");
        userProgressCtx.showCart();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch("https://food-app-6zxz.onrender.com/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to submit order");
            }
            console.log("your data",customerData);
            // Handle success (e.g., clear cart, show success message, etc.)
        })
        .catch(error => {
            console.error("Error submitting order:", error);
            // Handle error (e.g., show error message)
        });
    }
    

    return (
        <Modal open={userProgressCtx.progress === "checkout"}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: ${cartTotal.toFixed(2)}</p>
                <Input label="Full name" type="text" id="name" />
                <Input label="E-mail address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                <p className="modal-actions">
                    <Button onClick={handleBack} type="button" >
                        back
                    </Button>
                    <Button type="submit" onClick={handleClose}>Submit order</Button>
                </p>
            </form>
        </Modal>
    );
}
