export default {
  Query: {
    myPost: async (_, args, { request,isAuthenticated, prisma }) => {
      isAuthenticated(request,"MEDICAL","UNTIL");

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
