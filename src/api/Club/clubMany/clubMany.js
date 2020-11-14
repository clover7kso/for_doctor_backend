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
          })
        : await prisma.club.findMany({
            take: first,
            where: {
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
          });
      const cursor = first === clubs.length ? clubs.slice(-1)[0].id : "End";
      return { cursor: cursor, clubs: clubs };
    },
  },
};
