import React from "react";
import styled from "styled-components";
import { BrowserRouter,Route, Routes, Link } from "react-router-dom";

//routes
import MainPage from './Routes/MainPage';
import LoginPage from './Routes/LoginPage';
import SignUpPage from './Routes/SignUpPage';
import ProfilePage from "./Routes/ProfilePage";
import NavBar from "./Components/common/NavBar";
import PredictionPage from "./Routes/PredictionPage";
import PlayerGetPage from "./Routes/PlayerGetPage";
import MatchInfoPage from "./Routes/MatchInfo";
import AccountPage from "./Routes/AccountPage";


function App() {
  return (
    <BrowserRouter>    
    <NavBar/>
    <Routes>
        <Route path="" element={<MainPage/>}/>
        <Route path="/profile/*" element={<ProfilePage/>}/>
        <Route path="/account" element={<AccountPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/prediction" element={<PredictionPage/>}/>
        <Route path="/playerget" element={<PlayerGetPage/>}/>
        <Route path="/matchinfo" element={<MatchInfoPage/>}/>
    </Routes> 
  </BrowserRouter>
  );
}

export default App;

