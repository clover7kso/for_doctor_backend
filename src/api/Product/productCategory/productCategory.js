export default {
  Query: {
    productCategory: async (_, args, { request, isAuthenticated }) => {
      const rank = 0;
      isAuthenticated(request, rank);

      return [
        "백내장",
        "C/L",
        "굴절",
        "검사장비",
        "망막",
        "안구건조",
        "제약",
        "성형안과",
      ];
    },
  },
};
