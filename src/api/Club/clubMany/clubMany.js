export default {
  Query: {
    clubMany: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request,"MEDICAL","UNTIL");

      const {after, searchWord} = args;

      if (after === "End") return { cursor: "End", clubs: [] };
      const first = 10;
      const clubs = after
        ? await prisma.club.findMany({
            take: first,
            skip: 1,
            cursor: {
              id: after,
            },
            where: {
              AND: [{ user:{role:request.user.role} }],
              OR: [
                {
                  title: {
                    contains: searchWord,
                  },
                },
                {
                  content: {
                    contains: searchWord,
                  },
                },
              ],
            },
            orderBy: {
              createdAt: "desc",
            },
            include:{
              user: {
                select:{
                  role:true
                },
              }
            }
          })
        : await prisma.club.findMany({
            take: first,
            where: {
              AND: [{ user:{role:request.user.role} }],
              OR: [
                {
                  title: {
                    contains: searchWord,
                  },
                },
                {
                  content: {
                    contains: searchWord,
                  },
                },
              ],
            },
            orderBy: {
              createdAt: "desc",
            },
            include:{
              user: {
                select:{
                  role:true
                },
              }
            }
          });
      const cursor = first === clubs.length ? clubs.slice(-1)[0].id : "End";
      return { cursor: cursor, clubs: clubs };
    },
  },
};
