import { timeFromToday } from "../../utils";

export default {
  Comment: {
    userName: async ({ id }, _, { prisma }) => {
      const user = await prisma.comment.findOne({ where: { id } }).user();
      return user.name;
    },
    userAvatar: async ({ id }, _, { prisma }) => {
      const user = await prisma.comment.findOne({ where: { id } }).user();
      return user.avatar;
    },
    timeFromToday: async ({ id }, _, { prisma }) => {
      const item = await prisma.comment.findOne({ where: { id } });
      return timeFromToday(item.createdAt);
    },
  },
};
