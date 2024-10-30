import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css"
import { cartContext } from "../../Context/CartContext";
function Cart() {

    let {getLoggedUserCart} = useContext(cartContext);
    const [cartDetails,setCartDetails] = useState(null);


  async  function getCart () {
        let {data} = await getLoggedUserCart();
        setCartDetails(data);
    }
    useEffect(()=> {
        getCart();
    },[])
    return <>
    {cartDetails?  <div className="w-75 mx-auto my-3 p-3  bg-main-light">
        <h3>Shopping Cart</h3>
        <h4 className="h6">Cart Items : {cartDetails.numOfCartItems}</h4>
    </div>:""}
  
    </> 
    ;
}

export default Cart;