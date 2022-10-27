import React from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProfileCard() {
  return (
    <Wrapper>
      <ButtonConatiner>
        <Link to="/account">
          <button>회원정보 수정</button>
        </Link>
        <Link>
          <button>로그 아웃</button>
        </Link>
      </ButtonConatiner>
      <ProfileImgContainer>
        <ProfileImg>
          <img
            src="http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSIjMZAnE9OcAtov5EVsznvysN1zvXq5jDY7vSZkoqKv59QN306vyoU0ouBEgcHsyih"
            alt="프로필 이미지"
          />
        </ProfileImg>
      </ProfileImgContainer>
      <ProfileMain>
        <NickName>강경은 </NickName>
        <p>포인트 : 1000만점 </p>
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
