import { timeFromToday } from "../../utils";

export default {
  Post: {
    userName: async ({ id }, _, { prisma }) => {
      const user = await prisma.post.findOne({ where: { id } }).user();
      return user.name;
    },
    userAvatar: async ({ id }, _, { prisma }) => {
      const user = await prisma.post.findOne({ where: { id } }).user();
      return user.avatar;
    },
    commentCount: async ({ id }, _, { prisma }) => {
      const comments = await prisma.post.findOne({ where: { id } }).comments();
      return comments.length;
    },
    timeFromToday: async ({ id }, _, { prisma }) => {
      const item = await prisma.post.findOne({ where: { id } });
      return timeFromToday(item.createdAt);
    },
    comments: async ({ id }, _, { prisma }) => {
      const items = await prisma.comment.findMany({
        where: { postId: id },
        orderBy: [{ createdAt: "desc" }],
      });
      return items;
    },
  },
};