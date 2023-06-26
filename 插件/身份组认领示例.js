/**
 * @author zhu
 * @name 身份组认领
 * @origin zhu
 * @version v1.0.0
 * @description 🐒这个人很懒什么都没有留下。
 * @create_at 2023-01-24 21:24:15
 * @rule ^qq频道进群事件
 * @priority 100000000
 * @admin flase
 * @public false
 * @disable false
 */
const request = require('util').promisify(require('request'));
module.exports = async s => {
    const { createOpenAPI} = require('qq-guild-bot');
    const TOKEN = sysMethod.config.qqPD.token;
    const APPID = sysMethod.config.qqPD.appid;
    const Config = {
        appID: APPID, // 申请机器人时获取到的机器人 BotAppID
        token: TOKEN, // 申请机器人时获取到的机器人 BotToken
    };
    const user = s.getUserId()
    let guildId= user.split(";")[0]
    const client = createOpenAPI(Config);
    var {data} = await client.roleApi.roles(guildId);
    s.reply(`<@!${user.split(";")[1]}> 欢迎加入频道\n发送认领身份豆豆可以认领豆豆组\n发送认领身份无界可以认领无界脚本身份\n如：认领身份无界\n无界来的就认领无界\n豆豆来的就认领豆豆\n请在300秒内进行身份认证，否则你将会被踢出！`)
    password = await s.waitInput(async (s)=> {
            const con = s.getMsg();
            if (con.includes("认领身份")) {
                switch (con.slice(4)) {
                    case '豆豆':
                        var rule = data.roles
                            for(i in rule){
                                if(rule[i]['name']=='豆豆'){
                                    rule_id = rule[i]['id']
                                    console.log(guildId, rule_id, user)
                                    const { data } = await client.memberApi.memberAddRole(guildId, rule_id, user.split(";")[1]);
                                }
                            }
                        break;
                    case '无界':
                        var rule = data.roles
                            for(i in rule){
                                if(rule[i]['name']=='无界'){
                                    rule_id = rule[i]['id']
                                    console.log(guildId, rule_id, user)
                                    const { data } = await client.memberApi.memberAddRole(guildId, rule_id, user.split(";")[1]);
                                }
                            }
                        break;
                    default:
                        await s.reply('认领身份错误,重新输出')
                        return 'again'
                }
            }else{
                return await s.again('认领身份错误,重新输出');  //等价
            }
        }, 300);
        if (password === null) {
            // console.log('timeout')
            client.guildApi.deleteGuildMember(guildId, user); // 超时未认领身份移除频道
        };
}
