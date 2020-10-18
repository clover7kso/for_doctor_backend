export default {
  Mutation: {
    checkIdPhone: async (_, args, { prisma }) => {
      const {
        id,
        phone,
      } = args;

      const exist = await prisma.user.findMany({
        where: {
          OR: [{ id }, { phone }],
        },
      });
      if (exist && exist.length > 0) {
        if (exist.filter((user) => user.id == id).length > 0) {
          throw Error("이미 존재하는 ID 입니다");
        } else if (exist.filter((user) => user.phone == phone).length > 0) {
          throw Error("이미 사용중인 전화번호입니다");
        } 
      }
      return true
    },
  },
};
