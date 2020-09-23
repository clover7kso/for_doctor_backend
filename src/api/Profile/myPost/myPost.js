export default {
  Query: {
    myPost: async (_, args, { request, prisma }) => {
      const {} = args;
      const user = request.user;
      const posts = await prisma.post.findMany({
        where: {
          userId: user.id,
        },
      });
      return posts;
    },
  },
};
