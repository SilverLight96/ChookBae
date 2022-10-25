import React from "react";
import styled from "styled-components";
import { BrowserRouter,Route, Routes } from "react-router-dom";

//routes
import MainPage from './Routes/MainPage';
import LoginPage from './Routes/LoginPage';
import SignUpPage from './Routes/SignUpPage';
import MatchPage from './Routes/MatchPage';
import MatchCountryDetail from './Routes/MatchCountryDetail'
import MatchDateDetail from './Routes/MatchDateDetail'


function App() {
  return (
    <BrowserRouter>    
    <Routes>
        <Route path="" element={<MainPage/>}/>
        <Route path="/Match" element={<MatchPage type='country'/>}/>
        <Route path="/Match/Country" element={<MatchCountryDetail/>}/>
        <Route path="/Match/Date" element={<MatchDateDetail/>}/>

    </Routes> 
  </BrowserRouter>
  );
}

export default App;

