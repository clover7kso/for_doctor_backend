export default {
  Query: {
    productSubCategory: async (_, args, {}) => {
      const { category } = args;

      var result = null;
      if (category === "백내장") {
        result = ["수술장비", "인공수정체", "수술기구", "기타"];
      } else if (category === "C/L") {
        result = ["드림렌즈", "하드렌즈", "소프트렌즈", "렌즈관리용액", "인공눈물", "식염수", "기타"];
      } else if (category === "굴절") {
        result = ["레이저장비", "수술장비", "안내삽입렌즈", "수술기구", "의약품", "기타"];
      }else if (category === "망막") {
        result = ["치료", "장비", "기타"];
      }else if (category === "안구건조") {
        result = ["치료", "장비", "기타"];
      }else if (category === "의약품") {
        result = ["싸이클로스포린", "카르복시메틸셀룰로오스", "트리암시놀롤아세테이드", "항생점안제", "녹내장", "백내장", "산동제", "기타"];
      }else if (category === "안성형") {
        result = ["보톡스", "필러", "기타"];
      } else if (
        ["검사장비"].indexOf(
          category
        ) >= 0
      ) {
        result = [];
      } else if (
        [
          "홈페이지",
          "인테리어",
          "마케팅",
          "법률제휴",
          "세무/회계",
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
