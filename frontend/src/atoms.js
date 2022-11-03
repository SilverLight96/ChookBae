import { atom } from 'recoil';
import { getCookie } from './utils/functions/cookies';


export const loggedinState = atom({
  key: "loggedinState",
  default: getCookie('token') ? true : false,
});

export const myInformation = atom({
  key: 'myInformation',
  default: {
    predict_match: [],
    nickname: "",
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSIjMZAnE9OcAtov5EVsznvysN1zvXq5jDY7vSZkoqKv59QN306vyoU0ouBEgcHsyih",
    point: 0,
    card_list:[],
    point_list: [],
  },
});