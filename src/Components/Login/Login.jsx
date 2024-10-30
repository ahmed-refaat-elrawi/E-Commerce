import React, { useContext, useState } from "react";
import Style from "./Login.module.css"
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { userContext } from "../../Context/UserContext";


function Login() {
    let {setUserToken} = useContext(userContext);
    let navigate = useNavigate();
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    
        const loginSubmit = async (values) => {
            setIsLoading(true);
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
            .catch (
                (err) => {
                    setIsLoading(false);
                    setError(err.response.data.message)
                }
    
            )
            if (data.message === 'success') {
                setIsLoading(false);
                localStorage.setItem("userToken",data.token)
                setUserToken(data.token);
                navigate('/')
            }
            console.log(values);
        }

    const validate = (values) => {
        let errors = {};
      
        const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
       
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
     
         return errors;
       
    }
let formik = useFormik({
 initialValues:   {
    email:"",
    password:""
    },
    validate
    ,
    onSubmit:loginSubmit
})
    return <>
<div className=" w-75 mx-auto pt-4">
    <h2>Login Now</h2>
    <form onSubmit={formik.handleSubmit}>
       
       
       <label className="form-label" htmlFor="email">Email : </label>
        <input className=" form-control mb-2" id="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email"   name="email" />
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 py-2">{formik.errors.email}</div>:""}
        <label className="form-label" htmlFor="password">Password : </label>
        <input className=" form-control mb-2" id="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password"   name="password" />
        {formik.errors.password && formik.touched.password? <div className="alert alert-danger mt-2 py-2">{formik.errors.password}</div>:""}
    
        {isLoading? <button className="btn bg-main text-white " type="button">
        <BallTriangle height="20" width= "100" raduis = "5" color = "white" ariaLabel="ball-triangle-loading" wrapperClass = {{}} wrapperStyle = "" visible = {true}/>
       </button>:  <button disabled = {!formik.isValid} type="submit" className=" btn bg-main text-white">Login</button>}
       
    </form>
    
</div>
    </> 
    ;
}

export default Login;