import React from "react";
import styled from "styled-components";
import "./ListPlayerCardDesign.scss";

function PlayerCardOne(props) {
  return (
    <div
      class="card mewtwo animated"
      style={{ backgroundImage: `url(${props.image})` }}
      alt={props.title}
    >
      <div>
        <PlayerName>{props.title}</PlayerName>
        <PlayerCount>{props.count}</PlayerCount>
        <PlayerValueBg>
          <PlayerValue>{props.value}</PlayerValue>
        </PlayerValueBg>
        <FlagImage src={props.flag} />
      </div>
    </div>
  );
}

export default PlayerCardOne;

const FlagImage = styled.img`
  width: 30%;
  position: absolute;
  bottom: 1%;
  left: 5%;
`;

const PlayerName = styled.p`
  padding-top: 50px;
  padding-bottom: 60px;
  font-size: 2rem;
  text-align: center;
  color: white;
  background: linear-gradient(to top, rgba(1, 0, 0, 0), rgba(1, 1, 1, 0.9));
  font-weight: bold;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /* display: inline-block;
  width: 100px; */
`;

const PlayerValueBg = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0%;
  font-size: 10px;
  text-align: right;
  color: white;
  font-weight: bold;
  padding-top: 80px;
  padding-bottom: 20px;
  background: linear-gradient(to bottom, rgba(1, 0, 0, 0), rgba(1, 1, 1, 0.9));
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const PlayerValue = styled.p`
  margin-bottom: 10%;
  margin-right: 10%;
  font-size: 2rem;
`;

const PlayerCount = styled.p`
  font-size: 10px;
  text-align: right;
  color: white;
  font-weight: bold;
`;
