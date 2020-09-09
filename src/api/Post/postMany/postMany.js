export default {
  Query: {
    postMany: async (_, args, { prisma }) => {
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
