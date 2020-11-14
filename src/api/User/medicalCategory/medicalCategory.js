export default {
  Query: {
    medicalCategory: async (_, args, { request, prisma }) => {
      const { role } = args;
      return role==="DOCTOR"?["안과의사"]:["검안사", "간호사"];
    },
  },
};
