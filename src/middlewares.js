export const isAuthenticated = (request, rank) => {
  if (!request.user) {
    throw Error(
      "로그인 토큰이 만료되었습니다. 로그아웃 이후 재로그인 부탁드립니다."
    );
  } else {
    if (rank===0 && request.user.role !== 0 ) {
      throw Error("의사만 사용할 수 있는 기능입니다");
    } else if (rank===1 && ![0, 1].includes(request.user.role) ) {
      throw Error("의료 관계자만 사용할 수 있는 기능입니다");
    }else if (rank===2 && ![0, 1, 2].includes(request.user.role)) {
      throw Error("의료 관계자 및 판매원만 사용할 수 있는 기능입니다");
    }else if (rank===3 && ![0, 1, 3].includes(request.user.role)) {
      throw Error("의료 관계자 및 마케터만 사용할 수 있는 기능입니다");
    }else if (rank===4 && ![0, 1, 4].includes(request.user.role)) {
      throw Error("의료 관계자 및 법률관계자만 사용할 수 있는 기능입니다");
    }
  }
  return;
};
