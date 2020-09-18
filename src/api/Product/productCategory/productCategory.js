export default {
  Query: {
    productCategory: async (_, args, { request, isAuthenticated }) => {
      const rank = 0;
      isAuthenticated(request, rank);
      const { type } = args;
      var result = null;
      if (type === "의료기기")
        result = [
          "백내장",
          "C/L",
          "굴절",
          "검사장비",
          "망막",
          "안구건조",
          "제약",
          "성형안과",
        ];
      else if (type === "마케팅")
        result = [
          "홈페이지",
          "인테리어",
          "SNS마케팅",
          "바이럴마케팅",
          "영상촬영",
        ];
      return result;
    },
  },
};
