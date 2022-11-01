import React from "react";
import styled from "styled-components";
import { BrowserRouter,Route, Routes, Link } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { loggedinState } from "./atoms";
import { useRecoilValue } from "recoil";

//routes
import MainPage from './Routes/MainPage';
import LoginPage from './Routes/LoginPage';
import SignUpPage from './Routes/SignUpPage';
import MatchPage from './Routes/MatchPage';
// import MatchCountryDetail from './Routes/MatchCountryDetail'
import MatchDetail from './Routes/MatchDetail'
import ProfilePage from "./Routes/ProfilePage";
import NavBar from "./Components/common/NavBar";
import PredictionPage from "./Routes/PredictionPage";
import PlayerGetPage from "./Routes/PlayerGetPage";
import AccountPage from "./Routes/AccountPage";
import ActivatePage from "./Routes/ActivatePage";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  const loggedin = useRecoilValue(loggedinState);
  return (
    <CookiesProvider>
      <BrowserRouter>    
      <NavBar/>
      <Routes>  
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/account" element={<AccountPage/>}/>    
        <Route element={<ProtectedRoute loggedin={loggedin} />}>
          <Route path="/profile/*" element={<ProfilePage/>}/>
          <Route path="/prediction" element={<PredictionPage/>}/>
          <Route path="/playerget" element={<PlayerGetPage/>}/>
        </Route>
          <Route path="" element={<MainPage/>}/>
          <Route path="/Match" element={<MatchPage type='country'/>}/>
          <Route path="/Match/Detail" element={<MatchDetail/>}/>
          <Route path="/accounts/activate" element={<ActivatePage/>}/>
      </Routes> 
    </BrowserRouter>
  </CookiesProvider>
  );
}

export default App;

