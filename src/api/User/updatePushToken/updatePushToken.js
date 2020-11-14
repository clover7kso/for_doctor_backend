export default {
  Mutation: {
    updatePushToken: async (_, args, { prisma,request }) => {
        const {token} = args;
        const {user} = request;
        const result = await prisma.user.update({
            where: { id:user.id },
            data: { pushToken: token },
        });
        return result!==undefined;
    },
  },
};
