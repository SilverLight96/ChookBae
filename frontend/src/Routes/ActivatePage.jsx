import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ActivatePage() {
  return (
    <ActivateContainer>
      <div>회원가입이 승인되었습니다.</div>
      <div>로그인을 진행해 주세요.</div>
    </ActivateContainer>
  );
}

const ActivateContainer = styled.div`
  max-width: 860px;
  margin: auto;
  background-color: black;
  color: white;
`;
