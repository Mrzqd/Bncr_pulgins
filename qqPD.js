/**
 * This file is part of the Bncr project.
 * @author zhu
 * @name zhu
 * @origin zhu
 * @version 2.0.1
 * @description qq频道机器人适配器
 * @adapter true
 * @public false
 * @disable false
 * @priority 2
 * @Copyright ©2023 zhu and Anmours. All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 */
module.exports = async () => {
    let DEBUGGER = false // 接收器日志开关，用来debug
    let tips = true;
    if (!sysMethod.config.qqPD.enable) return sysMethod.startOutLogs('qqPD 退出.');
    const TOKEN = sysMethod.config.qqPD.token;
    const APPID = sysMethod.config.qqPD.appid;
    const INTENTS = sysMethod.config.qqPD.intents;
    const hideTip = sysMethod.config.qqPD.hideTip ? sysMethod.config.qqPD.hideTip : true;
    const publish = sysMethod.config.qqPD.publish ? sysMethod.config.qqPD.publish : false;
    const Listened = sysMethod.config.qqPD.Listened ? sysMethod.config.qqPD.Listened : '';
    if (!TOKEN && !APPID) return console.log('qqPD:配置文件未设置TOKEN或APPID');
    await sysMethod.testModule(['qq-guild-bot'], { install: true });
    /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203a1a03e8c2ffdf11692d60b70e08c6ebc67a7ec309bd740fefc5ec09d4def2e1fa43539be59917335c3f618ec5450835f2df0a183cfbeffb792ed7f7e26ac9c0722e70f23ae6e0432548d53f70ddd1381dc3bf87d9c4e7dab7401ef8f3c5cf78185224eec27521311399a93cdcaa8debb43636665f878db1618cc00165494654ed7ee68448bcd64f16cce4161e2fc138786c5902dd95e6e642b2b75bf1a11a87c517f8f8370f06fc2d7aa23899411b3cdcce4933e8a5c7dcba9ffe4a5dd595267eb8a4c42d46792d98a5f200a26fd95234e685772b3d1f263d6ee827691a7027ceff0d3635abe07d96eb3ece2dffcdc3ad77a9550f64e3bdf248d266561286e8fa5787ee16b9d825e26cfbcf981e7b9ddb0b3a10889af344c85ad3255ad636342ef1863b25b12989163c83c77f0324c3e6a27aef30972d04d4527590fabda3254ce9a67085390341c67a24213f5ad92c7873768107c17dba40b8fb9129ea74f77c3ee0bf2d1f5df529d6a233f43b846c3381d8a3cd93d9e49286dfb2d496ac4c4cd7553a087b8a4406a2b53c341357377f5ce99342b8724c782a1e79dc0cb98a18ab659b36993f4c802ca10cac0e08f8707563378ac109351a70ecfc81d01a55335999cca158c471e6670ab624b3243ec86684614e5e8079aa44994737c435c77e7cf9cf1daf156a15e0544c4632b837c4ede0f39c4c5534fdf13330b85661e0cbb73d745f1b52df85c445039c9dd6ff53a64121a51054d5f40650ab8a0a6b9fb14e12dde489dbbaeafd803d6c2309b89e897399ed358e07abebab46b68315b0e6817d63d87628b1cea8ee6047a72afef171e88fd45a2591951251f355dcaf1529dd9ada5917d8e8d051c884976aee60c36c7ff71dc7d26c71fdc6c079052afe767fc6252abf70d239e47d6ef96ca04ba92a16e5ef19934ae278d12256256b5f00d5642c8d9794e1a1e2f0e5482c2f7dd80542614bcb4b1f63d16f1e9664e429af4c193f94c0ecad3f274d37e852d7d23b446825a6a53cd996314b09566eb5520694bd7b2a529f5109b658869e423ae2bd94b171e9b43639d489b983def64488d784e5c9e57839ba436f25c5f75f74d73b80b097ef73f7849a246d365e91e7970ef4ecf33a96af7c2e1bfc6b00e0af9c1fc7b6187428823ed868be31b4664124a33bf76ebbfb9c22b99faae2faee351cc23770edb4462eac514526b4cc6d5ff835725117ec534c557996bad49ca98eaec6d599b3744a6d5f9d27eac59940ca835be2e1d0daad9b02be4d63c0c698b56082bf1187ad757595ca030a682b93193e3010573059a728333379f632e8c05da45519313848f59dd550a307aac311f3a44bcb271da9349aa015459f5a61e3edff82c7841e788461a980a12b2b87479eb47a68b3d72a2d67261aa2057d045e47a2919cb1cc2b6576211dab6618e10038429944d704312b653df119968dbfb9463667ac98cf719fc5975ca1bdeadcb06506fd1f056601175056bb8505befa30bef8e28555572d480b021a11bff8a10823a1db13651dd5c9702f951d01be50efa0a6bd79c9e6a8ff50d1c2e322eb0a963238bf5564593d31fcb693156cc5a69978243ddd059ef7eba24fa03a1d8b87c7ecf2d184ee8bb05bde15f0060921850c94eb17bea85006c787a2bc748f8248b986fbb972bd25f4ef019baedcc27cb5cff880010859c63243ab81e6ab47f8418ade99b139c95b4bb1308da51c242d54dc990417193c035129f56ccdd9dd58ec1fdfcdf4b0566f0eb0882ec9adef7399ef52c130b4780a8c3780ba3a73509b17dc881547ad83ceefa9766fac85b4ed798342cce2a3af2dc75f1bab225f52d573204135f370d7943b9a1a6515fbcdc220874793e7910b3934f969fb50542afa11f4592a7976742d6a9fd2362bbd22c506851fd762bcebcdbf08db4f5be4f8567b9222450048057f26581baebb490a33822401f702072e32375928ffed0a46b17ed2fec27e755c0aef5d98e41fac27ae103ceeb0d5d6cc771077651aa190a96370cabee020c14a5617a6ea668f1611d27c94c49615d23fcec70635d9a2895f505132c68bc5c11913944a90f289f40c8d2059ff7d3adab9b7213710112577277708c1d28bc2fb8ffe217eee496e4211db9b5111510b6deae8e0ff75add8acb3ffa8936a303046ef5432e7f88de30895b039e66dc4f221b32a1dc842eaa4f628da6d88d5f098d9f188c50b366504ba2de8442804a3e95562c437a53177955c92b2a96fde79569e71ec9a1ff8d574a66e37ea6adbb72017d29fa9f34ece77f20cbd002ea7acd985f0c14bbfb165a678169bc54694a35eb99d4adcf6add59d3a9472c75d76cbcc4e7bf80a9ff008b2d07154136777172156e21dd796c5bb43638bdad03f859c7e525cafb3aac7462b54f26c708355093821a8c023fec5864469150b225d2bfddbb4a9e75aaa1146a4374936fe3df3d7fa70bf83bdbafd84b697fbadf3974fa26a14b0e294df17503489bdf3b79b0e692ae21e3a1a5ddeaf76a18cafd5cd3c608f43514c2c2472293b944421ae2cecf7af51846919499e87cdddb7f315403c627a46e17b65bd0b4f9b40bdf3d0a3c12fd63792c4fd4ffbbc2c3f904daac789d29f26d501d5547a10ab1bb87619a59763cda1aa0926fe21fa86ca3df610342859b9af60b7594a8e1a3e1ea3526fa8ec882cae8ff303f3950b2612b3d34f25eb4a9faa36e593c777afaa2cdd6bcd3ea7011957778fdbe7b10bb53a8861fc3bd93961261dfdd958e7f91cf5cec5c57abe9769af668ac8cca8ab443819bd07e618cf639276aa2cff05850f823343df83771db0b2a5fb2609aed387885e5eda38118f2c2e81251c1415ac759609f5e61e99673b33c2323c17313b9a5cbc257307dfe4cb841e6356b0405ddc08b9dc72211f6f107f9927c3450ed6d9228b88d0b87d3bdda4be4a4677cba2311c6bae05103a69af90ea5f2956d25c02ee2963b1e245000f9de8d731a84dfa3acd251d79aba9d53aaf112d47cb7f13e684c98845a53e5bca9d79a7ff09fafb5a6350a39a51d811e687f4ce5d81afd5087be8df78b5fa6c13f9d8dcec37dfc80f8938bfa844cc7f4f8ee38fd955e410e8c720cf5dce872b454f440e78f28b1703be10cd8aa0e01fab4e97ee1eb10938e2a2923f6c77df07fb114d7b9744234dbad9999056ab912e28a118b973336dd9abd0563003e3d0787c7977f7678ff033a0ff90280c5108eaf9e3038758994d092d1fcfd737053156a8ac923a128a1ca0aca9d76ae86df74fe4418084bfb11ec1bf26dcc27cdaa37d885a53561eff73393f013878b1dc8aa5854af33517111b6b51489ed48dd1dea9138e8a73ba376115ebcf1de0bc32e4011e3c7d1de75d9efb34c11a7caa33a2800b5cedb72cde75bf29dd0748d32a7824b173097d833cd364b13484a69f04e16d878506a522071dfc480673b84772a2594895bbe48220be5dbaa40ba80395db6a64cb0461a9fe61eff390b4d045cc038c02e597a6c3c6a6e1ae78042ca102457c8d3fe0c7fe0b35bf7c2542209c6db67be6f8d9c822ab5456a02662e735fce7586bc5030dc51f6884f4a70b705a23dfc455b77c99a6177ff8960fdf4849813378cbead3464fa00179a650bd6d3f94f677f4b50b01b8fbf30f5014986ee4dddaea24a189c003a1be932558edda833704b49b2648fd11b2fa8e5df9246b6c53c825c12e0cea8f958b3d45eea72203cd3bc1858a87094e6f47b9856124d9bd956d826998fa72702d00df58f849a089293cd2189db3bff2d2d29ea2a694ac5b883f56a3263fdd858ce8624171820e499534477e2ca7c8f1862fb0ba00eed2f63b5246a69cd1381441bf7941b9cf47f6972bf61fab15da862aac232283415252ae1e0839944e0f221a8c81d76fe0515bdd35ba7d649044123e72d1793c29c211bbe67a5ea2a716513cb6aad4b7aa8d5762c633e7cc651c1feaa5238fa2404278b5cb80905a8e5272bb0e9579c42f5cf7e470382f7c8805126cfd1b3265fc005963505c49953467950419b6aeb8a20f73b6609c5b9c599b2bdbe18088b638085a4540235fb7a0221598f1312cb834d9b1561856375ee7e8129db87dc8c3f879e7c5d238a5fddf58c325ae2b06232930f31b41a6122dfcf7335ad3fa8f777a03425af2d9ad092d0183782ac99c8b7315cd7adfa254c7f567da1975c3c5e03334d91fb4501e37c7c281a550dd3ae77fae6047fa68589f21125658fcccdcdf367ad38f667f55cf1cd0d3e3708aef74422e3222c363e550d7a5b7dc555ab333b5a161c7a62ee1a5e14cb149f68142385da834c83e92c626da3e63def4c5a3ab86de5cad8ce3dc682bfcb9debe282068472865b93689366bf34e256c377ceba476eca9171cc33300a2577a182b31a235106fb9afa5e197a6d17bbf18481a40e52f55d1cb3330afef7d488676cb367cd012f5255263fb758ca36068368b440fa26926a2d599bf649edabc117be30c68161186093c4e529cb2b198e5ac2bbe3ebeed92448ee88d7cd6d2282c5c7becaade8fd18d792e886dcf32a0919458a0ca2a9413d2774dee0f3ceadf046458f7beb7d7cb47ffbebf26220336ea98b9fe87eecb675ef74eafe1d4eb5eeb6941bac2f5521cf2d257e5e180f466ae47f6357e9028e21047fa17d0b2fc9f25c82edf8dbd32c7a336be0c0ba58c449c73c6bd3b311b144a7496c1771e3a9879e8223225e0a34efd45278997740269a83572cb0cf7d473abb9fcf03510f0e9678ba57e9fde7f3347ed876b81a6c42bba82b2f559acfb4a8a9d3038011e071912d9e803f5e10dae78618a30074d863659fc1e2850ba7c23b0c2069f6e0c89deae039bbdb325cbd83e033c6acf19a54d6bcc1a50b57db65c655bb38c24deee6db04c861c8d2bfd068360239644125d50c1cd0a2fefcf9146f147e83f161e4f43088cc8ffd5fb1aea8f1d4d75218682e8e3c006d401cf9b1b35c4355bfc24587de211fb0493fd992e46e62c3694859b1cd3542d739c32ea332869dcbaeb9124b3218fbb985272426c045c3da4ad02f79b705140c74f565821123ac8c13749dc746d82289437fdb8cc2c53b5d8886cd2c515cbd0d963473dee950ea1714cfab9b7003032a1a6ead87878dc9a4a82ca3f546b8583eea1139013e4531a093294001831361fe3df646a64560b0c2aabb86fb24c3eeb40f9d5bd215792a543f017e9d4b0a04204ca1d49d7e09360c9d6c03604991f72256d6c4c24e30d0a2c320bdc032d5fca12ad0836018b0b61413bd2b4b3ba41683f3de816570ef5923f090581e4d68a43a85d381781186c59eab4f5b9d35e725d482da201d5c54f512ad7e3096e9bc046a724cf6f4f4cd344ac20ed92dad91688cce63c65866f4c11c25c077464a9573c4420bb085566dce7aad2c2660771494f40a158e515f63c84a6e7050336feef2e24ee2d9e4254bd6968b2c0bdd44531a503e7f8554615ea4c11e4c5b158ef32d86abba204d808ce12f726cc72b7cd25532acb249eaacab3993ddb31c1b93ad174f83dadb4af5db41d74b97c4d0289834c5087de42dbaa681c53335f1fbd16029d852db0334854cf27a5da3a348d39de47d8ac66b933792e483a4f99a147e299771f332a674c1e3ee09dfa33f4b67520bc9b4946d76f2475635158dfb9ce60692a174f1b74a092e4897598d0f31139612e7d96babb6a6c084feb716a9f7aa148eabc8cd18a47d4b480541d225c08a8b1a19b555da43f6dd988b76774784e13805f5a04030d7d4e7bd343e95c37ae700880922381e7327fa4b3f7b7eae8c36b3657d5ad24453e866b280e76c3a50a1b87e6abae0dd2e9c9e4a5571e3ae21b3f96fe7113f82b0e1bd4ba7a86fd6a624a99d99ee2f58c85ffac927b0444d0ea3cd2244b2e6a40bc3af33969476b8b87f9b9c529b6d9adbca92b81cca98ced7aa34cb6dfde0ac4f7da7c0cc4606cdea6aa2665779e1e0bb44c60879ea52b107ccaade5778034cef0550a27d4f67b3a91c8e793a074023141f24bc857f8c9a173323c9ce0c86bfcb21e3999851b42a521c1a18292ca1ffbc65dfe8bc11f6e5e7a4a6986cfbcdf60118fcc74a575de3d1caede8835cb59f50997d2d859e28556a4268c165043b0d14bcbeda3957ae1166c2a5c3fd134b43e671a54ac8ced5493dd8bbd435a4a94a6ce392a0f73552b401010a53999c4b2f3e3f3936f99c8a048dd740efe1150457acd4bd0c61630415f1e8b8a4802ff729999f1e7a0440a794be59195ea49f8b3d106bed8875b03fc6ed367b11d1bd735aa471133f4f656e5d2a334b7fc9803816ef3a8496b0bf5da852ad491d24b62bfefb50feb71aca0993fad62e6dfd9495f09583404a5775645a517119d02412a70e0580fa87af7f3f90c380a0373628b0bfafb0b37963dfeffddfe5385e5495fa3e70ab1619a460d508d9d7ed81cfdaf8b5e59a6be9d2c8df77f2d247da72d64a534561ca92e37b3b0c1c0ef60e7b142462c625f2071c0694fb3e021de6e12f2a3e6a1c246aa65a17f98ab10c53c1790aef64a8ee06ede6f66f444f913a13eae6a7bfcb7737652cc4461acf7d1d366b45fbf6e0eeee1655eedf1cc688fcf9f22d6e63f2628bb3e94770e88f5c226e4fbe380ca81c789c7a46fcf63a566181348857fc28c50b09bb54a1303551988af121c1fb17d843d33ee50734ca6c0f6020b3a345e780e237f16012bef5ad70b3edfc4500667dfef88178872aa6ac0544212a5df0f2cd638992602dc98ae91673e9d33f3e3eca647be4a3276848a10823b90c76a57e9df03a4eb81609e7a8fcc7a506ea349e7f8359bd3f8f206b8a40899cea3b4614053d878a4abfe5a1165ce51973391051426db5d957ad1b138eda20fec0c56dcffa6936811ad189eacf9fd359ab1fecb993acda81695ae2b49c2425754418a18e0ef7e3ed85e252010a50d410440fce7a17aa55e8b84f344fae552c1ed11542bb0b7a89f8fc78ba5207f989f72a5ad34070cb4e648fd3f95dde1d003e7a9086ce1ac9e35b25acfd8a315af066ed779f9934b68d44f68a7a00beb862fe94ddf506793a587d58cd1c51ce85670f987b147b7bec2c67b9ee94751c376514cf662521f81d3a3d9c0fedc0984a57e2b4c39958d02cfcb1d212197bfe5e43f99a3f04b4c04c5fea707dfa718e4f7e4d6c3a92a96ee8644d256225e214d09078a46571a0979f4982c99b34374085bab3db52e8a57cc365f42be5ac9da21d7552b2dcb667a60ac353fb22223290c11759db3f3fcb44fa38dfa307981b42ba32b88373897868e9abd75f7ba2fc5319d196bc7b95130d2b31117e7d3a5eed32b7874c0a52c4b96d5f5fdcbc1da69ef5bde720c64499424bab8b36a11ed27a480350a0168a8d59012056c6c9b1f422d324d30b757a0972fb455bde343a5a26695497f71396d6142f66efce601bbd6a3df5de7259c1e92e40eaa79964be8965a735be2c0fe6a61513e4700b5ed44b8b8fb037a8926be3fddf60ea735a3f6866996d246d48d17ad7601cdd98623dfcdea6cf1d1f8f09b14ae7e62d5a22f976629098d857370ce05bb9fd72ee72d8ad64d881dc3d5921eef3baf15f0b678dbe13f75803c2c05e77e3fe693e9c0f9dcb8c53350d599d0fa81498da0b] */
};


