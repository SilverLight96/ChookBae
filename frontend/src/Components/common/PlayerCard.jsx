import React from "react";
import styled from "styled-components";
import "./PlayerCardDesign.scss";

function PlayerCard(props) {
  return (
    <div
      class="card mewtwo animated"
      style={{ backgroundImage: `url(${props.image})` }}
      alt={props.title}
    >
      <div>
        <PlayerName>{props.title}</PlayerName>
        <PlayerCount>{props.count}</PlayerCount>
        <PlayerValue>{props.value}</PlayerValue>
      </div>
    </div>
  );
}

export default PlayerCard;

const PlayerName = styled.p`
  font-size: 12px;
  text-align: center;
  color: white;
  font-weight: bold;
  /* display: inline-block;
  width: 100px; */
`;

const PlayerValue = styled.p`
  font-size: 10px;
  text-align: right;
  color: white;
  font-weight: bold;
`;

const PlayerCount = styled.p`
  font-size: 10px;
  text-align: right;
  color: white;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

const Title2 = styled.div`
  display: flex;

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
  bottom: 20px;
  left: 20px;
`;
