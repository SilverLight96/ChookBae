import { atom, atomFamily } from 'recoil';
import { getCookie } from './utils/functions/cookies';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const loggedinState = atom({
  key: "loggedinState",
  default: getCookie('token') ? true : false,
});

