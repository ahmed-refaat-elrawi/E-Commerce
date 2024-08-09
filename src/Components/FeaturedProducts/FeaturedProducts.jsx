import React, { useContext } from "react";
import Style from "./FeaturedProducts.module.css"
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast  from 'react-hot-toast';

function FeaturedProducts() {
    let {addToCart} = useContext(cartContext);

    async function addProduct (productId) {
        let response = await addToCart(productId);
        if (response.data.status === "success") {
toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
        console.log(response);
    }


    function getFeaturedProducts () {
        return   axios.get("https://ecommerce.routemisr.com/api/v1/products");
     
       
   }
   let {isLoading,isError,data,isFetching,} = useQuery("featuredProducts",getFeaturedProducts,{
       refetchInterval:5000,
    //    enabled:false
   });
   
   
       return <>
       {isLoading?<Loading></Loading>: <div className=" py-2">
         
       <h2>Featured Products</h2>
       <div className="row   gy-4 ">
       
      {data?.data.data.map(product => <Product key={product._id} product = {product}></Product>)}
    </div>
       </div>}
      
    
       </> 
       ;

       function Product ({product}) {
        return <div className=" col-md-3">
           
           <div className=" product overflow-hidden cursor-pointer p-2">
            <Link to={`/productdetails/${product._id}`}>
               <img src={product.imageCover} className="w-100" alt={product.title} />
               <h2 className=" h5 main-color">{product.category.name}</h2>
               <p>{product.title}</p>
               <div className="box d-flex justify-content-between">
                   <span>{product.price} EGP</span>
                   <span>{product.ratingsAverage} <i className=" fa-solid fa-star rating-color"></i></span>
               </div>
           </Link>
               <button onClick={() => addProduct(product._id)} className="btn bg-main text-white w-100">Add To Cart</button>
           </div>
        </div>
       }
    
   }
   
   

export default FeaturedProducts;