import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import welcomekang from "../assets/welcomekang.png";

export default function ActivatePage() {
  return (
    <ActivateContainer>
      <TextContainer>
        <p>이메일에서 회원가입을 승인해 주세요</p>
      </TextContainer>
      <ImgContainer>
        <img src={welcomekang} alt="웰컴강" />
      </ImgContainer>
    </ActivateContainer>
  );
}

const ActivateContainer = styled.div`
  max-width: 600px;
  margin: auto;
`;

const TextContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
  font-size: 26px;
  text-align: center;
  margin-top: 30%;
  > p {
    padding: 20px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.mainRed};
    color: ${(props) => props.theme.colors.white};
  }
`;

const ImgContainer = styled.div`
  position: absolute;
  bottom: 50px;
  width: 300px;
  margin: auto;
  > img {
    width: 100%;
    height: 100%;
  }
`;
