import React from "react";
import styled from "styled-components";
import { BrowserRouter,Route, Routes, Link } from "react-router-dom";

//routes
import MainPage from './Routes/MainPage';
import LoginPage from './Routes/LoginPage';
import SignUpPage from './Routes/SignUpPage';
import MatchPage from './Routes/MatchPage';
import MatchCountryDetail from './Routes/MatchCountryDetail'
import MatchDateDetail from './Routes/MatchDateDetail'
import ProfilePage from "./Routes/ProfilePage";
import NavBar from "./Components/common/NavBar";
import PredictionPage from "./Routes/PredictionPage";
import PlayerGetPage from "./Routes/PlayerGetPage";
import AccountPage from "./Routes/AccountPage";
import ActivatePage from "./Routes/ActivatePage";

function App() {
  return (
    <BrowserRouter>    
    <NavBar/>
    <Routes>
        <Route path="" element={<MainPage/>}/>
        <Route path="/Match" element={<MatchPage type='country'/>}/>
        <Route path="/Match/Country" element={<MatchCountryDetail/>}/>
        <Route path="/Match/Date" element={<MatchDateDetail/>}/>
        <Route path="/profile/*" element={<ProfilePage/>}/>
        <Route path="/account" element={<AccountPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/prediction" element={<PredictionPage/>}/>
        <Route path="/playerget" element={<PlayerGetPage/>}/>
        <Route path="/v1/accounts/activate/*" element={<ActivatePage/>}/>
    </Routes> 
  </BrowserRouter>
  );
}

export default App;

