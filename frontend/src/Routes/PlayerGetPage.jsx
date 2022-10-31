import React from "react";
import styled from "styled-components";

function PlayerGetPage() {
  return (
    <Wrapper>
      <ChookBae>선수 뽑기 페이지</ChookBae>
    </Wrapper>
  );
}

export default PlayerGetPage;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
`;

const ChookBae = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mainRed};
  font-size: ${(props) => props.theme.fontSizes.h1};
`;
