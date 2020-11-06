export default {
  Mutation: {
    clubAddView: async (_, args, { request, isAuthenticated,prisma }) => {
      isAuthenticated(request,0);

      const { clubId } = args;

      const club = await prisma.club.update({
        where: { id: clubId },
        data: {
          views: {
            increment: 1,
          },
        },
      });
      return club.count ? true : false;
    },
  },
};
