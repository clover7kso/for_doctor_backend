export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request,"MEDICAL","UNTIL");
      const { productId } = args;
      const { user } = request;
      const filterOpts = {
        where: {
          AND: [{ user: { id: user.id } }, { product: { id: productId } }],
        },
      };
      try {
        const exisitingLike = await prisma.likeProduct.count(filterOpts);
        if (exisitingLike > 0) {
          await prisma.likeProduct.deleteMany(filterOpts);
        } else {
          await prisma.likeProduct.create({
            data: {
              user: { connect: { id: user.id } },
              product: { connect: { id: productId } },
            },
          });
        }
      } catch (ex) {
        console.log(ex);
        return false;
      }
      return true;
    },
  },
};
