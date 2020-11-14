export default {
  Mutation: {
    postUpload: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request,"MEDICAL","UNTIL");
      
      const { category, title, content, anonymous } = args;
      const user = request.user;
      await prisma.post.create({
        data: {
          user: { connect: { id: user.id } },
          category: category,
          title: title,
          content: content,
          anonymous: anonymous===true
        },
      });
      return true;
    },
  },
};
