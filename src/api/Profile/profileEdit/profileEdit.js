export default {
  Mutation: {
    profileEdit: async (_, args, { prisma }) => {
      const { avatar, password, phone } = args;

      return true;
    },
  },
};
