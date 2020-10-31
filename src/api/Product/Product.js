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
    marketerName: async ({ id }, _, { prisma }) => {
      const product = await prisma.product.findOne({ where: { id } })
      const user = await prisma.user.findOne({ where: { id: product.marketerId } })
      return user.name;
    },
    chatRoomId: async ({ id }, _, { prisma, request }) => {
      const product = await prisma.product.findOne({ where: { id } })
      const userId = await request.user.id
      const rooms = await prisma.room.findMany({
        where: {
          AND:[{
            participants: {
              some: {
                id: userId
              }
            },
            participants: {
              some: {
                id: product.marketerId
              }
            },
          }]
        }
      });
      return rooms.length>0?rooms[0].id:null;
    },
  },
};
