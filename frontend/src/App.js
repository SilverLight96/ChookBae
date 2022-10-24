import React from "react";
import styled from "styled-components";
import { BrowserRouter,Route, Routes } from "react-router-dom";

//routes
import MainPage from './Routes/MainPage';
import LoginPage from './Routes/LoginPage';
import SignUpPage from './Routes/SignUpPage';


function App() {
  return (
    <BrowserRouter>    
    <Routes>
        <Route path="" element={<MainPage/>}/>
    </Routes> 
  </BrowserRouter>
  );
}

export default App;

