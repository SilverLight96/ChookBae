import React from "react";
import styled from "styled-components";
import UserRank from "../Components/Main/UserRank";
import "../styles/MainPageDesign.scss";

function MainPage() {
  return (
    <Wrapper>
      <NeonHeader>
        <section class="notify-wrap">
          <div class="notify-wrap-inner ellipsis">
            <div id="container" class="notify-scroll">
              <ul>
                <li>
                  <a href="javascript:void(0)">
                    CHOOK BAE에 오신 것을 환영합니다!
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    승부 예측과 카드 수집으로 다른 사람과 경쟁하세요!
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </NeonHeader>
      <UserRank />
    </Wrapper>
  );
}

export default MainPage;

const Wrapper = styled.div`
  max-width: 600px;
  margin: auto;
  height: 92vh;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  background: linear-gradient(#141e30, #243b55);
  /* background: black; */
`;

const ChookBae = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mainRed};
  font-size: ${(props) => props.theme.fontSizes.h1};
`;

const NeonHeader = styled.header`
  padding-top: 30px;
`;
