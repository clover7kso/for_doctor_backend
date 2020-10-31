import {CHANNEL_NEW_MESSAGE} from "../../../Constants";

export default {
  Mutation: {
    sendMessage: async (_, args, {request, prisma, pubsub}) => {
      const {user} = request;
      const {roomId, sendText, toId} = args;
      let room;
      if(roomId == undefined) {
        if(user.id !== toId) {
          isAuthenticated(request,0);
          room = await prisma.room.create({
            data: {
              participants: {
                connect: [{id: toId}, {id: user.id}]
              }
            }
          });
        }
      }
      else {
        room = await prisma.room.findOne({where: {id: roomId}});
      }
      if(!room) {
        throw Error("Room not found");
      }
      const participants = await prisma.room.findOne({where: { id: room.id }}).participants();
      const getTo = participants.filter(participant => participant.id !== user.id)[0];

      const msgData = {
        text:sendText,
        room: {
          connect: {id: room.id}
        },
        from: {
          connect: {id: user.id}
        },
        to: {
          connect: {id: roomId ? getTo.id : toId}
        }
      };
      const message = await prisma.message.create({
        data: msgData
      });
      pubsub.publish(CHANNEL_NEW_MESSAGE, {
        newMessage: message,
        roomId: room.id
      });
      return message;
    }
  }
}