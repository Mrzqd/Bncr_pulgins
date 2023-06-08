# 注意!!!!!!,如果你发送信息控制台没有任何输出，请打开debug模式，先设置管理员，userID字段后面就是管理员！ set qqPD admin userID
# Bncr_plugins打成Bncr_pulgins了，哈哈哈~ 如果您感觉好用可以帮我点个star嘛
```diff
- 消息发送最大长度为2500，如果你机器人提示msg over length 状态码为1000001，说明超过了bot单消息长度限制，请将消息分片！
 ```
 [我的qq频道](https://pd.qq.com/s/gz6qod7fb) 
 ### 请认领无界的身份
# 最新一版增加了开发审核时间的开关，需要在官方进行审核的可以更新此版本，记得更新config.js的内容
此处提交审核后，请勿必配置好publish和Listened
![image](https://github.com/Mrzqd/Bncr_pulgins/assets/104408988/c030d7ee-a118-4424-99cb-aaa97f99c428)

# 大更新！！！，修复了撤回bug,修改了消息字段

```js
{
    "userId": data.msg.author.id,  //消息发送人ID
    "userName": data.msg.author.username,  //消息发送人昵称
    "groupId": data.msg.guild_id + ":" + data.msg.channel_id,  // 消息来源频道ID:子频道ID,频道ID和子频道ID使用:进行分割
    "groupName": "",
    "msg": data.msg.content,  // 消息内容
    "msgId": String(data.msg.channel_id)+":"+String(data.msg.id)+":"+String(data.msg.author.id), // 消息来源频道ID:子频道ID:消息ID:消息发送人ID
  }
  ```

# 更新了消息接收器开关和撤回显示开关，请更新config.js和qqPD.js
## qq频道适配器使用说明：
首先在qq开发者中心创建机器人  
记录下botappid和机器人令牌  
![image](https://github.com/Mrzqd/Bncr_pulgins/assets/104408988/aad69a75-a516-4ab9-bcfe-ed2eb72f073e)  
## 在手机端，你的qq频道主页点击机器人，能看到你注册的机器人，点击添加后机器人就会出现在你的qq频道的群聊中  
![image](https://github.com/Mrzqd/Bncr_pulgins/assets/104408988/d1cb6f56-d4eb-4206-b323-dba2a7f97a1a)  
将适配器qqPD.js放在无界的Adapter目录下，按照config.sample.js中的qqPD字段将token和appid填写在你的config.js的配置文件中。  
```diff
- 在官方插件的官方命令中将第七行修改为  
- * @platform qq ssh HumanTG tgBot wxQianxun wxKeAImao wxXyo qqPD 
```
就是在最后添加qqPD.  
重启无界  
你可以看到如下提示  
![image](https://github.com/Mrzqd/Bncr_pulgins/assets/104408988/73c5e156-4a4a-4a61-91ed-a9851fbd2cb0)  
当你看到如下提示时候，就代表你的机器人一上线  
![image](https://github.com/Mrzqd/Bncr_pulgins/assets/104408988/913c4f73-9b46-4b9a-a3cd-201f0f867189)  
在群内发送time或任意字符  
![image](https://github.com/Mrzqd/Bncr_pulgins/assets/104408988/30c105cd-c544-4972-b99f-e5afbef4363a)  
可以看到机器人已经可以收到消息了  
(出现shards不存在无需管理，改字段不印象使用，按照官方的说明这个字段是为机器人添加很多频道时候进行分片使用的：：https://bot.q.qq.com/wiki/develop/api/gateway/shard.html)  
set qqPD admin @后面的字段就是你的id   
如set qqPD admin 1182xxxxxx3154  
然后在群内发送监听该群即可快乐玩耍  
如有bug可在当前issus中反馈，感谢你的使用！
