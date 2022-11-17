import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import PlayerCard from "../common/PlayerCard";
import PlayerInfoModalComp from "./PlayerInfoModalComp"
import { useRecoilState } from "recoil";
import { myInformation } from "../../atoms";
import axios from "axios";

function MyPlayerCardList() {
  const myInfo = useRecoilState(myInformation);
  const [modalOpen, setModalOpen] = useState(false)
  const [cardData, setCardData] = useState([])

  const baseURL = "https://k7a202.p.ssafy.io/"

  const openModal = async(id) => {
    setModalOpen(true)
    const axiosData = await axios
    .get(baseURL + `v1/player/info/${id}`) 

    setCardData(axiosData.data)
    console.log(axiosData.data);
    }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <Wrapper
    rowData = {parseInt(cardData / 3)}>
      <ModalWrapper
        display={modalOpen? 'flex':'none'}
        onClick={() => closeModal()}>
        <PlayerInfoModal
          display={modalOpen? 'flex':'none'}>
          <PlayerInfoModalComp
          img={cardData[2]}
          name={cardData[1]}
          country={cardData[3]}
          position={cardData[4]}
          birth={cardData[7]}
          height={cardData[9]}
          weight={cardData[8]}
          number={cardData[5]}
          goal={cardData[10]}
          assist={cardData[11]}
          yellow={cardData[12]}
          red={cardData[13]}
          runTime={cardData[14]}
          value={cardData[15]}
          teamInfo={cardData[6]} />
        </PlayerInfoModal>
      </ModalWrapper>
      {myInfo[0].card_list.map((playerCard) => {
        return (
            <PlayerCard
              setModalOpen={openModal}
              id={playerCard.id}
              title={playerCard.fullname}
              image={playerCard.player_image}
              key={playerCard.player_image}
              count={playerCard.count}
              value={playerCard.value}
              flag={playerCard.logo}
            />
        );
      })}
    </Wrapper>
  );
}

export default MyPlayerCardList;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  grid-gap: 1rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
  margin-top: 10px;
  min-height: 100vh;
`;

const PlayerInfoModal = styled.div`
  width: 80%;
  height: 50%;
  display: ${props => props.display};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;
  border: 5px solid ${(props) => props.theme.colors.mainRed};
  z-index: 99;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;

  max-width: 600px;
  min-height: 100vh;
  width: 100%;
  height: 76vh;
  
  background-color: rgba(0, 0, 0, 0.5);

  display: ${props => props.display};
  z-index: 98;
`