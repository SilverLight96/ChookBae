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
        <p>포인트 : {profileInfo[0].point} 점</p>
      </ProfileMain>
    </Wrapper>
  );
}
export default ProfileCard;

const Wrapper = styled.div`
  position: relative;
  margin: auto;
  max-width: 860px;
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
  margin-left: 30px;
  width: 70%;
  > p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const NickName = styled.h2`
  font-size: 26px;
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
      :hover {
        cursor: pointer;
      }
    }
  }
`;
