/**
 * @author zhu
 * @name 绑定qq
 * @origin zhu
 * @version v1.1.0
 * @description 用于其他平台同步qq上的pinDB数据 todo:定时同步
 * @create_at 2023-06-26 09:54:15
 * @rule ^绑定qq$
 * @priority 1000
 * @admin flase
 * @public false
 * @disable false
 */
const pinDB = new BncrDB('pinDB');
module.exports = async s => {
    yzmqq = "xxxxxxxxx" //这里填写接收验证码的qq，不想让qq接收验证码请自行在40行改push方法
    const user = s.getUserId()
    const qqb = new BncrDB("绑定qq")
    if(await qqb.get(user)){
        s.reply("你已绑定"+await qqb.get(user)+"\n如需删除请回复“删除q绑”，不需要回复任意")
        is = await s.waitInput(async (s)=> {
        }, 30);
        if (is === null) return s.reply('超时退出');
        if (is.getMsg() === 'q') return s.reply('已退出');
        if(is.getMsg()=="删除q绑"){
            t = await qqb.del(user)
            st = await pinDB.del(s.getFrom()+":"+s.getUserId())
            console.log(t,s)
            if(t&&st){
                s.reply("删除成功")
            }
        }
    }else{
        s.reply("请发送qq号")
        qq = await s.waitInput(async (s)=> {
        }, 30);
        if (qq === null) return s.reply('超时退出');
        if (qq.getMsg() === 'q') return s.reply('已退出');
        var randoms = generateRandomNumber()
        // 验证码推送
        await sysMethod.push({
                    platform: 'qq',
                    groupId: `0`,
                    userId: yzmqq,  
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
            v = await pinDB.get("qq:"+qq.getMsg())
            v.ID = s.getUserId()
            v.Form = s.getFrom()
            v.Name = s.getUserName()
            await pinDB.set(s.getFrom()+":"+s.getUserId(),v)
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
