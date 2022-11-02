import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

function GachaCard(props) {
  const { image, title, isactive } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <Wrapper>
      <BestCardContainer>
        <Image src={image} />
        <Title>{title}</Title>
      </BestCardContainer>
    </Wrapper>
  );
}

export default GachaCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30vh;
`;
const CardPopUp = keyframes`
    animation-duration: 1s;
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
  scale: 0;
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
