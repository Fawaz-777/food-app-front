import { createContext, useReducer } from "react";

// Create CartContext
const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
});

// Reducer function to handle add and remove actions
function cartReducer(state, action) {
    
    if (action.type === "ADD_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
      
        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
       
        const existingItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];

        if (existingItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    return state;
}

// CartContextProvider component
const CartContextProvider = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    // Add item to cart
    function addItemToCart(item) {
        dispatchCartAction({ type: "ADD_ITEM", item: item });
    }

    // Remove item from cart
    function removeItemFromCart(id) {
        dispatchCartAction({ type: "REMOVE_ITEM", id: id });
    }

    // Context value to be passed to the provider
    const cartContextValue = {
        items: cartState.items,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
    };
console.log(CartContext);
    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContextProvider, CartContext };
