import { timeFromToday } from "../../utils";

export default {
  Club: {
    userName: async ({ id }, _, { prisma }) => {
      const user = await prisma.club.findOne({ where: { id } }).user();
      return user.name;
    },
    userAvatar: async ({ id }, _, { prisma }) => {
      const user = await prisma.club.findOne({ where: { id } }).user();
      return user.avatar;
    },
    timeFromToday: async ({ id }, _, { prisma }) => {
      const item = await prisma.club.findOne({ where: { id } });
      return timeFromToday(item.createdAt);
    },
    phone: async ({ id }, _, { prisma }) => {
      const user = await prisma.club.findOne({ where: { id } }).user()
      return user.phone;
    },
    chatRoomId: async ({ id }, _, { prisma, request }) => {
      const club = await prisma.club.findOne({ where: { id } })
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
                id: club.userId
              }
            },
          }]
        }
      });
      return rooms.length>0?rooms[0].id:null;
    },
  },
};
