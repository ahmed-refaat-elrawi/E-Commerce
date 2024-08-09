import React, { useState } from "react";
import Style from "./Register.module.css"
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";



function Register() {
let navigate = useNavigate();
const [error,setError] = useState(null);
const [isLoading,setIsLoading] = useState(false);

    const registerSubmit = async (values) => {
        setIsLoading(true);
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
        .catch (
            (err) => {
                setIsLoading(false);
                setError(err.response.data.message)
            }

        )
        if (data.message === 'success') {
            setIsLoading(false);
            navigate('/Login')
        }
        console.log(values);
    }

    const validate = (values) => {
        let errors = {};
        const phoneRegex = /^(?:\+20|0)?(?:1[0125][0-9]{8}|2[0-9]{8}|[34][0-9]{7})$/;
        const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!values.name) {
            errors.name = "Name is required";
        }
        else if (values.name.length < 3) {
            errors.name = "Name minimum length is 3"
        }
        else if (values.name.length > 10) {
            errors.name = "Name maximum length is 10"
        }
        if (!values.phone) {
            errors.phone = "Phone is required";
        }
        else if (!phoneRegex.test(values.phone)) {
            errors.phone = "Phone number is invalid"
        }
       
        if (!values.email) {
            errors.email = "Email is required";
        }
        else if (!emailRegex.test(values.email)) {
            errors.email = "Email is invalid"
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        else if (!passwordRegex.test(values.password)) {
            errors.password = "Password must contain One lowercase letter ,One uppercase letter, One digit, One special character (e.g., !@#$%^&*), Minimum length of 8 characters";
        }
        if (!values.rePassword) {
            errors.rePassword = "rePassword is required";
        }
        else if (values.rePassword !== values.password) {
            errors.rePassword = "Password and rePassword don't match"
        }

         return errors;
       
    }
let formik = useFormik({
 initialValues:   {
    name: "",
    phone:"",
    email:"",
    password:"",
    rePassword:""
    },
    validate
    ,
    onSubmit:registerSubmit
})
    return <>
<div className=" w-75 mx-auto pt-4">
    <h2>Register Now</h2>
    <form onSubmit={formik.handleSubmit}>
        <label className="form-label" htmlFor="name">Name : </label>
        <input className=" form-control mb-2" id="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text"   name="name"/>
        {formik.errors.name && formik.touched.name? <div className="alert alert-danger mt-2 py-2">{formik.errors.name}</div>:""}
        <label className="form-label" htmlFor="phone">Phone : </label>
        <input className=" form-control mb-2" id="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel"   name="phone" />
        {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger mt-2 py-2">{formik.errors.phone}</div>:""}
       <label className="form-label" htmlFor="email">Email : </label>
        <input className=" form-control mb-2" id="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email"   name="email" />
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 py-2">{formik.errors.email}</div>:""}
        <label className="form-label" htmlFor="password">Password : </label>
        <input className=" form-control mb-2" id="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password"   name="password" />
        {formik.errors.password && formik.touched.password? <div className="alert alert-danger mt-2 py-2">{formik.errors.password}</div>:""}
        <label className="form-label" htmlFor="rePassword">RePassword : </label>
        <input className=" form-control mb-2" id="rePassword" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password"   name="rePassword" />
        {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger mt-2 py-2">{formik.errors.rePassword}</div>:""}
       
       {isLoading? <button className="btn bg-main text-white " type="button">
        <Audio height="20" width= "80" raduis = "9" color = "white" ariaLabel="three-dots-loading" wrapperClass wrapperStyle/>
       </button>:  <button disabled = {!formik.isValid} type="submit" className=" btn bg-main text-white">Register</button>}
       
    </form>
    
</div>
    </> 
    ;
}

export default Register;