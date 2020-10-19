export default {
  Mutation: {
    postAddView: async (_, args, { request, isAuthenticated,prisma }) => {
      isAuthenticated(request,0);

      const { postId } = args;

      const post = await prisma.post.update({
        where: { id: postId },
        data: {
          views: {
            increment: 1,
          },
          todayViews: {
            increment: 1,
          },
        },
      });
      return post.count ? true : false;
    },
  },
};
