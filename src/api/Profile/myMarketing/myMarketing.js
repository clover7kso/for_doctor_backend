export default {
  Query: {
    myMarketing: async (_, args, { request, prisma }) => {
      const {} = args;
      const user = request.user;

      const marketings = await prisma.likeProduct.findMany({
        where: {
          userId: user.id,
          OR: [
            {
              product: {
                mainCategory: "홈페이지",
              },
            },
            {
              product: {
                mainCategory: "인테리어",
              },
            },
            {
              product: {
                mainCategory: "SNS마케팅",
              },
            },
            {
              product: {
                mainCategory: "바이럴마케팅",
              },
            },
            {
              product: {
                mainCategory: "영상촬영",
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return marketings;
    },
  },
};
