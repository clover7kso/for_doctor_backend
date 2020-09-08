export default {
  Mutation: {
    confirmSecret: async (_, args, { prisma }) => {
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
        throw Error("비밀코드가 일치하지 않습니다");
      }
    },
  },
};
