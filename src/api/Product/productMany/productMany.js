export default {
  Query: {
    productMany: async (_, args, { prisma }) => {
      const { mainCategory, subCategory, searchWord } = args;
      
      const products = await prisma.product.findMany({
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
            {
              Marketer:{
                company_name:{
                  contains: searchWord,
                }
              }
            }
          ],
        },
        include: {
          sampleImages: {
            take: 1,
            orderBy:{
              imgOrder:"asc"
            }
          },
        },
      })
    
      return products;
    },
  },
};
