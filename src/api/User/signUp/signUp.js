import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    signUp: async (_, args, { prisma }) => {
      const {
        id,
        password,
        phone,
        name,
        medical_id,
        medical_cate,
        medical_certi,
      } = args;

      const exist = await prisma.user.findMany({
        where: {
          OR: [{ id }, { name }, { medical_id, medical_cate }, { phone }],
        },
      });
      if (exist && exist.length > 0) {
        if (exist.filter((user) => user.id == id).length > 0) {
          throw Error("이미 존재하는 ID 입니다");
        } else if (exist.filter((user) => user.name == name).length > 0) {
          throw Error("이미 사용중인 닉네임입니다");
        } else if (exist.filter((user) => user.phone == phone).length > 0) {
          throw Error("이미 사용중인 전화번호입니다");
        } else if (
          exist.filter(
            (user) =>
              user.medical_id == medical_id && user.medical_cate == medical_cate
          ).length > 0
        ) {
          throw Error("면허분류와 면허번호가 이미 회원가입되있습니다");
        }
      }

      await prisma.user.create({
        data: {
          id,
          password,
          phone,
          name,
          medical_id,
          medical_cate,
          medical_certi,
        },
      });

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
      } catch (ex) {
        console.log(ex);
        throw Error("이메일 발송에 실패했습니다");
      }
    },
  },
};
