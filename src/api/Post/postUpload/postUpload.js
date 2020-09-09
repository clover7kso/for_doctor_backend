export default {
  Mutation: {
    postUpload: async (_, args, { prisma }) => {
      const { id, userNickname, category, title, content } = args;

      await prisma.post.create({
        data: {
          id,
          userNickname,
          category,
          title,
          content,
        },
      });
      return true;
    },
  },
};
