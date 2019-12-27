//app.js
App({
  // onLaunch: function () {
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //       var appid = this.globalData.appId;
  //       var secret =this.globalData.appSecret;
  //       var that = this;
  //      // console.log(res);
  //       if(res.code){
  //         //获取openId
  //         wx.request({
  //           url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + res.code,
  //           header: { 'content-type': 'application/json' },
  //           success:function(res){
  //             console.log(res);
  //             console.log(res.data.openid);	// openid
  //             that.globalData.openId = res.data.openid;
  //           }
  //         })
  //       }
  //     }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  globalData:{
    userInfo: null,
    alldata: null,
    appId:"wxe4d5b54a789a19ba",
    appSecret:"45c75145584a48255603b1fc9e0b5faa",
    openId:"",
    url: 'http://199.199.4.54:8025/wxCall.asmx?WSDL',
    role:1,
    deptCode: "10000001"
  }
})