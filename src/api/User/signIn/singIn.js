import { generateToken } from "../../../utils";
export default {
  Mutation: {
    signIn: async (_, args, { prisma }) => {
      const { id, password } = args;

      const user = await prisma.user.findOne({
        where: { id },
      });
      if (user) {
        if (user.password !== password) {
          throw Error("잘못된 비밀번호입니다");
        } else if (!user.permit) {
          throw Error(
            "조금만 기다려주세요. 의사인증 중입니다. 회원가입 이후 1~2일가량 소요됩니다"
          );
        } else {
          const token = generateToken(user.id);
          return token;
        }
      } else {
        throw Error("존재하지 않는 ID입니다");
      }
    },
  },
};
