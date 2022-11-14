import React from "react";
import styled from "styled-components";
import UserRank from "../Components/Main/UserRank";

function MainPage() {
  return (
    <Wrapper>
      <NeonHeader>
        <section class="notify-wrap">
          <div class="notify-wrap-inner ellipsis">
            <div id="container" class="notify-scroll">
              <ul>
                <li>
                  <p>CHOOK BAE에 오신 것을 환영합니다!</p>
                </li>
                <li>
                  <p>승부 예측과 카드 수집으로 다른 사람과 경쟁하세요!</p>
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
  padding-bottom: 30px;
  /* reset */

  p {
    text-align: center;
    font-size: 1em;
    margin-bottom: 0;
    margin-top: 0;
    line-height: 1;
    text-decoration: none;
    color: #fff;
  }
  p:nth-child(2) {
    font-family: Monoton;
    animation: neon1 1.5s ease-in-out infinite alternate;
  }
  p:nth-child(1) {
    font-family: Iceland;
    animation: neon2 1.5s ease-in-out infinite alternate;
  }

  @keyframes neon1 {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff1177,
        0 0 70px #ff1177, 0 0 80px #ff1177, 0 0 100px #ff1177, 0 0 150px #ff1177;
    }
    to {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff1177,
        0 0 35px #ff1177, 0 0 40px #ff1177, 0 0 50px #ff1177, 0 0 75px #ff1177;
    }
  }

  @keyframes neon2 {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #141e30,
        0 0 70px #141e30, 0 0 80px #141e30, 0 0 100px #141e30, 0 0 150px #141e30;
    }
    to {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #141e30,
        0 0 35px #141e30, 0 0 40px #141e30, 0 0 50px #141e30, 0 0 75px #141e30;
    }
  }

  /*Make stuff responsive*/

  @media (max-width: 650px) {
    p {
      font-size: 2em;
    }
  }

  ul,
  li {
    list-style: none;
  }

  .notify-wrap {
    position: relative;
    background: #141e30;
  }
  .notify-wrap-inner {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin: 0 30px;
    background: #141e30;
    text-align: center;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .notify-scroll {
    display: inline-block;
    animation: text-scroll 25s linear infinite;
  }
  @keyframes text-scroll {
    from {
      transform: translateX(20%);
      -moz-transform: translateX(20%);
      -webkit-transform: translateX(20%);
      -o-transform: translateX(20%);
      -ms-transform: translateX(20%);
    }
    to {
      transform: translateX(-100%);
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      -o-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
    }
  }
  .notify-scroll ul {
    display: inline;
  }
  .notify-scroll ul li {
    display: inline-block;
    padding-right: 350px;
  }
`;
