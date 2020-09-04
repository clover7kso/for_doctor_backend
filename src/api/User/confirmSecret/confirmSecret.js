export default {
  Mutation: {
    confirmSecret: async (_, args, { request, prisma }) => {
      //console.log(request);
      const { id, secret } = args;
      const user = await prisma.user.findOne({
        where: { id },
      });
      if (user.registerSecret === secret) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            email_check: true,
            registerSecret: "",
          },
        });
        return true;
      } else {
        return false;
      }
    },
  },
};
