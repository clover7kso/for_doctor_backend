export default {
  Query: {
    seeRooms: async(_, __, {request, prisma}) => {
      const {user} = request;
      const result = await prisma.room.findMany({
        where: {
          participants: {
            some: {
              id: user.id
            }
          },
        },
      });
      return result
    }
  }
}