export default {
  Query: {
    commentMany: async (_, args, { prisma }) => {
      const { postId } = args;

      const comments = await prisma.comment.findMany({
        where: {
          postId,
        },
      });
      return comments;
    },
  },
};
