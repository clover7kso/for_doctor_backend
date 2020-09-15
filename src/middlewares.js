export const isAuthenticated = (request, rank) => {
  const rank_doctor = ["안과의사"];
  const rank_medical = ["안과의사", "검안사", "간호사"];
  if (!request.user) {
    throw Error(
      "로그인 토큰이 만료되었습니다. 로그아웃 이후 재로그인 부탁드립니다."
    );
  } else {
    if (rank === 0 && rank_doctor.indexOf(request.user.medical_cate) < 0) {
      throw Error("의사만 사용할 수 있는 기능입니다");
    } else if (
      rank === 1 &&
      rank_medical.indexOf(request.user.medical_cate) < 0
    ) {
      throw Error("의료 관계자만 사용할 수 있는 기능입니다");
    }
  }
  return;
};
