export default {
  Query: {
    profile: async (_, args, { prisma, request }) => {
      return request.user
    },
  },
};
