import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ActivatePage() {
  return (
    <ActivateContainer>
      <div>이메일에서 회원가입을 승인해 주세요</div>
    </ActivateContainer>
  );
}

const ActivateContainer = styled.div`
  max-width: 860px;
  margin: auto;
  background-color: black;
  color: white;
`;
