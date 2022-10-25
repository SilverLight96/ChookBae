import React from "react";
import styled from "styled-components";
import logo from "../assets/ChookBae_logo.png";
import { useState } from "react";
import { useForm } from "react-hook-form";

function LoginPage() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setState(data);
    console.log(state);
  };

  return (
    <Wrapper>
      <Logo>
        <img src={logo} alt="로그인 페이지 로고" />
      </Logo>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="text"
          placeholder="test@email.com"
          {...register("email", {
            required: "이메일은 필수 입력 사항입니다.",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && <small role="alert">{errors.email.message}</small>}
        <input type="submit" valu="로그인" />
      </form>

      <ChookBae>로그인을 합시다</ChookBae>
    </Wrapper>
  );
}

export default LoginPage;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
`;

const Logo = styled.div`
  margin: auto;
  width: 35%;
  > img {
    width: 100%;
  }
`;

const ChookBae = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mainRed};
  font-size: ${(props) => props.theme.fontSizes.h1};
`;
