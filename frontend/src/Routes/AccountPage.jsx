import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { REGEX, REGISTER_MESSAGE, STANDARD } from "../utils/constants/constant";
import { userApis } from "../utils/apis/userApis";
import { fetchData } from "../utils/apis/api";
import { keyframes } from "styled-components";
import { useRecoilState } from "recoil";
import { myInformation } from "../atoms";
import axios from "axios";
import { getCookie } from "../utils/functions/cookies";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const profileInfo = useRecoilState(myInformation);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    new_nickname: profileInfo[0].nickname,
    new_password: "",
    new_password_confirm: "",
    new_profile_image: profileInfo[0].profile,
  });

  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_nickname: "",
      new_password: "",
      new_password_confirm: "",
    },
    mode: "onChange",
  });
  const getToken = () => {
    const accessToken = getCookie("token");
    return accessToken;
  };

  const selectFile = async (e) => {
    const uploadFile = e.target.files[0];
    const formData = new FormData();

    formData.append("profile_image", uploadFile);
    console.log(uploadFile);

    await axios({
      method: "post",
      url: "https://k7a202.p.ssafy.io/v1/accounts/image/",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${getToken()}`,
      },
    }).then((res) => {
      console.log(res.data.profile_image);
      setUserInfo((prev) => ({
        ...prev,
        new_profile_image: res.data.profile_image,
      }));
    });
  };

  // 회원 정보 수정
  const onValid = (data) => {
    setUserInfo((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    (async () => {
      try {
        await updateuser();
      } catch (err) {}
    })();
  }, [userInfo]);

  const updateuser = async () => {
    return await fetchData
      .patch(userApis.UPDATE_USER, userInfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
      })
      .then((res) => {
        navigate("/profile");
        console.log(res);
      });
  };
  console.log(userInfo);

  // 비밀번호 확인
  const password = useRef({});
  password.current = watch("new_password", "");
  return (
    <Wrapper>
      <LoginBox>
        <h2>회원 정보 수정</h2>
        <ProfileImgContainer>
          <ProfileImg>
            <img src={userInfo.new_profile_image} alt="프로필 이미지" />
          </ProfileImg>
          <form>
            <label htmlFor="profile-upload">프로필 사진 등록 :</label>
            <input type="file" accept="image/*" onChange={selectFile} />
          </form>
        </ProfileImgContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <UserBox>
            <Input
              name="new_nickname"
              id="new_nickname"
              type="text"
              autoComplete="off"
              maxLength={STANDARD.NAME_MAX_LENGTH}
              minLength={STANDARD.NAME_MIN_LENGTH}
              {...register("new_nickname", {
                required: REGISTER_MESSAGE.REQUIRED_NICKNAME,
                minLength: {
                  value: STANDARD.NAME_MIN_LENGTH,
                  message: REGISTER_MESSAGE.NICKNAME_LENGTH,
                },
                maxLength: {
                  value: STANDARD.NAME_MAX_LENGTH,
                  message: REGISTER_MESSAGE.ID_LENGTH,
                },
                pattern: {
                  value: REGEX.NICKNAME,
                  message: REGISTER_MESSAGE.NICKNAME_STANDARD,
                },
              })}
              placeholder=" "
              required
            />
            <Label htmlFor="nickname">닉네임</Label>
            {errors?.nickname?.message && (
              <small role="alert">{errors.nickname.message}</small>
            )}
          </UserBox>
          <UserBox>
            <Input
              name="new_password"
              id="new_password"
              type="password"
              maxLength={STANDARD.ID_MAX_LENGTH}
              minLength={STANDARD.ID_MIN_LENGTH}
              {...register("new_password", {
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
            />
            <Label htmlFor="password">비밀번호</Label>
            {errors?.password?.message && (
              <small role="alert">{errors.password.message}</small>
            )}
          </UserBox>
          <UserBox>
            <Input
              name="new_password_confirm"
              id="new_password_confirm"
              type="password"
              placeholder=" "
              {...register("new_password_confirm", {
                required: REGISTER_MESSAGE.REQUIRED_PASSWORD_CHECK,
                validate: {
                  passwordMatch: (value) =>
                    value !== password.current
                      ? REGISTER_MESSAGE.PASSWORD_CHECK
                      : true,
                },
              })}
              required
            />
            <Label htmlFor="password">비밀번호 확인</Label>
            {errors?.passwordCheck?.message && (
              <small role="alert">{errors.passwordCheck.message}</small>
            )}
          </UserBox>
          <button type={"submit"}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            회원 정보 수정
          </button>
        </form>
      </LoginBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 860px;
  margin: auto;
  font-family: sans-serif;
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
    font-size: 40px;
  }
  > form {
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

const ProfileImgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;
  border-bottom: 1px solid white;
  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    > label {
      color: white;
      font-size: 16px;
    }
  }
`;

const ProfileImg = styled.main`
  position: relative;
  img {
    width: 135px;
    height: 135px;
    object-fit: cover;
    border-radius: 75px;
  }
`;
