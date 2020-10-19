export default {
  Query: {
    postOne: async (_, args, { request, isAuthenticated,prisma }) => {
      isAuthenticated(request,0);

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
