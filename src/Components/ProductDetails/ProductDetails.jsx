import React from "react";
import Style from "./ProductDetails.module.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";


function ProductDetails() {
    let params = useParams();
function getProductDetails (id) {
return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}

let {isLoading,data,isError} = useQuery("productDetails",()=> getProductDetails(params.id));
console.log(data?.data.data);
    return <>
    <Helmet>
        <title>{data?.data.data.title}</title>
    </Helmet>
    {data?.data.data? <div className="row py-2 align-items-center">

<div className="col-md-4">
    <img className="w-100" src={data?.data.data.imageCover} alt={data?.data.data.title} />
</div>
<div className="col-md-8">
    <h2 className="h5">{data?.data.data.title}</h2>
    <p >{data?.data.data.description}</p>
    <h6 className=" main-color">{data?.data.data.category.name}</h6>
    <h6 className=" main-color">Price: {data?.data.data.price} EGP</h6>
    <div className="d-flex justify-content-between">
        <span>Ratings Quantity: {data?.data.data.ratingsQuantity}</span>
        <span><i className="fas fa-star rating-color"></i>{data?.data.data.ratingsAverage}</span>
    </div>
    <button className="btn bg-main text-white w-100 mt-2">Add to cart</button>
</div>
    </div>:""}

    </> 
    ;
}

export default ProductDetails;