export default {
  ProductLike: {
    user: async ({ id }, _, { prisma }) => {
      const user = await prisma.likeProduct.findOne({ where: { id } }).user();
      return user;
    },
    product: async ({ id }, _, { prisma }) => {
      const product = await prisma.likeProduct
        .findOne({ where: { id } })
        .product({
          include: {
            sampleImages: {
              take: 1,
            },
          },
        });
      return product;
    },
  },
};
