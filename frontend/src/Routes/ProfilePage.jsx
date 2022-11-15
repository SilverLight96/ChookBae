import React, { useEffect } from "react";
import styled from "styled-components";
import { Routes, Route, NavLink } from "react-router-dom";
import { myInformation } from "../atoms";
import { useRecoilState } from "recoil";
import { fetchData } from "../utils/apis/api";
import { getCookie } from "../utils/functions/cookies";

import ProfilePlayerList from "./ProfilePlayerList";
import ProfilePointPage from "./ProfilePoint";
import ProfilePredictionPage from "./ProfilePrediction";
import ProfileCard from "../Components/Profile/ProfileCard";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useRecoilState(myInformation);

  const getUserInfo = async () => {
    return await fetchData
      .get("/v1/accounts/mypage/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getCookie("token")}`,
        },
      })
      .then((res) => {
        setProfileInfo(res.data);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  console.log(profileInfo);

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
      <MainBody>
        <Routes path="/profile" element={<ProfilePage />}>
          <Route path="" element={<ProfilePredictionPage />} />
          <Route path="playerlist" element={<ProfilePlayerList />} />
          <Route path="points" element={<ProfilePointPage />} />
        </Routes>
      </MainBody>
    </Wrapper>
  );
}

export default ProfilePage;

const Wrapper = styled.div`
  background: linear-gradient(#141e30, #243b55);
  min-height: 100vh;
  max-width: 600px;
  margin: auto;
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
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.mainRed};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  outline: invert;
  &:link {
    text-decoration: none;
  }
  &.active {
    color: ${(props) => props.theme.colors.white};
    background: linear-gradient(#141e30, #243b55);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-weight: bold;
    border: 2px solid linear-gradient(#141e30, #243b55);
  }
`;

const MainBody = styled.div`
  background: linear-gradient(#141e30, #243b55);
  padding-bottom: 60px;
`;
