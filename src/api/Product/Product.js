export default {
  Product: {
    isLiked: async (parent, _, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      return (
        (await prisma.likeProduct.count({
          where: {
            AND: [
              { product: { id: parent.id } },
              { user: { id: request.user.id } },
            ],
          },
        })) > 0
      );
    },
    phone: async ({ id }, _, { prisma }) => {
      const marketer = await prisma.product.findOne({ where: { id } }).Marketer().user()
      return marketer.phone;
    },
    company: async ({ id }, _, { prisma }) => {
      const marketer = await prisma.product.findOne({ where: { id } }).Marketer()
      return marketer.company_name;
    },
  },
};
