import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args, { request, prisma }) => {
      //console.log(request);
      const { email } = args;
      const registerSecret = generateSecret();
      console.log(registerSecret);
      try {
        //throw Error();
        await sendSecretMail(email, registerSecret);
        await prisma.user.update({
          data: {
            registerSecret,
          },
          where: {
            email,
          },
        });
        return true;
      } catch (ex) {
        console.log(ex);
        return false;
      }
    },
  },
};
