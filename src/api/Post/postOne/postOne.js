export default {
  Query: {
    postOne: async (_, args, { prisma }) => {
      const { id } = args;

      const post = await prisma.post.findOne({
        where: {
          id,
        },
      });
      return post;
    },
  },
};
