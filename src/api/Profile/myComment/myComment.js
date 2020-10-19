export default {
  Query: {
    myComment: async (_, args, { request,isAuthenticated, prisma }) => {
      isAuthenticated(request,0);

      const {} = args;
      const user = request.user;

      const comments = await prisma.comment.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return comments;
    },
  },
};
