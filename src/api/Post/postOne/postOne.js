export default {
  Query: {
    postOne: async (_, args, { request, isAuthenticated,prisma }) => {
      isAuthenticated(request,"MEDICAL","UNTIL");

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
