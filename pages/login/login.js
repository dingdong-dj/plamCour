// pages/login/login.js
var Mcaptcha = require('../../utils/mcaptcha.js');


const app = getApp()
Page({
  data: {
    phone: '',
    password: '',
    imgCode:''
  },

  /**
* 生命周期函数--监听页面初次渲染完成
*/
  onReady: function () {
    this.mcaptcha = new Mcaptcha({
      el: 'canvas',
      width: 80,
      height: 35,
      createCodeImg: ""
    });
  },
  //刷新验证码
  onTap() {
    this.mcaptcha.refresh();
  },

  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  //获取输入验证码
  codeImgInput:function(e){
    this.setData({
      imgCode: e.detail.value
    })
  },

  // 登录 
  login: function () {
    //验证验证码
    var res = this.mcaptcha.validate(this.data.imgCode);
    if (this.data.imgCode == '' || this.data.imgCode == null) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'loading',
        image: '../../images/faul.png',
        duration: 2000
      })
      return;
    }
    if (!res) {
      wx.showToast({
        title: '验证码错误',
        icon: 'loading',
        image: '../../images/faul.png',
        duration: 2000
      })
      return;
    }
    console.log(this.data.phone + "   phone");

    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        image:'../../images/faul.png',
        duration: 2000
      })
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      // 这里修改成跳转的页面 
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
    }
  }
})

  // formSubmit:function(){
  //   // wx.showToast({
  //   //   icon:"none",
  //   //   title: '该用户不存在',
  //   // })
   
 
  // }

  