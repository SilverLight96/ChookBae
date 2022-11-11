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
        <h3 style={{ textAlign: "center", color: "white" }}>{props.title}</h3>
        <h4 style={{ textAlign: "right", color: "white" }}>{props.value}</h4>
        <h4 style={{ textAlign: "right", color: "white" }}>{props.count}</h4>
        <Logo src={props.logo} alt="" />
      </div>
    </div>
  );
}

export default PlayerCard;

const Logo = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 10%;
`;
