export default {
  Mutation: {
    signUp: async (_, args, { prisma }) => {
      const {
        id,
        password,
        nickname,
        email,
        medical_id,
        medical_cate,
        medical_certi,
      } = args;

      const exist = await prisma.user.findMany({
        where: {
          OR: [{ id }, { nickname }, { email }, { medical_id, medical_cate }],
        },
      });
      if (exist && exist.length > 0) {
        if (exist.filter((user) => user.id == id).length > 0) {
          throw Error("This id already taken");
        } else if (exist.filter((user) => user.email == email).length > 0) {
          throw Error("This email already taken");
        } else if (
          exist.filter((user) => user.nickname == nickname).length > 0
        ) {
          throw Error("This username already taken");
        } else if (
          exist.filter(
            (user) =>
              user.medical_id == medical_id && user.medical_cate == medical_cate
          ).length > 0
        ) {
          throw Error("This medical_id and medical_cate already taken");
        }
      }

      await prisma.user.create({
        data: {
          id,
          password,
          nickname,
          email,
          medical_id,
          medical_cate,
          medical_certi,
        },
      });
      return true;
    },
  },
};
