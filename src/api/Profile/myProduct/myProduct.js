export default {
  Query: {
    myProduct: async (_, args, { request,isAuthenticated, prisma }) => {
      isAuthenticated(request,"MEDICAL","UNTIL");

      const {} = args;
      const user = request.user;

      const products = await prisma.likeProduct.findMany({
        where: {
          userId: user.id,
          NOT: {
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
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return products;
    },
  },
};
