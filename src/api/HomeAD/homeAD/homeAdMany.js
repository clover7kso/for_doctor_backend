export default {
  Query: {
    homeAdMany: async (_, args, { prisma }) => {
      const {} = args;

      const homeAds = await prisma.homeAD.findMany({
        where: {},
      });
      return homeAds;
    },
  },
};
