
const mongoose = require('../db/index.js').mongo;
const { Article } = require('../scheme/index.js');
const moment = require('moment');

module.exports = {

    // 获取单个文章
    findOne: async function (id) {
        return await Article.findOne({ '_id': mongoose.Types.ObjectId(id) });
    },

    //获取所有文章
    findAll: async function (skip, limit, user, label) {

        let andOpt = [];
        let option = {
            $and: andOpt
        }
        if (user) {
            andOpt.push({
                'author': mongoose.Types.ObjectId(user)
            });
        }
        if (label) {
            andOpt.push({
                $or: [
                    { 'title': { $regex: new RegExp(label, "i") } },
                    { 'labels': { $regex: new RegExp(label, "i") } }
                ]
            });
        }
        if (!user && !label) {
            option = {};
        }
        return await Article.find(option)
            .skip(skip)
            .limit(limit)
            .sort({ '_id': -1 });
    },

    //获取文章总量
    count: async function (user, label) {
        let andOpt = [];
        let option = {
            $and: andOpt
        }
        if (user) {
            andOpt.push({
                'author': mongoose.Types.ObjectId(user)
            });
        }
        if (label) {
            andOpt.push({
                $or: [
                    { 'title': { $regex: new RegExp(label, "i") } },
                    { 'labels': { $regex: new RegExp(label, "i") } }
                ]
            });
        }
        if (!user && !label) {
            option = {};
        }
        return await Article.count(option);
    },

    // 插入文章
    insert: async function (author, title, content, resource, labels) {
        let now = moment().unix();
        await Article.create({
            createTime: now,
            updateTime: now,
            content,
            title,
            url: resource,
            author: mongoose.Types.ObjectId(author),
            labels: labels
        })
    },

    // 删除文章
    delete: async function (id) {
        return await Article.remove({ '_id': mongoose.Types.ObjectId(id) })
    },

    // 更新文章
    update: async function (id, title, content, resource, labels) {
        let now = moment().unix();
        await Article.update({
            '_id': mongoose.Types.ObjectId(id),
        }, {
                updateTime: now,
                content,
                title,
                url: resource,
                labels: labels
            })
    }
}