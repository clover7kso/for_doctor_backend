export default {
  Query: {
    productMany_Deprecated: async (_, args, { prisma }) => {
      const { mainCategory, subCategory, after, searchWord } = args;

      if (after === "End") return { cursor: "End", products: [] };
      const first = 10;
      const products = after
        ? await prisma.product.findMany({
            take: first,
            skip: 1,
            cursor: {
              id: after,
            },
            where: {
              AND: [
                { mainCategory: mainCategory },
                { subCategory: subCategory },
              ],
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
              aboveAD: "desc",
            },
            include: {
              sampleImages: {
                take: 1,
              },
            },
          })
        : await prisma.product.findMany({
            take: first,
            where: {
              AND: [
                { mainCategory: mainCategory },
                { subCategory: subCategory },
              ],
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
              aboveAD: "desc",
            },
            include: {
              sampleImages: {
                take: 1,
              },
            },
          });

      const cursor =
        first === products.length ? products.slice(-1)[0].id : "End";
      return { cursor: cursor, products: products };
    },
  },
};
