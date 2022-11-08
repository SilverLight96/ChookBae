import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import PlayerCard from "../common/PlayerCard";
import { useRecoilState } from "recoil";
import { myInformation } from "../../atoms";

function MyPlayerCardList() {
  const myInfo = useRecoilState(myInformation);

  console.log(myInfo);

  return (
    <Wrapper>
      {myInfo[0].card_list.map((playerCard) => {
        return (
          <PlayerCard
            title={playerCard.fullname}
            image={playerCard.player_image}
            key={playerCard.player_image}
            count={playerCard.count}
            value={playerCard.value}
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
`;
