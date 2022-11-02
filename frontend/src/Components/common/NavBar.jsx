import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/ChookBae_logo.png";
import predictionIcon from "../../assets/Preidction_Icon.png";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaClipboardList } from "react-icons/fa";
import { GiCardRandom } from "react-icons/gi";

function NavBar() {
  return (
    <NabBody>
      <Link to="/Match">
        <NavButton>
          <FaClipboardList size="40px" color="#E5E5E5" />
        </NavButton>
      </Link>
      <Link to="/prediction">
        <NavButton>
          <img src={predictionIcon} alt="경기 예측 아이콘" />
        </NavButton>
      </Link>
      <Link to="/">
        <NavLogo>
          <img src={logo} alt="메인 로고" />
        </NavLogo>
      </Link>
      <Link to="/gacha">
        <NavButton>
          <GiCardRandom size="40px" color="#E5E5E5" />
        </NavButton>
      </Link>
      <Link to="/profile">
        <NavButton>
          <HiOutlineUserCircle size="45px" color="#E5E5E5" />
        </NavButton>
      </Link>
    </NabBody>
  );
}

export default NavBar;

const NabBody = styled.div`
  z-index: 100;
  max-width: 860px;
  width: 100%;
  margin: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${(props) => props.theme.colors.mainRed};
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const NavButton = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  float: left;
  width: 20%;
  height: 60px;
  line-height: 60px;
  > img {
    height: 65%;
  }
`;

const NavLogo = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  float: left;
  width: 20%;
  height: 60px;
  line-height: 60px;
  > img {
    height: 90%;
  }
`;
