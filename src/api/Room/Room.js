export default {
  Room: {
    participants: ({id}, _, {request, prisma}) => prisma.room.findOne({where: {id}}).participants({where: {NOT:{id:request.user.id}}, take: 1}),
    recentMessage: ({id}, _, {prisma}) => prisma.room.findOne({where: {id}}).messages({take: 1,orderBy:{createdAt:"desc"}}),
    allMessages: ({id}, _, {prisma}) => prisma.room.findOne({where: {id}}).messages({orderBy:{createdAt:"desc"}})
  }
}