export default {
  Mutation: {
    productAddCall: async (_, args, { prisma }) => {
      const { productId } = args;

      const product = await prisma.product.update({
        where: { id: productId },
        data: {
          calls: {
            increment: 1,
          },
        },
      });
      return product.count ? true : false;
    },
  },
};
