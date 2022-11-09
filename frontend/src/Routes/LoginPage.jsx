import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/ChookBae_logo.png";
import { keyframes } from "styled-components";
import { REGEX, REGISTER_MESSAGE, STANDARD } from "../utils/constants/constant";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { fetchData } from "../utils/apis/api";
import { userApis } from "../utils/apis/userApis";
import { useSetRecoilState } from "recoil";
import { loggedinState } from "../atoms";

function LoginPage() {
  const setLogged = useSetRecoilState(loggedinState);
  const [cookies, setCookie] = useCookies(["token"]);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState();
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    login();
  }, [userInfo]);

  const login = () => {
    return fetchData
      .post(userApis.LOGIN, userInfo)
      .then((res) => {
        setCookie("token", res.data.token);
        setLogged(true);
        navigate("/profile");
      })
      .catch((error) => {
        setLoginError(error.response.data);
      });
  };
  console.log(cookies);

  useEffect(
    (prev) => {
      setIsError(!prev);
    },
    [loginError]
  );

  const onValid = (data) => {
    setUserInfo((prev) => ({ ...prev, ...data }));
  };

  return (
    <Wrapper>
      <LoginBox>
        <h2>Sign Up</h2>
        <Logo>
          <img src={logo} alt="로그인 페이지 로고" />
        </Logo>
        <form onSubmit={handleSubmit(onValid)}>
          <UserBox>
            <Input
              name="email"
              id="email"
              type="email"
              {...register("email", {
                required: REGISTER_MESSAGE.REQUIRED_EMAIL,
                pattern: {
                  value: REGEX.EMAIL,
                  message: REGISTER_MESSAGE.EMAIL_STANDARD,
                },
              })}
              placeholder=" "
              required
              // onChange={handleEmail}
            />
            <Label htmlFor="email">이메일</Label>
            {errors.email && <small role="alert">{errors.email.message}</small>}
          </UserBox>
          <UserBox>
            <Input
              name="password"
              id="password"
              type="password"
              maxLength={STANDARD.ID_MAX_LENGTH}
              minLength={STANDARD.ID_MIN_LENGTH}
              {...register("password", {
                required: REGISTER_MESSAGE.REQUIRED_PASSWORD,
                minLength: {
                  value: 8,
                  message: REGISTER_MESSAGE.PASSWORD_STANDARD,
                },
                maxLength: {
                  value: 20,
                  message: REGISTER_MESSAGE.PASSWORD_STANDARD,
                },
                pattern: {
                  value: REGEX.PASSWORD,
                  message: REGISTER_MESSAGE.PASSWORD_STANDARD,
                },
              })}
              placeholder=" "
              required
              // onChange={handlePassword}
            />
            <Label htmlFor="password">비밀번호</Label>
            {errors?.password?.message && (
              <small role="alert">{errors.password.message}</small>
            )}
          </UserBox>
          <div>
            <button type={"submit"}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              로그인
            </button>
          </div>
        </form>
        <Link to="/signup">
          <SignUpButton>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            회원 가입
          </SignUpButton>
        </Link>
      </LoginBox>
    </Wrapper>
  );
}

export default LoginPage;

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
  font-family: sans-serif;
`;

const Logo = styled.div`
  margin: auto;
  width: 30%;
  > img {
    width: 100%;
  }
`;

const anim1 = keyframes`
   0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
`;
const anim2 = keyframes`
   0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
`;
const anim3 = keyframes`
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
`;
const anim4 = keyframes`
   0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
`;

const LoginBox = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  width: 450px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: linear-gradient(#141e30, #243b55);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;

  > h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 30px;
  }
  > form {
    > div {
      display: flex;
      justify-content: space-between;
      > button {
        position: relative;
        display: inline-block;
        padding: 10px 20px;
        color: #03e9f4;
        background-color: transparent;
        border-radius: 5px;
        border: none;
        font-size: 16px;
        text-decoration: none;
        text-transform: uppercase;
        overflow: hidden;

        :hover {
          background: #03e9f4;
          color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
            0 0 100px #03e9f4;
        }
        > span {
          position: absolute;
          display: block;
          :nth-child(1) {
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #03e9f4);
            animation: ${anim1} 3s linear infinite;
          }
          :nth-child(2) {
            top: -100%;
            right: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(180deg, transparent, #03e9f4);
            animation: ${anim2} 3s linear infinite;
            animation-delay: 0.75s;
          }
          :nth-child(3) {
            bottom: 0;
            right: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(270deg, transparent, #03e9f4);
            animation: ${anim3} 3s linear infinite;
            animation-delay: 1.5s;
          }
          :nth-child(4) {
            bottom: -100%;
            left: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(360deg, transparent, #03e9f4);
            animation: ${anim4} 3s linear infinite;
            animation-delay: 2.25s;
          }
        }
      }
    }
  }
`;

const UserBox = styled.div`
  position: relative;
  > small {
    color: ${(props) => props.theme.colors.subRed};
    font-size: 12px;
    position: absolute;
    left: 0;
    bottom: 15px;
  }
  > big {
    color: ${(props) => props.theme.colors.subRed};
    font-size: 26px;
    font-weight: bold;
    position: absolute;
    left: 0;
    bottom: 250px;
    text-align: center;
    margin: auto;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 40px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
`;

const SignUpButton = styled.button`
  position: absolute;
  right: 35px;
  bottom: 40px;
  padding: 10px 20px;
  color: #03e9f4;
  background-color: transparent;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;

  :hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
      0 0 100px #03e9f4;
  }
  > span {
    position: absolute;
    display: block;
    :nth-child(1) {
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #03e9f4);
      animation: ${anim1} 3s linear infinite;
    }
    :nth-child(2) {
      top: -100%;
      right: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, transparent, #03e9f4);
      animation: ${anim2} 3s linear infinite;
      animation-delay: 0.75s;
    }
    :nth-child(3) {
      bottom: 0;
      right: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(270deg, transparent, #03e9f4);
      animation: ${anim3} 3s linear infinite;
      animation-delay: 1.5s;
    }
    :nth-child(4) {
      bottom: -100%;
      left: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(360deg, transparent, #03e9f4);
      animation: ${anim4} 3s linear infinite;
      animation-delay: 2.25s;
    }
  }
`;
