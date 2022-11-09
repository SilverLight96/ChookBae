import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { Keyframes } from "styled-components";
import MixModal from "../Components/Mix/MixModal";
import { fetchData } from "../utils/apis/api";
import { getCookie } from "../utils/functions/cookies";
import PlayerCard from "../Components/common/PlayerCard";

function MixPage() {
  const country = 0;
  const [mixSelect, setMixSelect] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [playerList, setPlayerList] = useState([
    {
      card_img: "",
      player_name: "",
      value: "",
    },
  ]);
  const [selectCombine, setSelectCombine] = useState({
    player_card_id1: 0,
    player_card_id2: 0,
  });
  const [combinedCard, setCombinedCard] = useState({
    card_img: "",
    player_name: "",
    value: "",
  });

  const addLeft = () => {
    setMixSelect(1);
  };
  const addRight = () => {
    setMixSelect(2);
  };

  useEffect(() => {
    console.log("선수 목록 요청");
    return () => {
      getPlayerList();
    };
  }, [mixSelect]);

  const getPlayerList = async (url) => {
    const response = await fetchData
      .get(`https://k7a202.p.ssafy.io/v1/card/${country}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getCookie("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPlayerList(res.data);
      });
    return response;
  };
  // 선수 목록
  console.log(playerList);

  useEffect(() => {
    ModalHandler();
    return () => {};
  }, [playerList]);

  // 왼쪽인지 오른쪽인지 구분해서 카드 클릭하면 그쪽에 선수 등록
  const addCardLeft = (e) => {
    setSelectCombine((prev) => {
      return { ...prev, player_card_id1: e.target.id };
    });
    ModalHandler();
    setMixSelect(0);
  };
  const addCardRight = (e) => {
    setSelectCombine((prev) => {
      return { ...prev, player_card_id2: e.target.id };
    });
    ModalHandler();
    setMixSelect(0);
  };

  //선수 등록 확인
  console.log(selectCombine);

  useEffect(() => {
    ModalHandler();
  }, [selectCombine]);

  const ModalHandler = () => {
    setIsModal((prev) => !prev);
  };

  const mixCard = () => {
    const cardCombine = async () => {
      await fetchData
        .post("https://k7a202.p.ssafy.io/v1/card/combine", selectCombine, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${getCookie("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setCombinedCard(res.data);
          setMixSelect(3);
        });
    };
    cardCombine();
  };

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
        <GachaCardContainer>
          <Glow></Glow>
          <CardPack>?</CardPack>
          <GachaCardListContainer></GachaCardListContainer>
        </GachaCardContainer>
        <MixButtonWrapper>
          <MixButton onClick={mixCard}>합성하기</MixButton>
        </MixButtonWrapper>
        <MixButtonContainer>
          <button onClick={addLeft}>선수 등록 1</button>
          <button onClick={addRight}>선수 등록 2</button>
        </MixButtonContainer>
      </MixMain>
      <MixModal open={isModal} close={ModalHandler}>
        {mixSelect === 1 ? (
          <ModalBody>
            <MixText>왼쪽 선수 등록</MixText>
            <CardList>
              {playerList.map((players) => {
                return (
                  <MixCard onClick={addCardLeft} key={players.id}>
                    <div>{players.value}</div>
                    <h1>{players.fullname}</h1>
                    <img src={players.player_image} alt="" id={players.id} />
                  </MixCard>
                  // <PlayerCard
                  //   onClick={addCardLeft}
                  //   title={players.fullname}
                  //   image={players.player_image}
                  //   key={players.player_image}
                  //   value={players.value}
                  // />
                );
              })}
            </CardList>
          </ModalBody>
        ) : null}
        {mixSelect === 2 ? (
          <ModalBody>
            <MixText>오른쪽 선수 등록</MixText>
            <CardList>
              {playerList.map((players) => {
                return (
                  <MixCard onClick={addCardRight} key={players.id}>
                    <div>{players.value}</div>
                    <h1>{players.fullname}</h1>
                    <img src={players.player_image} alt="" id={players.id} />
                  </MixCard>
                );
              })}
            </CardList>
          </ModalBody>
        ) : null}
        {mixSelect === 3 ? (
          <ModalBody>
            <CombinedCard>
              <PlayerCard
                onClick={addCardLeft}
                title={combinedCard.fullname}
                image={combinedCard.player_image}
                key={combinedCard.player_image}
                value={combinedCard.value}
              />
            </CombinedCard>
          </ModalBody>
        ) : null}
      </MixModal>
    </Wrapper>
  );
}

export default MixPage;

const Wrapper = styled.div`
  max-width: 600px;
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
    padding: 70px 5px;
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
  width: 250px;
  height: 180px;
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
  margin-top: 30px;
  margin-bottom: 30px;
  .modes {
    margin: 30px;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const CardPack = styled.div`
  background: linear-gradient(0deg, #000, #272727);
  //background-image: linear-gradient(135deg, #b118ac 0%, #26c7da 100%);
  position: absolute;
  z-index: 2;
  width: 250px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 130px;
  color: white;
`;

const MixText = styled.p`
  font-size: 30px;
  color: white;
`;

const MixCard = styled.div`
  position: relative;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.white};
  > img {
    width: 100%;
    height: 100%;
  }
  > h1 {
    position: absolute;
    color: white;
    left: 5%;
    top: 10%;
    font-size: 18px;
    margin: 0px;
  }
  > div {
    position: absolute;
    color: white;
    right: 5%;
    bottom: 10%;
  }
`;

const ModalBody = styled.div`
  width: 100%;
`;

const CardList = styled.div`
  width: 100%;
  max-width: 600px;
  height: 70vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const CombinedCard = styled.div`
  width: 100%;
  max-width: 400px;
  height: 80vh;
  margin: auto;
`;
