# Bncr_pulgins
## qq频道适配器使用说明：
首先在qq开发者中心创建机器人
记录下botappid和机器人令牌
![image](https://github.com/Mrzqd/Bncr_pulgins/assets/104408988/aad69a75-a516-4ab9-bcfe-ed2eb72f073e)
## 在手机端，你的qq频道主页点击机器人，能看到你注册的机器人，点击添加后机器人就会出现在你的qq频道的群聊中
![image](https://github.com/Mrzqd/Bncr_pulgins/assets/104408988/d1cb6f56-d4eb-4206-b323-dba2a7f97a1a)
将适配器qqPD.js放在无界的Adapter目录下，按照config.sample.js中的qqPD字段将token和appid填写在你的config.js的配置文件中。
## 在官方插件的官方命令中将第七行修改为
 * @platform qq ssh HumanTG tgBot wxQianxun wxKeAImao wxXyo qqPD
就是在最后添加qqPD.
重启无界
你可以看到如下提示
![image](https://github.com/Mrzqd/Bncr_pulgins/assets/104408988/73c5e156-4a4a-4a61-91ed-a9851fbd2cb0)
当你看到如下提示时候，就代表你的机器人一上线
![image](https://github.com/Mrzqd/Bncr_pulgins/assets/104408988/913c4f73-9b46-4b9a-a3cd-201f0f867189)
在群内发送time或任意字符
![image](https://github.com/Mrzqd/Bncr_pulgins/assets/104408988/30c105cd-c544-4972-b99f-e5afbef4363a)
可以看到机器人已经可以收到消息了，
set qqPD admin @后面的字段就是你的id 
如set qqPD admin 1182xxxxxx3154
然后在群内发送监听该群即可快乐玩耍
如有bug可在当前issus中反馈，感谢你的使用！