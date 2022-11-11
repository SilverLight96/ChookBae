
import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { fetchData } from "../utils/apis/api";
import { getCookie } from "../utils/functions/cookies";

import UserRankList from '../Components/Rank/UserRankList';
import { rankApis } from '../utils/apis/userApis';


function Ranking(props){
  const [rankResult, setRankResult] = useState([]);

  const [isModal, setIsModal] = useState(false);
  const getRank = async () => {
    const response = await fetchData
      .get(rankApis.RANK("value"))
      .then((res) => {
        setRankResult(res.data);
      });
    return response;
  };

  useEffect(() => {
    return 
  }, );

  

  return(
    <Wrapper>
      {/* <ProfileCard props={profileInfo} /> */}
      <ButtonContainer>
        <NavStyle
          className={(props) => {
            return `${props.isActive ? "isActive " : ""}iconContainer`;
          }}
          end
          to=""
        >
          유저별
        </NavStyle>
        <NavStyle to="/playerRanking">선수별</NavStyle>
      </ButtonContainer>
      <UserRankList/>
      
    </Wrapper>
 )
 
}
export default Ranking;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.mainWhite};
  max-width: 600px;
  margin: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  > button {
    border-radius: 5px;
    font-size: 26px;
    padding: 10px 30px 10px 30px;
    border-color: transparent;
    color: ${(props) => props.theme.colors.white};
    font-weight: bold;
    border: none;
    cursor: pointer;
    display: inline-block;
    outline: none;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    background: ${(props) => props.theme.colors.mainRed};
    color: #fff;
    box-shadow: 0 6px #ab3c3c;
    -webkit-transition: none;
    -moz-transition: none;
    transition: none;
    :before {
      line-height: 1;
      position: relative;
      -webkit-font-smoothing: antialiased;
    }
    :after {
      content: "";
      position: absolute;
      z-index: -1;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      transition: all 0.3s;
    }
    :hover {
      box-shadow: 0 4px #ab3c3c;
      top: 2px;
    }
    :active {
      box-shadow: 0 0 #ab3c3c;
      top: 6px;
    }
  }
`;
const NavStyle = styled(NavLink)`
  color: ${(props) => props.theme.colors.white};
  width: 50%;
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