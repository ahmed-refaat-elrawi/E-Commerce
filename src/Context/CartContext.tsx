import axios, { AxiosResponse } from "axios";
import { createContext, useContext, useState } from "react";

// Define interface for context values
interface CartContextType {
  addToCart: (productId: number) => Promise<any>;
  getLoggedUserCart: () => Promise<any>;
}

// Create the context
export const cartContext = createContext<CartContextType | undefined>(undefined);

// Define props interface for CartContextProvider
interface CartContextProviderProps {
  children: React.ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  // Initialize headers state
  const [headers] = useState({
    token: localStorage.getItem("userToken")
  });

  // Implement addToCart function
  const addToCart = async (productId: number): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  // Implement getLoggedUserCart function
  const getLoggedUserCart = async (): Promise<any> => {
    try {
      const response: AxiosResponse = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting logged user cart:", error);
      throw error;
    }
  };

  // Return the provider with typed value
  return (
    <cartContext.Provider value={{ addToCart, getLoggedUserCart }}>
      {children}
    </cartContext.Provider>
  );
}

// Usage example:
function CartComponent() {
  const cart = useContext(cartContext);

  if (!cart) {
    throw new Error("CartComponent must be used within a CartContextProvider");
  }

  const { addToCart, getLoggedUserCart } = cart;

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId);
      console.log("Product added to cart successfully");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const cartData = await getLoggedUserCart();
      console.log("Your cart:", cartData);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };
}
