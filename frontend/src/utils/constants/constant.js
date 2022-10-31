export const REGISTER_MESSAGE = {
    REQUIRED_PASSWORD: '비밀번호를 입력해주세요.',
    PASSWORD_STANDARD: '비밀번호는 영문자, 숫자, 특수문자 포함 8글자 이상 입력해주세요.',
    REQUIRED_PASSWORD_CHECK: '비밀번호를 확인해주세요.',
    PASSWORD_CHECK: '입력한 비밀번호와 일치하지 않습니다.',
    REQUIRED_EMAIL: '이메일 주소를 입력해주세요.',
    EMAIL_STANDARD: '올바른 이메일 주소(email@email.com)를 입력해주세요.',
    REGISTER_EMAIL: '회원가입에 사용한 이메일을 입력해주세요.',
    REQUIRED_EMAIL_AUTH: '이메일 인증을 완료해주세요',
    FAILED_EMAIL_AUTH: '인증번호가 일치하지 않습니다.',
    VALIDATED_EMAIL_AUTH: '인증에 성공하였습니다.',
    DUPLICATED_EMAIL: '사용할 수 없는 이메일입니다.',
    VALIDATED_EMAIL: '사용 가능한 이메일입니다.',
    REQUIRED_CERTIFICATION_NUMBER: '인증번호를 입력해주세요.',
    FAILED_CERTICATION_NUMBER: '인증번호가 일치하지 않습니다.',
    REQUIRED_NICKNAME: '닉네임을 입력해주세요.',
    DUPLICATED_NIACKNAME: '사용 중인 닉네임입니다.',
    NICKNAME_LENGTH: '닉네임은 2 ~ 10자 사이로 작성해주세요.',
    NICKNAME_STANDARD: '닉네임은 영어, 한글, 숫자로만 구성될 수 있습니다.',
    VALIDATED_NICKNAME: '사용 가능한 닉네임입니다.',
  };
  
  export const STANDARD = {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 10,
  };
  
  export const REGEX = {
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
    EMAIL: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    NICKNAME: /^[가-힣|a-z|A-Z|0-9|]+$/,
  };
  
  export const PAGES = {
    REGISTER: '회원가입',
    LOGIN: '로그인',
  };

  export const LOGIN_MESSAGE = {
    FAILED_LOGIN: '아이디 또는 비밀번호를 확인해주세요.',
  };