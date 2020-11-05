export default {
  Query: {
    postSubCategory: async (_, args, {}) => {
      const {} = args;

      var result = ['자유게시판','학술정보공유게시판','중고거래게시판'];
      
      return result;
    },
  },
};
