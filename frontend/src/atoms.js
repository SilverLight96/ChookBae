import { atom, atomFamily } from 'recoil';
import { getCookie } from './utils/functions/cookies';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const loggedinState = atom({
  key: "loggedinState",
  default: getCookie('jwt') ? true : false,
});

export const myInformation = atom({
  key: 'myInformation',
  default: {
    memberId: '',
    nickname: '',
    memberSeq: '',
  },
});