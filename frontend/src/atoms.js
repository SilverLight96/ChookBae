import { atom } from 'recoil';
import { getCookie } from './utils/functions/cookies';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();


export const loggedinState = atom({
  key: "loggedinState",
  default: getCookie('token') ? true : false,
});

export const myInformation = atom({
  key: 'myInformation',
  default: {
    predict_match: [],
    nickname: "",
    profile: "",
    point: 0,
    card_list:[],
    point_list: [],
  },
  effects_UNSTABLE: [persistAtom],
});