export default {
  Mutation: {
    signUpMarketer: async (_, args, { prisma }) => {
      const {
        id,
        password,
        phone,
        name,
        company_cate, 
        company_name,
        company_id, 
        company_certi,
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

      const existMarketer = await prisma.userMarketer.findMany({
        where: {
          OR: [{ company_id }],
        },
      });
      if (existMarketer && existMarketer.length > 0) {
        if (
          existMarketer.filter(
            (user) =>
              user.company_id == company_id
          ).length > 0
        ) {
          throw Error("사업자번호가 이미 회원가입되있습니다");
        }
      }

      await prisma.user.create({
        data: {
          id,
          password,
          phone,
          name,
          role:"MARKETER",
          UserMarketer:{
            create:{
              company_cate:company_cate,
              company_id:company_id,
              company_name:company_name,
              company_certi:company_certi,
            }
          }
        },
      });
      return true;
    },
  },
};
