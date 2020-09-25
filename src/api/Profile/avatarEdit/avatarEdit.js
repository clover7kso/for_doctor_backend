import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    avatarEdit: async (_, args, { request, prisma }) => {
      const user = request.user;
      const { avatar } = args;

      await prisma.user.update({
        where: { id: user.id },
        data: {
          avatar,
        },
      });
    },
  },
};
