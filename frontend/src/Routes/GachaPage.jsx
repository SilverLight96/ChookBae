import React from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { Keyframes } from "styled-components";

function GachaPage() {
  return (
    <Wrapper>
      <ButtonContainer>
        <NavStyle
          className={(props) => {
            return `${props.isActive ? "isActive " : ""}iconContainer`;
          }}
          end
          to=""
        >
          선수 뽑기
        </NavStyle>
        <NavStyle to="/mix">선수 합성</NavStyle>
      </ButtonContainer>

      <GachaMain>
        <GachaCardContainer>
          <Glow></Glow>
          <CardPack>선수 뽑기</CardPack>
          <GachaCardListContainer></GachaCardListContainer>
        </GachaCardContainer>

        <GachaButtonContainer>
          <button>1회 뽑기</button>
          <button>10회 뽑기</button>
        </GachaButtonContainer>
      </GachaMain>
    </Wrapper>
  );
}

export default GachaPage;

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

const GachaMain = styled.div`
  width: 100%;
  height: 82vh;
  background-color: ${(props) => props.theme.colors.mainOrange};
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Steam = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
`;

const Glow = styled.span`
  z-index: 1;
  position: absolute;
  width: 300px;
  height: 400px;
  background: linear-gradient(0deg, #000, #272727);
  :before,
  :after {
    content: "";
    position: absolute;
    left: -2px;
    top: -2px;
    background: linear-gradient(
      35deg,
      #b118ac,
      #4c4cff,
      #e69500,
      #b118ac,
      #4c4cff,
      #e69500
    );
    background-size: 400%;
    width: calc(100% + 5px);
    height: calc(100% + 5px);
    z-index: -1;
    animation: ${Steam} 20s linear infinite;
  }
  :after {
    filter: blur(30px);
  }
`;

const CardPack = styled.div`
  background: linear-gradient(0deg, #000, #272727);
  //background-image: linear-gradient(135deg, #b118ac 0%, #26c7da 100%);
  position: absolute;
  z-index: 2;
  width: 300px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
`;

const GachaCardListContainer = styled.div`
  position: relative;
  top: 0;
  margin: 15px;
  width: 100%;
  height: 100%;
  max-height: 740px;
  max-width: 1015px;
  display: none;
`;

const GachaCardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .modes {
    margin: 30px;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const GachaButtonContainer = styled.div`
  display: flex;
  max-width: 860px;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 25px;
  > button {
    border-radius: 5px;
    font-size: 30px;
    padding: 20px 40px;
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
