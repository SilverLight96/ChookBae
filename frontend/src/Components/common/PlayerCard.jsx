import React from "react";
import styled from "styled-components";
import "./jongeun2.scss";

function PlayerCard(props) {
  console.log(props);
  return (
    <main id="app">
      <section class="cards">
        <div
          class="card mewtwo animated"
          style={{ backgroundImage: `url(${props.image})` }}
          alt={props.title}
        >
          <div>
            <h3 style={{ textAlign: "center", color: "white" }}>
              {props.title}
            </h3>
            <h4 style={{ textAlign: "right", color: "white" }}>
              {props.value}
            </h4>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PlayerCard;
