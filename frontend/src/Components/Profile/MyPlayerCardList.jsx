import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import PlayerCard from "../common/PlayerCard";
import { useRecoilState } from "recoil";
import { myInformation } from "../../atoms";

function MyPlayerCardList() {
  const myInfo = useRecoilState(myInformation);

  return (
    <Wrapper>
      {myInfo[0].card_list.map((playerCard) => {
        return (
          <PlayerCard
            title={playerCard.title}
            image={playerCard.image}
            key={playerCard.id}
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
  grid-gap: 0.1rem;
  margin-bottom: 0.1rem;
  scroll-behavior: smooth;
`;
