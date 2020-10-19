export default {
  Query: {
    postTop: async (_, args, { request, isAuthenticated,prisma }) => {
      isAuthenticated(request,0);
      
      const {} = args;
      const take = 3;
      const categories = [
        "자유게시판",
        "학술정보공유게시판",
        "동호회게시판",
        "중고거래게시판",
      ];
      var posts = [];
      for (var i = 0; i < categories.length; i++) {
        const adding = await prisma.post.findMany({
          take: take,
          where: {
            category: categories[i],
          },
          orderBy: {
            todayViews: "desc",
          },
        });
        posts = [...posts, ...adding];
      }

      return posts;
    },
  },
};
