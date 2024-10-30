import React, { useContext } from "react";
import Style from "./FeaturedProducts.module.css"; // Ensure this file exists
import axios from "axios";
import Loading from "../Loading/Loading"; // Ensure this component exists
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext"; // Ensure the CartContext is properly defined
import toast from 'react-hot-toast';

// Define the shape of the product object
interface ProductType {
  _id: string;
  imageCover: string;
  title: string;
  category: {
    name: string;
  };
  price: number;
  ratingsAverage: number;
}

function FeaturedProducts() {
  const cart = useContext(cartContext);

  // Ensure the context is not undefined
  if (!cart) {
    throw new Error("FeaturedProducts must be used within a CartContextProvider");
  }

  const { addToCart } = cart;

  // Function to add a product to the cart
  async function addProduct(productId: number) {
    try {
      const response = await addToCart(productId);
      if (response.status === "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error("Error adding product to cart:", error);
    }
  }

  // Function to fetch featured products
  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  // Use React Query to fetch the products
  const { isLoading, isError, data } = useQuery("featuredProducts", getFeaturedProducts, {
    refetchInterval: 5000, // Optional, adjust based on your needs
  });

  // Handling loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handling error state
  if (isError) {
    return <div>Error loading featured products</div>;
  }

  return (
    <div className="py-2">
      <h2>Featured Products</h2>
      <div className="row gy-4">
        {data?.data.data.map((product: ProductType) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );

  // Component to render individual product
  function Product({ product }: { product: ProductType }) {
    return (
      <div className="col-md-3">
        <div className={`product overflow-hidden cursor-pointer p-2 ${Style.product}`}>
          <Link to={`/productdetails/${product._id}`}>
            <img src={product.imageCover} className="w-100" alt={product.title} />
            <h2 className="h5 main-color">{product.category.name}</h2>
            <p>{product.title}</p>
            <div className="box d-flex justify-content-between">
              <span>{product.price} EGP</span>
              <span>
                {product.ratingsAverage} <i className="fa-solid fa-star rating-color"></i>
              </span>
            </div>
          </Link>
          <button onClick={() => addProduct(Number(product._id))} className="btn bg-main text-white w-100">
  Add To Cart
</button>
        </div>
      </div>
    );
  }
}

export default FeaturedProducts;
