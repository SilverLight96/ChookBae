import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { removeCookie } from "../../utils/functions/cookies";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedinState, myInformation } from "../../atoms";




function ProfileCard() {
  const profileInfo = useRecoilState(myInformation);

  const setLoggedin = useSetRecoilState(loggedinState);
  const navigate = useNavigate();
  const handleLogout = () => {
    setLoggedin(false);
    removeCookie("token");
    navigate("/");
  };
  console.log(profileInfo[0]);
  return (
    <Wrapper>
      <ButtonConatiner>
        <Link to="/account">
          <button>회원정보 수정</button>
        </Link>
        <Link>
          <button onClick={handleLogout}>로그 아웃</button>
        </Link>
      </ButtonConatiner>
      <ProfileImgContainer>
        <ProfileImg>
          <img src={profileInfo[0].profile} alt="프로필 이미지" />
        </ProfileImg>
      </ProfileImgContainer>
      <ProfileMain>
        <NickName>{profileInfo[0].nickname} </NickName>
        <p>총 선수가치 {profileInfo[0].total_value}</p>
        <p>포인트 {profileInfo[0].point}</p>
      </ProfileMain>
    </Wrapper>
  );
}
export default ProfileCard;

const Wrapper = styled.div`
  background-color: white;
  position: relative;
  margin: auto;
  max-width: 600px;
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
`;

const ProfileImgContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const ProfileImg = styled.main`
  position: relative;
  img {
    width: 135px;
    height: 135px;
    object-fit: cover;
    border-radius: 75px;
  }
`;

const ProfileMain = styled.main`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  width: 70%;
  > p {
    font-size: 1rem;
    font-weight: bold;
    text-align: right;
    padding-right: 1rem;
  }
`;

const NickName = styled.h2`
  margin-top: 20%;
  margin-bottom: 10px;
  font-size: 2rem;
  font-weight: bold;
`;

const ButtonConatiner = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  > a {
    > button {
      background-color: ${(props) => props.theme.colors.mainRed};
      border-radius: 5px;
      margin-left: 5px;
      padding: 5px;
      color: ${(props) => props.theme.colors.white};
      font-size: 12px;
      :hover {
        cursor: pointer;
      }
    }
  }
`;
