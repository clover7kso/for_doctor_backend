export default {
  Query: {
    productMany: async (_, args, { request, prisma, isAuthenticated }) => {
      const { mainCategory, subCategory, after } = args;

      const rank = 0;
      isAuthenticated(request, rank);

      const first = 20;
      const products = after
        ? await prisma.product.findMany({
            take: first,
            cursor: {
              id: after,
            },
            where: {
              AND: [
                { mainCategory: mainCategory },
                { subCategory: subCategory },
              ],
            },
            include: {
              sampleImages: {
                take: 1,
              },
            },
          })
        : await prisma.product.findMany({
            take: first,
            where: {
              AND: [
                { mainCategory: mainCategory },
                { subCategory: subCategory },
              ],
            },
            include: {
              sampleImages: {
                take: 1,
              },
            },
          });
      return products;
    },
  },
};
