import React from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { Keyframes } from "styled-components";

function MixPage() {
  return (
    <Wrapper>
      <ButtonContainer>
        <NavStyle to="/gacha">선수 뽑기</NavStyle>
        <NavStyle
          className={(props) => {
            return `${props.isActive ? "isActive " : ""}iconContainer`;
          }}
          end
          to=""
        >
          선수 합성
        </NavStyle>
      </ButtonContainer>
      <MixMain>
        <MixCardContainer></MixCardContainer>
        <MixButtonWrapper>
          <MixButton>합성하기</MixButton>
        </MixButtonWrapper>
        <MixButtonContainer>
          <button>선수 등록 1</button>
          <button>선수 등록 2</button>
        </MixButtonContainer>
      </MixMain>
    </Wrapper>
  );
}

export default MixPage;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
`;

const NavStyle = styled(NavLink)`
  color: ${(props) => props.theme.colors.white};
  width: 50%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
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

const MixMain = styled.div`
  width: 100%;
  height: 82vh;
  background-color: ${(props) => props.theme.colors.mainOrange};
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const MixCardContainer = styled.div`
  background-color: white;
  margin: auto;
  width: 380px;
  height: 60vh;
  border-radius: 5px;
`;

const HoloGradient = keyframes`
  0% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;
const MixButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const MixButton = styled.div`
  border-radius: 5px;
  font-size: 30px;
  padding: 15px 30px;
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
  background: ${(props) => props.theme.colors.mainBlue};
  color: #fff;
  box-shadow: 0 6px ${(props) => props.theme.colors.pointBlue};
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
    box-shadow: 0 4px ${(props) => props.theme.colors.pointBlue};
    top: 2px;
  }
  :active {
    box-shadow: 0 0 ${(props) => props.theme.colors.pointBlue};
    top: 6px;
  }
`;

const MixButtonContainer = styled.div`
  display: flex;
  max-width: 860px;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 25px;
  > button {
    border-radius: 5px;
    font-size: 30px;
    padding: 80px 10px;
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
    background: ${(props) => props.theme.colors.mainBlue};
    color: #fff;
    box-shadow: 0 6px ${(props) => props.theme.colors.pointBlue};
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
      box-shadow: 0 4px ${(props) => props.theme.colors.pointBlue};
      top: 2px;
    }
    :active {
      box-shadow: 0 0 ${(props) => props.theme.colors.pointBlue};
      top: 6px;
    }
  }
`;
