import { useContext } from 'react'
import Logo from './assets/logo.jpg'
import Button  from './Button'
import { CartContext } from './store/Cartcontext'
import {userProgressContext} from './store/UserProgresss';
export default function Header(){
    const cartCtx=useContext(CartContext);

     const  userProgressCtx= useContext(userProgressContext);

    const totalCartItems=cartCtx.items.reduce((totalNumbeerOfItems,item)=>{
        return totalNumbeerOfItems + item.quantity;
    },0);

    function handelShowCart(){
        userProgressCtx.showCart();
    }
    return(
        <div id="main-header">
            <div id="title">
              <img src={Logo} />
              <h1>React food</h1>         
            </div>
                <Button  onClick={handelShowCart} children={`cart (${totalCartItems})`}/>

        </div>
    )
}