export default {
  Query: {
    medicalCategory: async (_, args, { request, prisma }) => {
      return ["안과의사", "검안사", "간호사"];
    },
  },
};
