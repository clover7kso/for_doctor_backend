export default {
  Room: {
    from: ({id}, _, {request, prisma}) => prisma.room.findOne({where: {id}}).participants({where: {NOT:{id:request.user.id}}, take: 1}),
    message: ({id}, _, {prisma}) => prisma.room.findOne({where: {id}}).messages({take: 1}),
    allMessages: ({id}, _, {prisma}) => prisma.room.findOne({where: {id}}).messages()
  }
}