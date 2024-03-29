import {CHANNEL_NEW_MESSAGE} from "../../../Constants";
import {sendPush} from "../../../utils"

export default {
  Mutation: {
    sendMessage: async (_, args, {request, isAuthenticated, prisma, pubsub}) => {
      const {user} = request;
      const {roomId, sendText, toId} = args;
      if(user.id === toId) {
        throw Error("본인글에 메세지를 전송할 수 없습니다.");
      }

      let room;
      if(roomId == undefined) {
        let rooms = await prisma.room.findMany({
            where: {
              AND: [
                {
                  participants: {
                    some: {
                      id: user.id
                    }
                  }
                },
                {
                  participants: {
                    some: {
                      id: toId
                    }
                  }
                }
              ]
            }
        });
        if(rooms === undefined || rooms.length === 0){
          isAuthenticated(request,"MEDICAL","UNTIL");
          room = await prisma.room.create({
            data: {
              participants: {
                connect: [{id: toId}, {id: user.id}]
              }
            }
          });
        }
        else{
          room = rooms[0]
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

      const toUser = await prisma.user.findOne({
        where:{
          id:toId
        }
      });
      
      sendPush([toUser.pushToken],`[${toUser.name}]님께서 메세지를 보냈습니다. '${sendText}'`)
      return message;
    }
  }
}