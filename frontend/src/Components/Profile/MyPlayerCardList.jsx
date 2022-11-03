import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import PlayerCard from "../common/PlayerCard";
import { useRecoilState } from "recoil";
import { myInformation } from "../../atoms";

function MyPlayerCardList() {
  const [playerCards, setPlayerCards] = useState([
    {
      id: 1,
      title: "손흥민",
      image:
        "https://ichef.bbci.co.uk/news/624/cpsprodpb/4118/production/_119546661_gettyimages-1294130887.jpg.webp",
    },
    {
      id: 2,
      title: "손흥민",
      image:
        "https://ichef.bbci.co.uk/news/624/cpsprodpb/4118/production/_119546661_gettyimages-1294130887.jpg.webp",
    },
    {
      id: 3,
      title: "손흥민",
      image:
        "https://ichef.bbci.co.uk/news/624/cpsprodpb/4118/production/_119546661_gettyimages-1294130887.jpg.webp",
    },
    {
      id: 4,
      title: "손흥민",
      image:
        "https://ichef.bbci.co.uk/news/624/cpsprodpb/4118/production/_119546661_gettyimages-1294130887.jpg.webp",
    },
    {
      id: 5,
      title: "손흥민",
      image:
        "https://ichef.bbci.co.uk/news/624/cpsprodpb/4118/production/_119546661_gettyimages-1294130887.jpg.webp",
    },
  ]);
  useEffect(() => {
    // const getCateList = async (url) => {
    //   return await fetchData.get(url);
    // };
    // const res = getCateList(bookListApis.BOOK_CATEGORY_LIST(categoryid.id));
    // res.then((playerlist) => {
    //   console.log(playerlist.data);
    //   setPlayerCards(playerlist.data);
    // });
  }, []);
  return (
    <Wrapper>
      {myInfo[0].card_list.map((playerCard) => {
        return (
          <PlayerCard
            title={playerCard.fullname}
            image={playerCard.player_image}
            key={playerCard.player_image}
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
  grid-gap: 0.1rem;
  margin-bottom: 0.1rem;
  scroll-behavior: smooth;
`;
