import React from "react";
import { BrowserRouter,Route, Routes, Link } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { loggedinState } from "./atoms";
import { useRecoilValue } from "recoil";
import GlobalStyles from "./styles/GlobalStyle";

//routes
import MainPage from './Routes/MainPage';
import LoginPage from './Routes/LoginPage';
import SignUpPage from './Routes/SignUpPage';
import MatchPage from './Routes/MatchPage';
// import MatchCountryDetail from './Routes/MatchCountryDetail'
import MatchDetail from './Routes/MatchDetail'
import ProfilePage from "./Routes/ProfilePage";
import GachaPage from "./Routes/GachaPage";
import NavBar from "./Components/common/NavBar";
import AccountPage from "./Routes/AccountPage";
import ActivatePage from "./Routes/ActivatePage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import MixPage from "./Routes/MixPage";
import PredictList from "./Routes/PredictList"
import PredictDetail from "./Routes/PredictDetail"
import TeamInfo from "./Routes/TeamInfo"

import RankPage from "./Routes/RankPage";
import PlayerRanking from "./Routes/PlayerRanking";

function App() {
  const loggedin = useRecoilValue(loggedinState);
  return (
    <CookiesProvider>
      <GlobalStyles/>
      <BrowserRouter >    
      <NavBar/>
      <Routes>  
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/account" element={<AccountPage/>}/>    
        <Route element={<ProtectedRoute loggedin={loggedin} />}>
          <Route path="/profile/*" element={<ProfilePage/>}/>
          <Route path="/PredictDetail" element={<PredictDetail/>}/>
          <Route path="/PredictList" element={<PredictList/>}/>
          <Route path="/gacha" element={<GachaPage/>}/>
          <Route path="/mix" element={<MixPage/>}/>
        </Route>
          <Route path="" element={<MainPage/>}/>
          <Route path="/Match" element={<MatchPage type='country'/>}/>
          <Route path="/Match/Detail" element={<MatchDetail/>}/>
          <Route path="/TeamInfo" element={<TeamInfo/>}/>
          <Route path="/accounts/activate" element={<ActivatePage/>}/>

          <Route path="/ranking" element={<RankPage/>}/>
          <Route path="/playerRanking" element={<PlayerRanking/>}/>
      </Routes> 
    </BrowserRouter>
  </CookiesProvider>
  );
}

export default App;

