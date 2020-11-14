export default {
  Query: {
    clubOne: async (_, args, { request, isAuthenticated,prisma }) => {
      isAuthenticated(request,"MEDICAL","UNTIL");

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
