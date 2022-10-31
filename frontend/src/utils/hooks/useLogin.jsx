import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loggedinState, myInformationState } from "../../atoms";
import { setRefreshToken } from "../apis/api";
import { setCookie } from "../functions/cookies";

function useSetLoggedIn() {
  const setUserInfo = useSetRecoilState(myInformationState);
  const setLogged = useSetRecoilState(loggedinState);
  const navigate = useNavigate();
  const setToken = ({ accessToken }) => {
    setCookie("accessToken", accessToken);
  };
  const moveToMain = () => {
    navigate("/");
  };

  return async (func, data) => {
    try {
      const response = await func(data);
      const {
        data: { email, memberSeq, nickname, accessToken, refreshToken },
      } = response;
      setUserInfo({ email, memberSeq, nickname });
      setToken({ accessToken });
      moveToMain();
      setLogged(true);
      setRefreshToken(refreshToken);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };
}

export default useSetLoggedIn;
