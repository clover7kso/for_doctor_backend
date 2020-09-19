export default {
  Query: {
    productOne: async (_, args, { request, prisma, isAuthenticated }) => {
      const { id } = args;

      const rank = 0;
      isAuthenticated(request, rank);

      const product = await prisma.product.findOne({
        where: { id: id },
        include: {
          sampleImages: {
            select: {
              url: true,
            },
          },
          detailImages: {
            select: {
              url: true,
            },
          },
        },
      });

      return product;
    },
  },
};
