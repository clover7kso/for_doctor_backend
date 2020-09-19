export default {
  Mutation: {
    productAddView: async (_, args, { prisma }) => {
      const { productId } = args;

      const product = await prisma.product.update({
        where: { id: productId },
        data: {
          views: {
            increment: 1,
          },
        },
      });
      return product.count ? true : false;
    },
  },
};
