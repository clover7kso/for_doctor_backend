export default {
  Query: {
    postMany: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request,"MEDICAL","UNTIL");

      const { category, after, searchWord } = args;

      if (after === "End") return { cursor: "End", posts: [] };
      const first = 10;
      const posts = after
        ? await prisma.post.findMany({
            take: first,
            skip: 1,
            cursor: {
              id: after,
            },
            where: {
              AND: [{ category: category }],
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
            include: {
              comments: true,
            },
          })
        : await prisma.post.findMany({
            take: first,
            where: {
              AND: [{ category: category }],
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
            include: {
              comments: true,
            },
          });

      const cursor = first === posts.length ? posts.slice(-1)[0].id : "End";
      return { cursor: cursor, posts: posts };
    },
  },
};
