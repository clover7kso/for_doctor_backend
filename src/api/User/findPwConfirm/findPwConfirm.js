import { sendPasswordMail } from "../../../utils";

export default {
  Mutation: {
    findPwConfirm: async (_, args, { prisma }) => {
      //console.log(request);
      const { id, secret } = args;

      const user = await prisma.user.findOne({
        where: { id },
      });
      if (user && user.registerSecret === secret) {
        try {
          await sendPasswordMail(id, user.password);
          return true;
        } catch (ex) {
          console.log(ex);
          throw Error("이메일 발송에 실패했습니다");
        }
      } else {
        throw Error("비밀코드가 일치하지 않습니다");
      }
    },
  },
};
