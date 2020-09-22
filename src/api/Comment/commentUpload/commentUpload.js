export default {
  Mutation: {
    commentUpload: async (_, args, { request, prisma }) => {
      const { postId, text } = args;
      const userId = request.user.id;

      await prisma.comment.create({
        data: {
          user: { connect: { id: userId } },
          post: { connect: { id: postId } },
          text: text,
        },
      });
      return true;
    },
  },
};
