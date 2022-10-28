import React from "react";
import styled from "styled-components";

function MatchInfoPage() {
  return (
    <Wrapper>
      <ChookBae>경기 정보 페이지</ChookBae>
    </Wrapper>
  );
}

export default MatchInfoPage;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
`;

const ChookBae = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mainRed};
  font-size: ${(props) => props.theme.fontSizes.h1};
`;
