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
