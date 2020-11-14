export const DOCTOR = "DOCTOR"
export const MEDICAL = "MEDICAL"
export const MARKETER = "MARKETER"
export const OPTION_ONLY = "ONLY"
export const OPTION_UNTIL = "UNTIL"

export const isAuthenticated = (request, rank, option) => {
  console.log(request.user)
  if (!request.user) {
    throw Error(
      "로그인 토큰이 만료되었습니다. 로그아웃 이후 재로그인 부탁드립니다."
    );
  } else {
    if(option === OPTION_ONLY)
    {
      if (rank===DOCTOR && request.user.role !== DOCTOR ) {
        throw Error("의사만 사용할 수 있는 기능입니다");
      }else if (rank===MEDICAL && request.user.role !== MEDICAL) {
        throw Error("병원관계자만 사용할 수 있는 기능입니다");
      }else if (rank===MARKETER && request.user.role !== MARKETER) {
        throw Error("판매원만 사용할 수 있는 기능입니다");
      }
    }
    else if(option===OPTION_UNTIL)
    {
      if (rank===DOCTOR && request.user.role !== DOCTOR ) {
        throw Error("의사만 사용할 수 있는 기능입니다");
      }else if (rank===MEDICAL && ![DOCTOR, MEDICAL].includes(request.user.role) ) {
        throw Error("의사, 병원관계자만 사용할 수 있는 기능입니다");
      }else if (rank===MARKETER && ![DOCTOR, MEDICAL, MARKETER].includes(request.user.role)) {
        throw Error("의사, 병원관계자 및 판매원만 사용할 수 있는 기능입니다");
      }
    }
  }
  return;
};
