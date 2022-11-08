import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { Keyframes } from "styled-components";
import GachaModal from "../Components/Gacha/GachaModal";
import { fetchData } from "../utils/apis/api";
import PlayerCard from "../Components/common/PlayerCard";
import { gachaApis } from "../utils/apis/userApis";

function GachaPage() {
  const didMountRef = useRef(false);
  const [isGacha, setIsGacha] = useState({
    team_id: 0,
    gacha_count: 0,
    point: 0,
  });

  const [gachaResult, setGachaResult] = useState([]);

  const [isModal, setIsModal] = useState(false);

  const oneGacha = () => {
    setIsGacha({
      team_id: 0,
      gacha_count: 1,
      point: 0,
    });
  };

  const tenGacha = () => {
    setIsGacha({
      team_id: 0,
      gacha_count: 10,
      point: 0,
    });
  };

  useEffect(() => {
    if (isGacha.gacha_count !== 0) getGacha();
  }, [isGacha]);

  // console.log(isGacha);

  const getGacha = async () => {
    const response = await fetchData
      .post(gachaApis.GACHA, isGacha)
      .then((res) => {
        setGachaResult(res.data);
      });
    return response;
  };

  useEffect(() => {
    console.log("모달열기");
    return () => {
      ModalHandler();
      console.log("모달열기 완료");
    };
  }, [gachaResult]);

  console.log(gachaResult);

  const ModalHandler = () => {
    setIsModal((prev) => !prev);
  };

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
          <button onClick={oneGacha}>1회 뽑기</button>
          <button onClick={tenGacha}>10회 뽑기</button>
        </GachaButtonContainer>
      </GachaMain>
      <GachaModal open={isModal} close={ModalHandler}>
        {isGacha.gacha_count === 1 ? (
          <div>
            <GachaText>가차 1회 뽑기</GachaText>
            <GachaOneList>
              {gachaResult.map((playerCard) => {
                return (
                  <PlayerCard
                    title={playerCard.fullname}
                    image={playerCard.player_image}
                    key={playerCard.player_image}
                    value={playerCard.value}
                  />
                );
              })}
            </GachaOneList>
          </div>
        ) : null}
        {isGacha.gacha_count === 10 ? (
          <div>
            <GachaText>가차 10회 뽑기</GachaText>
            <GachaList>
              {gachaResult.map((playerCard, idx) => {
                return (
                  <PlayerCard
                    title={playerCard.fullname}
                    image={playerCard.player_image}
                    key={idx}
                    value={playerCard.value}
                  />
                );
              })}
            </GachaList>
          </div>
        ) : null}
      </GachaModal>
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

const GachaText = styled.p`
  font-size: 20px;
  color: white;
`;

const GachaList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 70vh;
`;

const GachaOneList = styled.div`
  width: 100%;

  margin: auto;
`;
