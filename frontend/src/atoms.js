import { atom } from 'recoil';
import { getCookie } from './utils/functions/cookies';


export const loggedinState = atom({
  key: "loggedinState",
  default: getCookie('refresh_token') ? true : false,
});

export const myInformation = atom({
  key: 'myInformation',
  default: {
    memberId: '',
    nickname: '',
    memberSeq: '',
  },
});