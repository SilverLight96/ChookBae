import React from "react";
import styled from "styled-components";
import MyPrediction from "../Components/Profile/MyPredictionList";

function ProfilePredictionPage() {
  return (
    <Wrapper>
      <MyPrediction />
    </Wrapper>
  );
}

export default ProfilePredictionPage;

const Wrapper = styled.div`
  max-width: 600px;
  margin: auto;
`;
