import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    findPw: async (_, args, { prisma }) => {
      const { id, medical_id, medical_cate } = args;

      const exist = await prisma.user.findMany({
        where: {
          AND: [{ id }, { medical_id }, { medical_cate }],
        },
      });
      if (exist && exist.length > 0) {
        const registerSecret = generateSecret();
        console.log(registerSecret);
        try {
          //throw Error();
          await sendSecretMail(id, registerSecret);
          await prisma.user.update({
            data: {
              registerSecret,
            },
            where: {
              id,
            },
          });
          return true;
        } catch (e) {
          console.log(ex);
          throw Error("이메일 발송에 실패했습니다");
        }
      } else {
        throw Error("일치하는 정보가 없습니다");
      }
    },
  },
};
