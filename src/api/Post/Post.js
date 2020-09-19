import { timeFromToday } from "../../utils";

export default {
  Post: {
    userName: async ({ id }, _, { prisma }) => {
      const user = await prisma.post.findOne({ where: { id } }).user();
      return user.name;
    },
    commentCount: async ({ id }, _, { prisma }) => {
      const comments = await prisma.post.findOne({ where: { id } }).comments();
      return comments.length;
    },
    timeFromToday: async ({ id }, _, { prisma }) => {
      const item = await prisma.post.findOne({ where: { id } });
      return timeFromToday(item.createdAt);
    },
  },
};
