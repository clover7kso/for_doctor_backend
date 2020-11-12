export default {
  Query: {
    productCategory: async (_, args, { request,isAuthenticated }) => {
      const { type } = args;
      var result = null;
      if (type === "의료기기"){
        isAuthenticated(request,2);
        result = [
          "백내장",
          "C/L",
          "굴절",
          "검사장비",
          "망막",
          "안구건조",
          "의약품",
          "안성형",
        ];
      }
      else if (type === "병원운영"){
        isAuthenticated(request,3);
        result = [
          "홈페이지",
          "인테리어",
          "마케팅",
          "법률제휴",
          "세무/회계",
        ];
      }
      return result;
    },
  },
};
