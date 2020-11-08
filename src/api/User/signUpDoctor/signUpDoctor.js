import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    signUpDoctor: async (_, args, { prisma }) => {
      const {
        id,
        password,
        phone,
        name,
        medical_id,
        medical_cate,
        medical_certi,
        medical_hospital,
      } = args;

      const existAccount = await prisma.user.findMany({
        where: {
          OR: [{ id }, { phone }],
        },
      });
      if (existAccount && existAccount.length > 0) {
        if (existAccount.filter((user) => user.id == id).length > 0) {
          throw Error("이미 존재하는 ID 입니다");
        } else if (existAccount.filter((user) => user.phone == phone).length > 0) {
          throw Error("이미 사용중인 전화번호입니다");
        } 
      }

      const existDoctor = await prisma.userDoctor.findMany({
        where: {
          OR: [{ medical_id, medical_cate }],
        },
      });
      if (existDoctor && existDoctor.length > 0) {
        if (
          existDoctor.filter(
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
          role:medical_cate.includes("의사")?0:1,
          UserDoctor:{
            create:{
              medical_id:medical_id,
              medical_cate:medical_cate,
              medical_certi:medical_certi,
              medical_hospital:medical_hospital,
            }
          }
        },
      });
      return true;
    },
  },
};
