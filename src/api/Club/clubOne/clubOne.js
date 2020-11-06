export default {
  Query: {
    clubOne: async (_, args, { request, isAuthenticated,prisma }) => {
      isAuthenticated(request,0);

      const { id } = args;

      const club = await prisma.club.findOne({
        where: {
          id,
        },
      });
      return club;
    },
  },
};
