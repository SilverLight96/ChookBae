import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { Keyframes } from "styled-components";
import MixModal from "../Components/Mix/MixModal";
import { fetchData } from "../utils/apis/api";

function MixPage() {
  const [playerCards, setPlayerCards] = useState({
    id: 1,
    fullname: "손흥민",
    player_image:
      "https://ichef.bbci.co.uk/news/624/cpsprodpb/4118/production/_119546661_gettyimages-1294130887.jpg.webp",
  });
  const [mixSelect, setMixSelect] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [playerList, setPlayerList] = useState({
    card_img: "",
    player_name: "",
    value: "",
  });
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
      console.log("선수 목록 요청완료");
    };
  }, [mixSelect]);

  const getPlayerList = async (url) => {
    // const response = await fetchData.get(url).then((res) => {
    //   console.log(res);
    //   setPlayerList(res);
    // });
    // return response;
    setPlayerList({
      cardlist: "aa",
    });
  };

  useEffect(() => {
    ModalHandler();
    console.log("모달열기");
    return () => {
      console.log("모달열기 완료");
    };
  }, [playerList]);
  // 왼쪽인지 오른쪽인지 구분해서 카드 클릭하면 그쪽에 선수 등록
  const addCardLeft = (e) => {
    console.log("왼쪽 카드 클릭");
    console.log(e.target.id);
    setSelectCombine((prev) => {
      return { ...prev, player_card_id1: e.target.id };
    });

    ModalHandler();
    console.log(selectCombine);
  };
  const addCardRight = (e) => {
    console.log("오른쪽 카드 클릭");
    setSelectCombine((prev) => {
      return { prev, player_card_id2: e.target.id };
    });

    ModalHandler();
  };

  const ModalHandler = () => {
    setIsModal((prev) => !prev);
  };

  const mixCard = () => {
    const cardCombine = async (url) => {
      await fetchData.post(url, selectCombine).then((res) => {
        console.log(res);
        setCombinedCard(res.data);
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
          <div>
            <MixText>왼쪽 선수 등록</MixText>
            <GachaCard onClick={addCardLeft}>
              <BestCardContainer>
                <Image src={playerCards.player_image} />
                <Title>{playerList.fullname}</Title>
              </BestCardContainer>
            </GachaCard>
          </div>
        ) : null}
        {mixSelect === 2 ? (
          <div>
            <MixText>오른쪽 선수 등록</MixText>
            <GachaCard
              onClick={addCardRight}
              title={playerCards.fullname}
              image={playerCards.player_image}
              key={playerCards.id}
            />
          </div>
        ) : null}

        {/* {gachaResult.map((gachacard) => {
          <div>
            <div>{gachacard.card_img}</div>
            <div>{gachacard.player_name}</div>
            <div>{gachacard.value}</div>
          </div>;
        })} */}
      </MixModal>
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

const GachaCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30vh;
`;

const BestCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 91%;
  border-radius: 3px;
  box-shadow: 5px 5px 15px 1px black;
  overflow: hidden;
  &:hover {
    transform: scale(1.05);
    transition: transform 0.8s;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover !important;
`;

const Title = styled.div`
  display: flex;
  background: linear-gradient(to bottom, rgba(1, 0, 0, 0), rgba(1, 1, 1, 0.8));
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
  font-size: 30px;
  font-family: "KOTRAHOPE";
  font-weight: normal;
  font-style: normal;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: absolute;
  bottom: 0px;
`;
