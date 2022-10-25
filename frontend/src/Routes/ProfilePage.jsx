import React from "react";
import styled from "styled-components";

function ProfilePage() {
  return (
    <Wrapper>
      <ChookBae>프로필 페이지 입니다.</ChookBae>
    </Wrapper>
  );
}

export default ProfilePage;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
`;

const ChookBae = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mainRed};
  font-size: ${(props) => props.theme.fontSizes.h1};
`;
