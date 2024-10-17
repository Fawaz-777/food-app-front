import Header from "./Header";
import Menu from "./Menu";
import {CartContextProvider} from './store/Cartcontext.jsx'
import {UserProgressContextProvider} from "./store/UserProgresss.jsx"
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import Done from "./Orderdone.jsx";
function App() {
  return (
    <>
      <CartContextProvider>
        <UserProgressContextProvider>
          <Header />
          <Menu />
          <Cart />
          <Checkout/>
          <Done />
        </UserProgressContextProvider>
      </CartContextProvider>
    </>
  );
}
export default App;
