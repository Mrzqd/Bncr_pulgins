/**
 * @author zhu
 * @name sillyGirl迁移
 * @origin zhu
 * @version v1.0.0
 * @description sillyGirl迁移.js
 * @create_at 2023-04-22 10:24:15
 * @rule ^一键迁移
 * @priority 100000000
 * @admin true
 * @public false
 * @disable false
 */

module.exports = async s => {
    const request = require('util').promisify(require('request'));
    //获取全部的存储库
    url = "http://172.17.0.1:8081"  //这里填写你的sillyGirl的地址
    cookies = "uuid=xxxxx-xxxxxx-xxxxxxx-xxxxxxx; token=xxxxxx-xxxx-xxxxx-xxxx-xxxxxxxx" //这里填写你的sillyGirl的cookie,登录傻妞后f12，刷新页面，找一个请求查看cookie
    banku = ['pinDB', 'AmingScriptQl', 'AmingScript', 'AmingScript_Jdc', 'jd_cookie']  //这里填写你不想迁移的库
    storage_url = url + "/api/storage?search="
    headers = {
        "Cookie": cookies
    }
    r = (await request({ url: storage_url, method: "get", "dataType": "json", timeout: 5000, headers: headers }))
    rstatus = r.statusCode
    alldata = r.body
    alldata = JSON.parse(alldata)
    if(rstatus == 401){
        console.log(`登录失效,状态码${rstatus}`)
        return
    }
    if(rstatus != 200 || alldata == ""){
        console.log(`获取数据失败,状态码${rstatus},返回数据${alldata}`)
        return
    }
    console.log(alldata)
    alldata = alldata.data
    for (i in alldata) {
        ku = alldata[i].value
        // if(banku.indexOf(ku) != -1){
        if(ku!='pinDB'){
            continue
        } else {
            console.log(`开始迁移${ku}`)
            getDataUrl = url + "/api/storage?keys=" +encodeURI(ku)
            kudata = (await request({ url: getDataUrl, method: "get", "dataType": "json", timeout: 5000, headers: headers })).body
            kudata = JSON.parse(kudata).data
            setku = new BncrDB(ku)
            for(j in kudata){
                j_value = kudata[j]
                j = j.replace(ku+".","")
                await setku.set(j,j_value)
            }
        }
    }
}
