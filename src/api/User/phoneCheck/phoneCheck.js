const Cache = require('memory-cache');
export default {
  Mutation: {
      phoneCheck: async (_, args, {}) => {
        const {phoneNumber, checkNumber} = args
        const CacheData = Cache.get(phoneNumber);
        if (!CacheData) {
          console.log(1)
          return false;
        }

        if (CacheData !== checkNumber) {
          console.log(2)
          return false;
        }

        console.log(3)
        Cache.del(phoneNumber);
        return true;
      },
    },
  };
  