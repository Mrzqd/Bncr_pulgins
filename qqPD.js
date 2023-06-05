/**
 * This file is part of the Bncr project.
 * @author zhu
 * @name zhu
 * @origin zhu
 * @version 1.0.0
 * @description qq频道机器人适配器
 * @adapter true
 * @public false
 * @disable false
 * @priority 2
 * @Copyright ©2023 zhu and Anmours. All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 */

module.exports = async () => {
    let tips = true;
    if (!sysMethod.config.qqPD.enable) return sysMethod.startOutLogs('qqPD 退出.');
    const TOKEN = sysMethod.config.qqPD.token;
    const APPID = sysMethod.config.qqPD.appid;
    const INTENTS = sysMethod.config.qqPD.intents;
    if (!TOKEN && !APPID) return console.log('qqPD:配置文件未设置TOKEN或APPID');
    await sysMethod.testModule(['qq-guild-bot'], { install: true });
    /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203a1a03e8c2ffdf11692d60b70e08c6ebc67a7ec309bd740fefc5ec09d4def2e1fa43539be59917335c3f618ec5450835f2df0a183cfbeffb792ed7f7e26ac9c0722e70f23ae6e0432548d53f70ddd1381dc3bf87d9c4e7dab7401ef8f3c5cf78185224eec27521311399a93cdcaa8debb43636665f878db1618cc00165494654ed7ee68448bcd64f16cce4161e2fc138786c5902dd95e6e642b2b75bf1a11a87c517f8f8370f06fc2d7aa23899411b3cdcce4933e8a5c7dcba9ffe4a5dd595267eb8a4c42d46792d98a5f200a26fd95234e685772b3d1f263d6ee827691a7027ceff0d3635abe07d96eb3ece2dffcdc3ad77a9550f64e3bdf248d266561286e8fa5787ee16b9d825e26cfbcf981e7b9ddb0b3a10889af344c85ad3255ad6363421f1c664e9a97114da44b03ef70efa16557454f58b484f8f9894284bca2b06976aa7e376e27f7da02d0a311f20f4832367b14fdb66eccb68a70126cc5fd9aa96824ad0c0970dae4e8a7070ba0a6b95e42f3df9fdd5ad792aa87fe92adfec2a56ab2f8b9df99adb09ff8602f17b7e0920790d0c6ae79e8d67551a86fa04d3f573f677037108054a952f722454076040275161e6631d7b37a043ca56efc1af6e58643d152866e515de869502d5c6942e86f9bd17ef22b200807ed807f15082dc765b6e287c7f1c203330dd8ef9b4722cf483ddec31a670f4467d349790fc8b51d50f4d076e6176687dd75db1b06d341f99e7d83cfd5399742c5eed11f859eec2fce5b203f6f33315b4b852535e31220746decc3a464ab6cb599d353ad974e552f1abe132165a385ccbdcc9758e78d588bcdb0233fd17e6c82696806cf0bcc987513b7527a8444d1a7dad2f4668fd1ba48015e468dfcdd00f25af6689b1d4fa275d0e87476040246a69c8feb9c5da8341f6762923a649fa64dadb712c8a394adefaac16796cc924c9bfb3996138d110dc29abbd2f967d427bd58dfdacb5233b39cd920cdc143e0586f298f57be9753bc68a886f49622543a0656cfcba437f6c307210cd90518067bc23cea6c6595a6b79c5a440e784320fc017d9acecf613d086bc895db5c50a51d06a523ea273643fd4ab7b67545798d34d859ae8819ed99d38cdb383e2af2d357dc06866dd44fe9a3b95762e0e94446120ede38c2ad007dc5656de47c46f8f8720d8192bd31582991bc08cbdbc2ad59ea8aea4021a59fe60219a9e864630b00d57b380dd1766b84c05f13364ec8715911cb450f3e5e822d1c90f4a5b29c198b974abe63b5c855a7553afaf10ad1e3e183f35b8e9750fee7f23168a9e1766cabd73091dda6a29b28b26df27650d07fff7f17f0de4dd0b9ac2ee8f4aff29c560d9f246c089d9a21c7556f5ebf483eb3540a548ddbe4043a18d21c697ab41b6cde29a5d7d66ac81cfea4929110788c2638244f13af828d66c04f7f2b20cd7261a3dc2fb48f2bad3a377a4f29a1f4f9d47c189f6045ed3c7cd6be0345a6194f5d8e0b9525ae6624dc7b727099aeed28b567c2ee37cc837b0175060709a51225be32dfa6d5e9ad643940114cd91b2c1b2030743b7c36de2cf1cd81833874a4ab7b762c67e8c8958f795fb54dad49941c8b468a70fb5c5959ff7546d6bc1c5105c4b6c482d86d744290aecf1ec0853f2635d2c9ce891bdacfacd1ed3c21ba6a7e0963800e71cd7e9e1f3b4f41df99854c42c691ade98bda1196a83b15d499c34ff5b08992f4b5391eb882e2f9ec38e5e2be7318f86f4ec819cc3d6b9fcfb81e38b7dc567720c8525969d5b64586b5b154b018afe4a7eae9707a3c7e506af62bc659f3e6fb42f39bc5ebce05910fe0793748bf104bb7827aa68614e9b9f40ed8a375afcf39d0fbde3d9aa73e15be92acbc743fc3f57c251f564d4f7f3e50088c5df43b22f4ebba2bb5a352cfa099f02e7f00d477a12788b7849705b31a678502261f313c1f0430ef463c1f6ef444625cc8989eb1e4e02e92482813c12d905e5800c72a282442087eb5c943a5c393e08e8b070742faec86202239f9cad959fe7f42aefe0fed0f8eea4e149656307419d884c0f1767690f4b6d71305b67807c8941d66ed8d4aba8d56bfa0ea3a4823ede8f4413738f3f73b46953543a5aa96f5398b00e7c172806656234ef3c1bdf62c07c3615ab8486af77891c87b582ca3a7254a80d1bbfe65e938f202a6d3615184a07303fb1eec59289e7ba1452f1b210b685495ce7ff0ac08fd8327c599c217c15a7276e23cebebffdd26d993526761c911389bbf5c69e02c2539de3dd0872697233b0d842b6391ff7f67da71eaec43c2e648386204812f905f3b7241c038278463bbde223b96a74ef9bf141ba6602859071d65fd18c779efe3b43e063e2e2ef81e545da42266e3902719ddbeeaa2da92701b1b36394601ef119853cdac0eaed0452d9bd4a34243fb7c84283cbc03070ba0f21ba81f34626a1d5b0266afd28abac77d1def91e10f40a91de17968be437f13f3c6f4e94ae1f0dbefad04b6d06b9346c206380b3a2430566c95ecf4a165fdd78a9edffcdf87b9f95ce1fe09f8f7a0343a4665d8e6783dc70cb51afb4b7d5d51a109e7c7c3c2d1d5d5714d69192c1cc3b70a973ea64d84f84109814ba38f2367288e554af3a7091e234b2d3c832d0178968b380e708226776185d7357605f877554df1035fa436c3353af97797948e331ade4284a9dbf26662b6791f414cc3f41e401ba9ce5e40c3ead2addafb6dd84dd21ca295ee9298f12ba96853b107c5d225ff43589d753fa510e46b871b8ed183469e359de066a4d6f4243568140c7c8d8bf07f2ef32edcc7dbee3d27551d7ce83b4c529bd5c6a352f9aa7a8ea53e2aef516fb016d4169c6ac717aef90420eb638881fd087eb72a2756fd602158f68dd90b5d731630ff0952135e3c654d9ef2b6caba9d7dbdaae28298aed4df8e53b36b57f684b152702981e982d37b31e4e82dafdd2e811356aebbd05d7f65c5ffad3ad28aceb0f366338a9013717be97cfe6f80f803d698bffc7a967a4de70fa20c55a37785a6766821b664718ea4744522844841d6ffa56f651b3a7f9a18ada3f58613a4be8c9b868f54fd977010c05466823dcb55c6fed4bd21650ff29098329c644de4209ce03bb6a7cbe5d28edd6c116a3258dbc34aa0c1d9502256f3851cbcc8b0b9f371fbb07bac55b195be125cc40136a0eddcf2f76beb15c7a446928150f9448250457ed506865ca89261a4221440895a04b7b6b5d52cae1a5821f3e647913298854a049777dcc72c9557d217cdabb5838fb9c41cbbcb77201115426ea47858958275d7b46588d0bfca49b65a2544c8e164c4ac885b3bdddc20ec442b2de342317859a5cfadbd973a02ac513f2cd0dd677fe18ac5aed565a6fd2e61c92c000d41e794caf58bcf05460d414831729b7b5df7e1dfd015a4ccd3e2ddc19fac7997d0f4ad54bd73ea4e9ca28c4a8e8358fe68956a3e4a0e07a2b9d376e252dade7f98706e71b9db6b08dcc2b90860640054bee1b8be885447a79671430971d93e61b200b7acd19093c2713ceb6c5c6125e241a2672abe92e983ce1d02bb641fd9709cb0538643b24a8f50e7e01a209608171c6ebf06aeaf0285365f0a0afd76ad6160065cdeb9c0cc7fd8614d7173ac336e74b172eee0fb29da176938e16fa09a3545bdb54c005299b7163325cbe7d02c4a00306267a47ad853357eee3099a1edd55eda2125990fb929b33bb6e4e16879a5ede5eed5b6b2f199b154556cf458edc30d4cde6b779eb5cf80ddb329b19d09b215f9138e1a599296243acd7acc97500c0731ff72678b6cde406e6e9d70209c9b535a25cb4afecd31940dc8fbb85c857bc3339c217f93d1d7095bec4476671aa0c54730076708f9d046ef47fade2e1acde0b4fedc87028fbe45b9de9d46f738da20963ab925a4a0653079bb7c803452929893e6fed9b005d4915d09722b21e6fd0a00f0e9367abd0c9fd53127d08a7b85fa97ec8f3e39d60888630b890ae03f52d363fd901b7a99742efc447e897b9d6a17656bc64c3df50f1562a490c2b6547aac9ba2abd827a6be0e4437aac5d09ca9daab5ef5ece87128d76c638a5397594da977a04b2e6dc8acfea1857371183b5fff5b6d306c1bed9e3084d6ca8169d321d9a0769c0527792205edb82894df9cc3c3ebeef138cc01d3d9cfcb4138e56e90512794eafbcfdfb2c0413085b1eaf998d8d8b17888251986f4ea798309fa2aa84e5c7c6528482e091b9f934c7bd06bf9c7a666448d0566627eb9a8770431302ea488721051104ea7d8a27a9af09ed7b51cf926ba7570b1fdc630c5bc70f27814c6b111603d742392e24f55538f1a565f1a762ed4e5f38396191c79629b865c0c807ad75f2c44f99dca7bf13fced5d7a269bdfc86f2857dec58d7da2e807d7295bb5304fecfc1cd201a01265be9acd5036f9a9647ddbbe6cddb6a68e50f1a8004d074795959e058a2fc2558dd441dd9d917ec45587113d04e0a72c82a0c6ce65cc451ee83cf833e51d0834a40ab0e901f66c89c494fdfde6308bc3ecb8145c05b1be88392767591862ac7df9b3087d7c2652988896cb45704a279075f2574850e98d7c584d1531811b6a662b704f1ec4b4866512f1235a090b4a21453c53b9c1c11584c92a1890c8fb7e56f0293db95ee49c86e7fed903b2b9393b5d3f638fcd97686d8f8b6387298081d2b1692d4929f828c5910fa6ce577d666c98931e3fe9943429f01faeb6815de566404ab58c90d87bdce80d91ca5feedd44436f94ed74da6e65e03e77fb216da7a79e2252fc71c19de4f5e5500c8e6b63fd1df2ccc84252c8d155113035197a2e45893acec26b9cbfdc7be90e1ebfb7dc91ef9db586d5600a2cec4f5615e67194cfe2e50] */
};



