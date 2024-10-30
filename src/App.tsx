import React, { useContext, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import NotFound from "./Components/NotFound/NotFound";
import UserContextProvider, { userContext } from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  const userCtx = useContext(userContext);

  useEffect(() => {
    if (userCtx && localStorage.getItem("userToken") !== null) {
      userCtx.setUserToken(localStorage.getItem("userToken"));
    }
  }, [userCtx]);

  const routers = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "/categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "/brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "/productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "*", element: <ProtectedRoute><NotFound /></ProtectedRoute> },
      ]
    }
  ]);

  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster />
        </CartContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
