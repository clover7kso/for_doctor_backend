import aws from "aws-sdk";

export default {
  Mutation: {
    avatarEdit: async (_, args, { request, prisma }) => {
      const user = request.user;
      const { avatar } = args;

      const s3 = new aws.S3({
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        region: "ap-northeast-2",
      });
      if (user.avatar !== null) {
        const key = user.avatar.replace(
          "https://for-doctor.s3.ap-northeast-2.amazonaws.com/",
          ""
        );
        s3.deleteObject({ Bucket: "for-doctor", Key: key }, function (
          err,
          data
        ) {
          console.log(err);
          console.log(data);
        });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          avatar,
        },
      });
      return true;
    },
  },
};
