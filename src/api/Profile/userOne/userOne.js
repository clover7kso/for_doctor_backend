export default {
  Query: {
    userOne: async (_, args, { request, prisma }) => {
      const {} = args;
      const user = request.user;
      return user;
    },
  },
};
