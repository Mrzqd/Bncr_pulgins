/**
 * @author zhu
 * @name 绑定qq
 * @origin zhu
 * @version v1.0.0
 * @description 用于其他平台同步qq上的pinDB数据 todo:定时同步
 * @create_at 2023-06-26 09:24:15
 * @rule ^绑定qq$
 * @priority 1000
 * @admin flase
 * @public false
 * @disable false
 */
module.exports = async s => {
    const user = s.getUserId()
    const qqb = new BncrDB("绑定qq")
    if(await qqb.get(user)){
        s.reply("你已绑定"+await qqb.get(user)+"\n如需修改请联系管理员")
    }else{
        s.reply("请发送qq号")
        qq = await s.waitInput(async (s)=> {
        }, 30);
        if (qq === null) return s.reply('超时退出');
        if (qq.getMsg() === 'q') return s.reply('已退出');
        var randoms = generateRandomNumber()
        await sysMethod.push({
                    platform: 'qq',
                    groupId: `0`,
                    userId: `xxxxxxxx`,  //此处填写接收验证码的qq号
                    msg: s.getUserName()+"的验证码是："+randoms,
                })
        s.reply("请向管理员索要验证码！\n验证码是随机的，请不要发送别人的验证码")
        s.reply("请发送验证码：");
        code = await s.waitInput(async (s)=> {
        }, 600);
        if (code === null) return s.reply('超时退出');
        if (code.getMsg() === 'q') return s.reply('已退出');
        if(code.getMsg()==randoms){
            qqb.set(user,qq.getMsg())
            s.reply("已绑定")
            const pinDB = new BncrDB('pinDB');
            v = await pinDB.get("qq:"+qq.getMsg())
            v.ID = s.getUserId()
            v.Form = s.getFrom()
            v.Name = s.getUserName()
            pinDB.set(s.getFrom()+":"+s.getUserId(),v)
        }else{
            s.reply("验证码错误，已退出")
        }
    }
}
function generateRandomNumber() {
  var min = 100000; // 最小值
  var max = 999999; // 最大值
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}
