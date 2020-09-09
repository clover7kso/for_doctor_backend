export default {
  Query: {
    postTop: async (_, args, { prisma }) => {
      const { category } = args;

      const posts = await prisma.post.findMany({
        where: {
          category,
        },
      });
      return posts;
    },
  },
};
