/** 
 * @name 各种小姐姐视频
 * @rule ^(吊带|丝滑舞蹈|小姐姐|美女穿搭|鞠婧祎|完美身材|杀猪饲料|章若楠|古风|玉足|慢摇|清纯|COS|纯情女高|萝莉|欲梦|甜妹|jk|热舞)$
 * @admin false
 * @public false
 * @author zhu
 * @origin zhu
 * @Github https://github.com/Mrzqd
 * @version 1.0.0
 * @disable false
 * @priority 100
 * @create_at 2023-08-06 16:42:58
 * @Description 暂无描述
 * @LastEditTime 2023-08-06 18:06:59
 * @Copyright Copyright (c) 2023 by zhu, All Rights Reserved.
 */
const request = require('util').promisify(require('request'));

module.exports = async s => {
    let url = ""
    switch(s.getMsg()){
        case "吊带":
            url = "http://api.yujn.cn/api/diaodai.php"
            break;
        case "丝滑舞蹈":
            url = "http://api.yujn.cn/api/shwd.php"
            break;
        case "小姐姐":
            url = "http://api.yujn.cn/api/zzxjj.php"
            break;
        case "美女穿搭":
            url = "http://api.yujn.cn/api/chuanda.php"
            break;
        case "鞠婧祎":
            url = "http://api.yujn.cn/api/jjy.php"
            break;
        case "完美身材":
            url = "http://api.yujn.cn/api/wmsc.php"
            break;
        case "杀猪饲料":
            url = "http://api.yujn.cn/api/shejie.php"
            break;
        case "章若楠":
            url = "http://api.yujn.cn/api/zrn.php"
            break;
        case "古风":
            url = "http://api.yujn.cn/api/hanfu.php"
            break;
        case "玉足":
            let a = "http://api.yujn.cn/api/jpmt.php"
            let b = "http://api.yujn.cn/api/yuzu.php"
            url = Math.random() > 0.5 ? a : b
            break;
        case "慢摇":
            url = "http://api.yujn.cn/api/manyao.php"
            break;
        case "清纯":
            url = "http://api.yujn.cn/api/qingchun.php"
            break;
        case "COS":
            url = "http://api.yujn.cn/api/COS.php"
            break;
        case "纯情女高":
            url = "http://api.yujn.cn/api/nvgao.php"
            break;
        case "萝莉":
            url = "http://api.yujn.cn/api/luoli.php"
            break;
        case "欲梦":
            url = "http://api.yujn.cn/api/ndym.php"
            break;
        case "甜妹":
            url = "http://api.yujn.cn/api/tianmei.php"
            break;
        case "jk":
            url = "http://api.yujn.cn/api/jksp.php"
            break;
        case "热舞":
            url = "http://api.yujn.cn/api/rewu.php"
            break;
    }
    // const r = await request(url)
    s.reply({
        type:"video",
        path:url
    })
}
