export default {
  Query: {
    productOne: async (_, args, { prisma }) => {
      const { id } = args;

      const product = await prisma.product.findOne({
        where: { id: id },
        include: {
          sampleImages: {
            select: {
              url: true,
            },
            orderBy:{
              imgOrder:"asc"
            }
          },
          detailImages: {
            select: {
              url: true,
            },
            orderBy:{
              imgOrder:"asc"
            }
          },
        },
      });

      return product;
    },
  },
};
