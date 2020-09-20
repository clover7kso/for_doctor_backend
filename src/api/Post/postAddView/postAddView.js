export default {
  Mutation: {
    postAddView: async (_, args, { prisma }) => {
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
