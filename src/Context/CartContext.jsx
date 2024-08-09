import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext();

export default function CartContextProvider (props) {
    let headers = {
        token: localStorage.getItem("userToken")
    }
    function addToCart (productId) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId
        },{
            headers
        }).then((response) => response).catch((error) => error)
    }

    function getLoggedUserCart () {
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart",
            {
            headers
        }).then((response) => response).catch((error) => error)
    }

return <cartContext.Provider value={{addToCart,getLoggedUserCart}}>
    {props.children}
</cartContext.Provider>
}