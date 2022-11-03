import React, { useEffect } from "react";
import styled from "styled-components";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { myInformation } from "../atoms";
import { useRecoilState } from "recoil";
import { fetchData } from "../utils/apis/api";

import ProfilePlayerList from "./ProfilePlayerList";
import ProfilePointPage from "./ProfilePoint";
import ProfilePredictionPage from "./ProfilePrediction";
import ProfileCard from "../Components/Profile/ProfileCard";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useRecoilState(myInformation);
  const getUserInfo = async () => {
    return await fetchData.get("/v1/accounts/mypage/").then((res) => {
      console.log(res.data);
      setProfileInfo(res.data);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <Wrapper>
      <ProfileCard props={profileInfo} />
      <ButtonContainer>
        <NavStyle
          className={(props) => {
            return `${props.isActive ? "isActive " : ""}iconContainer`;
          }}
          end
          to=""
        >
          경기 예측
        </NavStyle>
        <NavStyle to="playerlist">선수 목록</NavStyle>
        <NavStyle to="points">포인트 내역</NavStyle>
      </ButtonContainer>

      <Routes path="/profile" element={<ProfilePage />}>
        <Route path="" element={<ProfilePredictionPage />} />
        <Route path="playerlist" element={<ProfilePlayerList />} />
        <Route path="points" element={<ProfilePointPage />} />
      </Routes>
    </Wrapper>
  );
}

export default ProfilePage;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
  margin-bottom: 70px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// const TabButton = styled.button`
//   background-color: ${(props) => props.theme.colors.mainRed};
//   color: white;
// `;

const NavStyle = styled(NavLink)`
  color: ${(props) => props.theme.colors.white};
  width: 33%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.mainBlack};
  border-bottom: 2px solid ${(props) => props.theme.colors.mainBlack};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  outline: invert;
  &:link {
    text-decoration: none;
  }
  &.active {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.mainRed};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-weight: bold;
    border: 2px solid ${(props) => props.theme.colors.mainBlack};
    border-bottom: none;
  }
`;
