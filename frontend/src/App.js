import React from "react";
import styled from "styled-components";
import { BrowserRouter,Route, Routes } from "react-router-dom";

//routes
import MainPage from './Routes/MainPage';
import LoginPage from './Routes/LoginPage';
import SignUpPage from './Routes/SignUpPage';
import MatchPage from './Routes/MatchPage';


function App() {
  return (
    <BrowserRouter>    
    <Routes>
        <Route path="" element={<MainPage/>}/>
        <Route path="/Match" element={<MatchPage type='country'/>}/>
    </Routes> 
  </BrowserRouter>
  );
}

export default App;

