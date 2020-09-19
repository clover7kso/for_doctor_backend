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
  },
};
