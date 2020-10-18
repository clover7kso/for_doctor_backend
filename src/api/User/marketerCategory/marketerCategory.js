export default {
  Query: {
    marketerCategory: async (_, args, { request, prisma }) => {
      return ["의료기기판매", "병원관련서비스"];
    },
  },
};
