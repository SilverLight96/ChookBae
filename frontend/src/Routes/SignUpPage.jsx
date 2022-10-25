import React from "react";
import styled from "styled-components";

function SignUpPage() {
  return (
    <Wrapper>
      <ChookBae>회원가입을 합시다</ChookBae>
    </Wrapper>
  );
}

export default SignUpPage;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
`;

const ChookBae = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mainRed};
  font-size: ${(props) => props.theme.fontSizes.h1};
`;
