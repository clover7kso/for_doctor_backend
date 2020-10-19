export default {
  Query: {
    myPost: async (_, args, { request,isAuthenticated, prisma }) => {
      isAuthenticated(request,0);

      const {} = args;
      const user = request.user;
      const posts = await prisma.post.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return posts;
    },
  },
};
