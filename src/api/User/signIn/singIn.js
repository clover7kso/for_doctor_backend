import { generateToken } from "../../../utils";
export default {
  Query: {
    signIn: async (_, args, { prisma }) => {
      const { id, password } = args;

      const user = await prisma.user.findOne({
        where: { id },
      });
      if (user) {
        if (user.password !== password) {
          throw Error("Wrong PW");
        } else {
          const token = generateToken(user.id);
          return token;
        }
      } else {
        throw Error("Wrong ID");
      }
    },
  },
};
