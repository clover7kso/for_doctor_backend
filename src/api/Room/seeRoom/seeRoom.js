export default {
  Query: {
    seeRoom: async (_, args, {request, prisma}) => {
      const {roomId} = args;
      const {user} = request;
      const canSee = await prisma.room.findMany({
        where: {
          id:roomId,
          participants: {
            some: {
              id: user.id
            }
          }
        }
      });
            
      if(canSee) {
        return canSee[0];
      }
      else {
        throw Error("You can't see this");
      }
    }
  }
}