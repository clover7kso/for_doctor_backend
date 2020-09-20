export default {
  Mutation: {
    postUpload: async (_, args, { request, prisma }) => {
      const { category, title, content } = args;
      const user = request.user;
      await prisma.post.create({
        data: {
          user: { connect: { id: user.id } },
          category: category,
          title: title,
          content: content,
        },
      });
      return true;
    },
  },
};
