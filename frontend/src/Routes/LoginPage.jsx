import React from "react";
import styled from "styled-components";

function LoginPage() {
  return (
    <Wrapper>
      <ChookBae>로그인을 합시다</ChookBae>
    </Wrapper>
  );
}

export default LoginPage;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
`;

const ChookBae = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mainRed};
  font-size: ${(props) => props.theme.fontSizes.h1};
`;
