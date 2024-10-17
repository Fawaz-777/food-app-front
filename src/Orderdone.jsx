import { useContext, useState, useEffect } from "react";
import Modal from "./Modal";
import { userProgressContext } from "./store/UserProgresss";
import CookingAnimation from "./CookingAnimation";
export default function Done() {
    const userProgressCtx = useContext(userProgressContext);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (userProgressCtx.progress === "done") {
            setShowModal(true);
            const timer = setTimeout(() => {
                setShowModal(false);
                userProgressCtx.hideCheckout();
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [userProgressCtx.progress]);

    return (
        <Modal open={showModal}>
            <div className="modal-content">
                <div className="text-container">
                    <p>Order received! Preparing...</p>
                  <CookingAnimation/>
                </div>
                
               
                
            </div>
        </Modal>
    );
}
