/**
 * This file is part of the Bncr project.
 * @author zhu
 * @name webHooktgBot
 * @origin zhu
 * @version 2.0.1
 * @description webHooktgBot适配器
 * @adapter true
 * @public false
 * @disable false
 * @priority 2
 * @Copyright ©2023 zhu. All rights reserved
 */

const jsonSchema = BncrCreateSchema.object({
    enable: BncrCreateSchema.boolean().setTitle('是否开启适配器').setDescription(`设置为关则不加载该适配器`).setDefault(false),
    token: BncrCreateSchema.string().setTitle('机器人token').setDescription(`机器人token`).setDefault(''),
    url: BncrCreateSchema.string().setTitle('无界公网地址').setDescription(`TGBot公网地址`).setDefault(''),
    proxyHost: BncrCreateSchema.string().setTitle('代理地址').setDescription(`TGBot代理地址`).setDefault(''),
});

/* 配置管理器 */
const ConfigDB = new BncrPluginConfig(jsonSchema);


module.exports = async () => {
    await ConfigDB.get();
    if (!Object.keys(ConfigDB.userConfig).length) {
        sysMethod.startOutLogs('未配置qqPD适配器,退出.');
        return;
    }
    if (!ConfigDB?.userConfig?.enable) return sysMethod.startOutLogs('未启用qqPD 退出.');
    const TOKEN = ConfigDB?.userConfig?.token;
    const url = ConfigDB?.userConfig?.url;
    if (!TOKEN ) return console.log('webHooktgBot:配置文件未设置TOKEN');
    await sysMethod.testModule(['node-telegram-bot-api'], { install: true });
    const TelegramBot = require(`node-telegram-bot-api`);
    //这里new的名字将来会作为 sender.getFrom() 的返回值
    const webHooktgBot = new Adapter('webHooktgBot');
    /**向/api/系统路由中添加路由 */
    router.get('/api/bot/webHooktgBot', (req, res) =>
        res.send({ msg: '这是Bncr webHooktgBot Api接口，你的get请求测试正常~，请用post交互数据' })
    );
    const tgBot = new TelegramBot(TOKEN,{
        baseApiUrl : ConfigDB?.userConfig?.proxyHost
    });
    tgBot.setWebHook(`${url}/api/bot/webHooktgBot`);
    router.post(`/api/bot/webHooktgBot`, (req, res) => {
        console.log('webHooktgBot接收到消息:', JSON.stringify(req.body));
        tgBot.processUpdate(req.body);
        res.sendStatus(200);
      });
      webHooktgBot.reply = async function (replyInfo, send = '') {
        try {
            let sendId = +replyInfo.groupId || +replyInfo.userId;
            if (replyInfo.type === 'text') {
                send = await tgBot.sendMessage(sendId, replyInfo.msg);
            } else if (replyInfo.type === 'image') {
                send = await tgBot.sendPhoto(sendId, replyInfo.path);
            } else if (replyInfo.type === 'video') {
                send = await tgBot.sendVideo(sendId, replyInfo.path);
            }
            return send ? `${send.chat.id}:${send.message_id}` : '0';
        } catch (e) {
            console.error('tg发送消息失败....',e);
        }
    };
    /* 推送方法 */
    webHooktgBot.push = async function (replyInfo) {
        try {
            return await this.reply(replyInfo);
        } catch (e) {
            console.error('tgBot push消息失败', e);
        }
    };
    /* 注入删除消息方法 */
    webHooktgBot.delMsg = async function (args) {
        try {
            args.forEach(e => {
                if (typeof e === 'string' || typeof e === 'number') {
                    let [chatid, sendid] = e.split(':');
                    // console.log(chatid);
                    // console.log(sendid);
                    console.log('撤销:', e);
                    tgBot.deleteMessage(chatid, sendid);
                }
            });
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    tgBot.on('message', req => {
        try {
            // console.log("data: ", req);
            if(req.photo){
                req.text = req.photo[req.photo.length - 1].file_id;
            }
            if(req.video){
                req.text = req.video.file_id;
            }
            if(req.document){
                req.text = req.document.file_id;
            }
            // console.log(req.text)
            let msgInfo = {
                userId: req['from']['id'] + '' || '',
                userName: req['from']['username'] || '',
                groupId: req['chat']['type'] !== 'private' ? req['chat']['id'] + '' : '0',
                groupName: req['group_name'] || '',
                msg: req['text'] || '',
                msgId: `${req['chat']['id']}:${req['message_id']}` || '',
                fromType: `Social`,
            };
            // console.log('tg最终消息：', msgInfo);
            webHooktgBot.receive(msgInfo);
        } catch (e) {
            console.log('webHooktgBot接收器错误:', e);
        }
    });
    sysMethod.startOutLogs('链接webHooktgBot 成功.');
    return webHooktgBot;
};
