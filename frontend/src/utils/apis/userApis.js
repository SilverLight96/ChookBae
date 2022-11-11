export const userApis = {
    NICKNAME_DUPLICATE_CHECK_API: (nickname) => `/v1/account/nickname/${nickname}`,
    REGISTER: '/v1/accounts/',
    LOGIN: '/v1/accounts/login/',
    // DELETE_USER: '/v1/account/delete',
    UPDATE_USER: '/v1/accounts/update/',
  };

export const gachaApis = {
  GACHA : 'v1/card'
}

export const rankApis ={
  RANK :(ranktype) => `v1/rank?type=${ranktype}`
}