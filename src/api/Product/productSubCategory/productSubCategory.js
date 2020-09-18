export default {
  Query: {
    productSubCategory: async (_, args, { request, isAuthenticated }) => {
      const { category } = args;

      const rank = 0;
      isAuthenticated(request, rank);

      var result = null;
      if (category === "백내장") {
        result = ["수술장비", "인공수정체", "수술기구", "약", "기타"];
      } else if (category === "C/L") {
        result = ["드림렌즈", "하드렌즈", "소프트렌즈", "관리용품"];
      } else if (category === "굴절") {
        result = ["수술장비", "안내삽입렌즈", "수술기구", "기타"];
      } else if (
        ["검사장비", "망막", "안구건조", "제약", "성형안과"].indexOf(
          category
        ) >= 0
      ) {
        result = [];
      } else if (
        [
          "홈페이지",
          "인테리어",
          "SNS마케팅",
          "바이럴마케팅",
          "영상촬영",
        ].indexOf(category) >= 0
      ) {
        result = [];
      } else {
        throw Error("올바르지 않은 카테고리입니다");
      }
      return result;
    },
  },
};
