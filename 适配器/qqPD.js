/**
 * This file is part of the Bncr project.
 * @author zhu
 * @name qqPD
 * @origin zhu
 * @version 2.5.1
 * @description qq频道机器人适配器
 * @adapter true
 * @public false
 * @disable false
 * @priority 2
 * @Copyright ©2023 zhu and Anmours. All rights reserved
 */
// 本人小菜鸡，代码有不足之处请多多包涵！
module.exports = async () => {
    let DEBUGGER = true // 接收器日志开关，用来debug
    let tips = true;
    if (!sysMethod.config.qqPD.enable) return sysMethod.startOutLogs('qqPD 退出.');
    const TOKEN = sysMethod.config.qqPD.token;
    const APPID = sysMethod.config.qqPD.appid;
    const INTENTS = sysMethod.config.qqPD.intents;
    const hideTip = sysMethod.config.qqPD.hideTip;
    const publish = !sysMethod.config.qqPD;
    const Listened = sysMethod.config.qqPD.Listened ? sysMethod.config.qqPD.Listened : '';
    const defaultchannel_id = sysMethod.config.qqPD.defaultchannel_id;
    const message_reference_stutas = sysMethod.config.qqPD.message_reference;
    const upline = sysMethod.config.qqPD.upline
    if (!TOKEN && !APPID) return console.log('qqPD:配置文件未设置TOKEN或APPID');
    await sysMethod.testModule(['qq-guild-bot'], {install: true});
    await sysMethod.testModule(['request'], {install: true});
    await sysMethod.testModule(['fs'], {install: true});
    await sysMethod.testModule(['url'], {install: true});
    /* HideStart */
    let dev = true;
    if (tips) {
        console.log("\n\n\n\n************************************************\n" +
            "请在官方命令中添加qqPD适配器，否则无法使用官方命令\n" +
            "测试版本，如有bug欢迎反馈\n" +
            "此版本基本实现了消息发送，撤回。消息推送暂时不可用\n" +
            "消息仅支持文字和图片，如果消息发送失败请检查消息内是否存在类似URL格式\n" +
            "如：1.a格式，*.*格式，此为腾讯的限制，不允许发送未备案链接\n" +
            " ©2023 zhu. All rights reserved || github.com/Mrzqd\n" +
            "使用说明请前往 https://github.com/Mrzqd/Bncr_pulgins\n" +
            "*******************************************************************\n如需关闭提升请将适配器前面的tips设置为false\n\n\n\n")
    }
    const {createOpenAPI, createWebsocket} = require('qq-guild-bot');
    const url = require('url');
    const fs = require('fs');
    const request = require('util').promisify(require('request'));
    const pipeline = require('util').promisify(require('stream').pipeline);
    const qqPD = new Adapter('qqPD');
    const path = require('path');
    const Config = {
        appID: APPID, // 申请机器人时获取到的机器人 BotAppID
        token: TOKEN, // 申请机器人时获取到的机器人 BotToken
        intents: INTENTS, // 事件订阅,用于开启可接收的消息类型
        sandbox: false, // 沙箱支持，可选，默认false. v2.7.0+
    };
    // console.log(Config)
    const client = createOpenAPI(Config);
    const ws = createWebsocket(Config);
    if (dev) {
        ws.on('READY', async (wsdata) => {
            if (upline) {
                try {
                    qqPDDB = new BncrDB('qqPD'),
                        da = await qqPDDB.get('admin')
                    var {data} = await client.directMessageApi.createDirectMessage({
                        source_guild_id: da.split(';')[0],
                        recipient_id: da.split(';')[1]
                    });
                    var {data} = await client.directMessageApi.postDirectMessage(data.guild_id, {
                        content: "机器人上线通知",
                    });

                } catch (e) {
                    console.log("上线通知失败，可能未设置管理员")
                    console.log(e)
                }
            }
            console.log('[READY] 事件接收 :', wsdata);
        });

        ws.on('ERROR', (data) => {
            console.log('[ERROR] 事件接收 :', data);
        });
        ws.on('GUILDS', (data) => {
            console.log('[GUILDS] 事件接收 :', data);
        });
        ws.on('GUILD_MESSAGE_REACTIONS', (data) => {
            console.log('[GUILD_MESSAGE_REACTIONS] 事件接收 :', data);
        });
        ws.on('INTERACTION', (data) => {
            console.log('[INTERACTION] 事件接收 :', data);
        });
        ws.on('MESSAGE_AUDIT', (data) => {
            console.log('[MESSAGE_AUDIT] 事件接收 :', data);
        });
        ws.on('FORUMS_EVENT', (data) => {
            console.log('[FORUMS_EVENT] 事件接收 :', data);
        });
        ws.on('AUDIO_ACTION', (data) => {
            console.log('[AUDIO_ACTION] 事件接收 :', data);
        });
        ws.on('PUBLIC_GUILD_MESSAGES', async (eventData) => {
            console.log('[PUBLIC_GUILD_MESSAGES] 事件接收 :', eventData);
        });
        ws.on('GUILD_MEMBERS', (data) => {
            console.log('[GUILD_MEMBERS] 事件接收 :', data);
            if (defaultchannel_id) {
                switch (data.eventType) {
                    case "GUILD_MEMBER_REMOVE":
                        client.messageApi.postMessage(defaultchannel_id, {
                            content: `${data.msg.nick}退出了频道`,
                            msg_id: data.eventId
                        });
                        break;
                    case "GUILD_MEMBER_ADD":
                        // client.messageApi.postMessage('532831283', {
                        //   content: `<@!${data.msg.user.id}> 欢迎加入频道\n发送认领身份豆豆可以认领豆豆组\n发送认领身份无界可以认领无界脚本身份\n如：认领身份豆豆`,
                        //   msg_id:data.eventId
                        // });
                        msgInfo = {
                            userId: data.msg.guild_id + ';' + data.msg.user.id || '',
                            userName: data.msg.user.username || '',
                            zsgroupId: defaultchannel_id || '',
                            groupId: defaultchannel_id || '',
                            replyId: defaultchannel_id + ";" + defaultchannel_id + ";" + data.eventId.split,
                            groupName: '',
                            msg: 'qq频道进群事件' || '',
                            msgId: defaultchannel_id + ";" + defaultchannel_id + ";" + data.msg.user.id + ";" + data.eventId || '',
                        };
                        // console.log(msgInfo)
                        qqPD.receive(msgInfo)
                        break;
                    case "GUILD_MEMBER_UPDATE":
                        client.messageApi.postMessage('532831283', {
                            content: `<@!${data.msg.user.id}> 更新了资料信息`,
                            msg_id: data.eventId
                        });
                        break;
                    default:
                        console.log(data)
                }
            }
        });
    }
    ws.on('GUILD_MESSAGES', (data) => {
        if (DEBUGGER) {
            console.log(data);
        }
        if (data.eventType == "MESSAGE_DELETE") {
            console.log("qq频道监听到撤回消息事件~")
        } else {
            data.msg.content = rehtml(data.msg.content)
            msgInfo = {
                userId: data.msg.guild_id + ';' + data.msg.author.id || '',
                userName: data.msg.author.username || '',
                zsgroupId: data.msg.channel_id || '',
                groupId: publish ? Listened : data.msg.channel_id || '',
                replyId: data.msg.channel_id + ";" + data.msg.channel_id + ";" + data.msg.id || '',
                groupName: '',
                msg: data.msg.content || '',
                msgId: data.msg.guild_id + ';' + data.msg.channel_id + ';' + data.msg.author.id + ';' + data.msg.id || '',
            };
            // console.log(msgInfo)
            qqPD.receive(msgInfo);
            if (DEBUGGER) {
                console.log(
                    `接收到消息\n` +
                    `用户ID:${msgInfo.userId}\n` +
                    `用户名:${msgInfo.userName}\n` +
                    `群ID:${msgInfo.groupId}\n` +
                    `群名:${msgInfo.groupName}\n` +
                    `消息ID:${msgInfo.msgId}\n` +
                    `消息内容:${msgInfo.msg}\n`
                )
            }
        }
    });
    ws.on('DIRECT_MESSAGE', (data) => {
        // console.log('[DIRECT_MESSAGE] 事件接收 :', data);
        //私聊事件
        if (data.eventType == "DIRECT_MESSAGE_DELETE") {
            console.log("qq频道私聊监听到撤回消息事件~")
        } else {
            data.msg.content = rehtml(data.msg.content)
            msgInfo = {
                userId: data.msg.src_guild_id + ';' + data.msg.author.id || '',
                userName: data.msg.author.username || '',
                zsgroupId: '0' || '',
                groupId: '0',
                replyId: data.msg.guild_id + ";" + data.msg.channel_id + ";" + data.msg.id || '',
                groupName: '',
                msg: data.msg.content || '',
                msgId: data.msg.src_guild_id + ';' + data.msg.channel_id + ';' + data.msg.author.id + ';' + data.msg.id || '',
            };
            // console.log(msgInfo)
            qqPD.receive(msgInfo);
        }
    });

    qqPD.reply = async function (replyInfo) {
        console.log(replyInfo)
        try {
            if (replyInfo.groupId != '0') {
                // console.log("群聊消息")
                const reid = publish ? replyInfo.zsgroupId : replyInfo.replyId.split(";")[0];
                // console.log(reid)
                switch (replyInfo.type) {
                    case 'text':
                        replyInfo.msg = replyInfo.msg.replace(/(\b[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\b)/g, (match) => {return match.replace(/\./g, ',');});
                        opt = {
                            content: replyInfo.msg,
                            msg_id: replyInfo.msgId.split(';')[3],
                        }
                        if (message_reference_stutas) {
                            if (replyInfo.msgId.split(';')[3].indexOf(":") == -1) {
                                console.log("非事件消息")
                                opt.message_reference = {
                                    message_id: replyInfo.msgId.split(';')[3],
                                }
                            }
                        }
                        // console.log(opt)
                        var {data} = await client.messageApi.postMessage(reid, opt);
                        //   console.log(data)
                        break;
                    case 'image':
                        const image_url = replyInfo.path;
                        opt = {
                            image: replyInfo.path,
                            content: replyInfo.msg,
                            msg_id: replyInfo.msgId.split(';')[3],
                        }
                        if (message_reference_stutas) {
                            if (!replyInfo.msgId.split(';')[3].indexOf(":")) {
                                opt.message_reference = {
                                    message_id: replyInfo.msgId.split(';')[3],
                                }
                            }
                        }
                        if (isURL(image_url) == "路径") {
                            console.log("路径图片")
                            var data = await sendImage({
                                channelId: reid,
                                sendType: "GUILD",
                                imagePath: image_url,
                                msgId: opt.msg_id,
                                content: replyInfo.msg
                            });
                        } else if (isLocalUrl(image_url)) {
                            console.log("局域网图片")
                            var data = await downloadAndUploadImage({
                                channelId: reid,
                                sendType: "GUILD",
                                imagePath: image_url,
                                msgId: opt.msg_id,
                                content: replyInfo.msg
                            })
                            // console.log(data)
                        } else {
                            console.log("网络图片")
                            // console.log(opt)
                            // console.log(reid)
                            var {data} = await client.messageApi.postMessage(reid, opt);
                        }
                        // var { data } = await client.messageApi.postMessage(reid, opt);
                        break;
                }
            } else {
                
                console.log("私聊消息")
                // console.log(replyInfo)
                var {data} = await client.directMessageApi.createDirectMessage({
                    source_guild_id: replyInfo.userId.split(';')[0],
                    recipient_id: replyInfo.userId.split(';')[1]
                });
                re_guild_id = data.guild_id;
                // console.log(replyInfo.toMsgId)
                switch (replyInfo.type) {
                    case 'text':
                        replyInfo.msg = replyInfo.msg.replace(/\./g, ',');
                        if (replyInfo.toMsgId != 0) {
                            opt = {
                                content: replyInfo.msg,
                                msg_id: replyInfo.msgId.split(';')[3]
                            }
                        } else {
                            console.log("推送消息")
                            opt = {
                                content: replyInfo.msg,
                            }
                        }
                        var {data} = await client.directMessageApi.postDirectMessage(re_guild_id, opt);
                        //   console.log(data)
                        break;
                    case 'image':
                        const image_url = replyInfo.path;
                        if (replyInfo.toMsgId != 0) {
                            console.log("回复消息")
                            opt = {
                                image: image_url,
                                content: replyInfo.msg,
                                msg_id: replyInfo.msgId.split(';')[3]
                            }
                        } else {
                            console.log("推送消息")
                            opt = {
                                content: replyInfo.msg,
                                image: image_url,
                            }
                        }
                        // console.log("图片")
                        if (isURL(image_url) == "路径") {
                            console.log("路径图片")
                            var data = await sendImage({
                                guildId: re_guild_id,
                                sendType: "DIRECT",
                                imagePath: image_url,
                                msgId: opt.msg_id,
                                content: replyInfo.msg
                            });
                        } else if (isLocalUrl(image_url)) {
                            console.log("局域网图片")
                            var data = await downloadAndUploadImage({
                                guildId: re_guild_id,
                                sendType: "DIRECT",
                                imagePath: image_url,
                                msgId: opt.msg_id,
                                content: replyInfo.msg
                            })
                        } else {
                            console.log("网络图片")
                            var {data} = await client.directMessageApi.postDirectMessage(re_guild_id, opt);
                        }
                        // var {data} = await client.directMessageApi.postDirectMessage(String(replyInfo.msgId.split(':')[0]), {
                        //     image: replyInfo.path,
                        //     msg_id:replyInfo.msgId.split(':')[1].replace(/;/g, ":")
                        //   });
                        break;
                }
            }
        } catch (e) {
            console.log(e)
            console.log(replyInfo)
            if (replyInfo.groupId != '0') {
                var {data} = await client.messageApi.postMessage(replyInfo.replyId.split(';')[0], {
                    content: `你的消息发送失败了，请前往控制台检查是否存在违规（违规限制来源于腾讯接口，非适配器）\n错误信息：${e.message}\n错误码为：${e.code}`,
                    msg_id: replyInfo.replyId.split(';')[2]
                });
            } else {
                var {data} = await client.directMessageApi.postDirectMessage(replyInfo.replyId.split(';')[0], {
                    content: `你的消息发送失败了，请前往控制台检查是否存在违规（违规限制来源于腾讯接口，非适配器）\n错误信息：${e.message}\n错误码为：${e.code}`,
                    msg_id: replyInfo.replyId.split(';')[2]
                });
            }

        }
        if(data.code==304023){
            console.log("推送消息无返回")
        }else{
        // console.log(data)
            return data.guild_id + ";" + data.channel_id + ";" + data.author.id + ";" + data.id;
        }

    }
    qqPD.push = async function (pushInfo) {
        console.log("qq频道消息推送")
        try {
            return await this.reply(pushInfo);
        } catch (e) {
            console.error('qq频道 push消息失败', e);
        }
    };
    qqPD.delMsg = async function (args) {
        // console.log("撤回消息")
        args.forEach(async are => {
            if (typeof are === 'string' || typeof are === 'number') {
                // console.log("尝试撤回" + are)
                let [guild_id, channel_id, userid, msgid] = are.split(';');
                // console.log("尝试撤回" + msgid)
                try {
                    let channeldata = await client.channelApi.channel(String(channel_id));
                    if (channeldata.data.owner_id == userid) {
                        console.log("无法撤回频道主的消息哦~")
                        return false
                    } else {
                        try {
                            let delMsgdata = client.messageApi.deleteMessage(String(channel_id), String(msgid), hideTip);
                        } catch (e) {
                            console.log(e);
                        }
                        // console.log(delMsgdata.data)
                    }
                } catch (e) {
                    console.log("私聊无法撤回")
                    return false
                }
            }
        });
        return true;
    };
    return qqPD;

    function isURL(str) {
        // 判断是否为URL
        const parsedUrl = url.parse(str);
        if (parsedUrl.protocol && parsedUrl.host) {
            return 'URL';
        }

        // 判断是否为路径
        if (path.isAbsolute(str) || /^\.\.?[\\\/]/.test(str)) {
            return '路径';
        }

        return '未知';


    }

    function isLocalUrl(urlString) {
        const parsedUrl = url.parse(urlString);
        // console.log(parsedUrl)
        return parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1' || parsedUrl.hostname === '::1' || parsedUrl.hostname.startsWith('192.168.') || parsedUrl.hostname.startsWith('10.') || parsedUrl.hostname.endsWith('.local') || parsedUrl.hostname.startsWith('172.17');
    }

    async function sendImage(opt) {
        const {sendType, content, imagePath, msgId, guildId, channelId} = opt;
        const pushUrl = (sendType === "DIRECT") ? `https://api.sgroup.qq.com/dms/${guildId}/messages` : `https://api.sgroup.qq.com/channels/${channelId}/messages`;
        // console.log(pushUrl);

        if (msgId) {
            formData = {
                content:content,
                msg_id: msgId,
                file_image: fs.createReadStream(imagePath)
            }
        } else {
            formData = {
                content:content,
                file_image: fs.createReadStream(imagePath)
            }
        }

        return new Promise((resolve, reject) => {
            request.post({
                url: pushUrl,
                headers: {
                    "Authorization": `Bot ${APPID}.${TOKEN}`,
                },
                formData: formData
            }, (error, response, body) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    function rehtml(str) {
        if(str){
        // 将实体符号解转义
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&amp;/g, '&');
        str = str.replace(/&quot;/g, '"');
        str = str.replace(/&apos;/g, "'");
        return str;
        }
    }

    async function downloadAndUploadImage(opt) {
        // console.log("开始下载图片");
        const {sendType, imagePath, msgId, guildId, channelId,content} = opt;
        const localImagePath = __dirname + "/image.jpg";
        try {
            await pipeline(
                request.get(imagePath),
                fs.createWriteStream(localImagePath)
            );
            //   console.log("图片下载成功");
            const data = await sendImage({
                channelId: channelId,
                guildId: guildId,
                sendType: sendType,
                imagePath: localImagePath,
                msgId: msgId,
                content:content
            });
            //   console.log("downloadAndUploadImage" + JSON.stringify(data));
            return data;
        } catch (error) {
            console.error('局域网图片下载出错:', error);
            throw error;
        }
    }

    /* HideEnd */
};
