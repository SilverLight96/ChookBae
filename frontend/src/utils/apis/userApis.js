export const userApis = {
    NICKNAME_DUPLICATE_CHECK_API: (nickname) => `/v1/account/nickname/${nickname}`,
    // EMAIL_DUPLICATE_CHECK_API: (email) => `/api/member/email/${email}`,
    REGISTER: 'v1/accounts/',
    LOGIN: '/v1/accounts/login/',
    // AUTH_EMAIL: '/api/member/password/check',
    PASSWORD_CHANGE: '/api/member/password/change',
    PASSWORD: '/api/member/password',
    EMAIL_AUTHNUMBER_CHECK: '/api/member/password/check/auth',
    SCORE_CHANGE: '/api/member/score',
    DELETE_USER: '/v1/account/delete',
    USER_INFORMATION: (memberSeq) => `/api/member/${memberSeq}`,
    PROFILE_IMAGE_CHANGE: '/api/member/img',
    MY_BASIC_INFORMATION: '/api/account/mypage',
    INFORMATION_CHANGE: '/api/member',
    USER_LIST: (word, size) => {
      return (page) => `/api/member?word=${word}&page=${page}&size=${size}`;
    },
  };