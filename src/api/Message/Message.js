import { timeFromToday } from "../../utils";

export default {
  Message: {
    from: ({id}, _, {prisma}) => prisma.message.findOne({where: {id}}).from(),
    to: ({id}, _, {prisma}) => prisma.message.findOne({where: {id}}).to(),
    room: ({id}, _, {prisma}) => prisma.message.findOne({where: {id}}).room(),
    timeFromToday: async ({ id }, _, { prisma }) => {
      const item = await prisma.message.findOne({ where: { id } });
      return timeFromToday(item.createdAt);
    },
  }
};
