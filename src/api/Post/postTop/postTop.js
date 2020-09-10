export default {
  Query: {
    postTop: async (_, args, { prisma }) => {
      const {} = args;

      const posts = await prisma.post.findMany({
        distinct: ["category"],
        orderBy: {
          todayViews: "desc",
        },
      });
      return posts;
    },
  },
};
