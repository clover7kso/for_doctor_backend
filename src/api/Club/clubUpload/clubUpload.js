export default {
  Mutation: {
    clubUpload: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request,0);
      
      const { category, title, content } = args;
      const user = request.user;
      await prisma.club.create({
        data: {
          user: { connect: { id: user.id } },
          title: title,
          content: content,
        },
      });
      return true;
    },
  },
};
