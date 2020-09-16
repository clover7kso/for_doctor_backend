export default {
  Query: {
    productMany: async (_, args, { request, prisma, isAuthenticated }) => {
      const rank = 0;
      isAuthenticated(request, rank);

      const { mainCategory, subCategory, after, first } = args;

      const products = after
        ? await prisma.product.findMany({
            take: first,
            cursor: {
              id: after,
            },
            where: { AND: [mainCategory, subCategory] },
          })
        : await prisma.product.findMany({
            take: first,
            where: { AND: [mainCategory, subCategory] },
          });

      return products;
    },
  },
};
