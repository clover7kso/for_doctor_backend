export default {
  Mutation: {
    commentUpload: async (_, args, { prisma }) => {
      const { id, userNickname, text } = args;

      await prisma.comment.create({
        data: {
          id,
          userNickname,
          text,
        },
      });
      return true;
    },
  },
};
