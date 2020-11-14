export default {
  Mutation: {
    clubUpload: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request,"MEDICAL","UNTIL");
      
      const { clubImage, title, content } = args;
      const user = request.user;
      await prisma.club.create({
        data: {
          user: { connect: { id: user.id } },
          title: title,
          content: content,
          clubImage: clubImage
        },
      });
      return true;
    },
  },
};
