export default {
  Query: {
    postSubCategory: async (_, args, {request}) => {
      const {} = args;

      var result = request.user.role==="DOCTOR"?['자유게시판','학술정보공유게시판','중고거래게시판']:['자유게시판','학술정보공유게시판'];
      
      return result;
    },
  },
};
