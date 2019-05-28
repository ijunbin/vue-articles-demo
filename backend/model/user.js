
const { User } = require('../scheme/index.js');

module.exports = {


    // 创建用户
    createUser: async function (username, nickname, password, hobby, sex, email) {
        await User.create({
            username, nickname, password,
            hobby, sex, email
        })
    },

    // 查找用户
    findUser: async function (option) {
        return await User.findOne(option);
    },

    //查询用户
    findByIds: async function (ids) {
        return await User.find({ '_id': { $in: ids } });
    }
}