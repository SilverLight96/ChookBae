import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import PlayerCard from "../common/PlayerCard";
import { useRecoilState } from "recoil";
import { myInformation } from "../../atoms";

function MyPlayerCardList() {
  const myInfo = useRecoilState(myInformation);

  console.log(myInfo[0].card_list);
  return (
    <Wrapper>
      {myInfo[0].card_list.map((playerCard) => {
        return (
          <PlayerCard
            title={playerCard[0].fullname}
            image={playerCard[0].player_image}
            key={playerCard[0].id}
            value={playerCard[0].value}
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
