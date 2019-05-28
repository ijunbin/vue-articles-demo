
const _ = require('underscore');


module.exports = {

    /**
     * @author junbin
     * @description 结合两个数组
     */
    combineArray: function (arr_1, arr_1_key, arr_2, arr_2_key, keyArr) {
        if (!Array.isArray(arr_1) || !Array.isArray(arr_2)) {
            return [];
        }

        let arr_2_map = {};
        if (Array.isArray(keyArr) && keyArr.length > 0) {
            arr_2.forEach(ele => {
                arr_2_map[ele[arr_2_key]] = _.pick(ele, keyArr);
            });
        } else {
            arr_2.forEach(ele => {
                arr_2_map[ele[arr_2_key]] = ele;
            });
        }

        let type = typeof arr_1_key;
        if (type === 'function') {
            let handle = arr_1_key;
            arr_1.forEach((ele, i) => {
                handle(ele, i, arr_2_map);
            })
        } else if (type === 'string') {
            arr_1.forEach(ele => {
                let key = ele[arr_1_key];
                if (key) {
                    val = arr_2_map[key];
                    _.extend(ele, val);
                }
            })
        }

        return arr_1;
    },
}