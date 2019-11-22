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
    console.log(this.data.phone);
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

    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        image:'../../images/faul.png',
        duration: 2000
      })
      // return
      var role = ['我是院领导','我是科主任','我是医师'];
      popSelect(role);
      wx.switchTab({
        url: '../index/index',
      })
    }
    wx.request({
      url: '',
      data:{
        code: this.data.phone,
        name: this.data.password
      },
      method:'POST',
      header: {
        //设置参数内容类型为json
        'content-type': 'application/json'
      },
      success: function (res) {
          
      },
      fail: function (err) {
        wx.showToast({
          title: '网络错误',
          icon: 'loading',
          image: '../../images/faul.png',
          duration: 2000
        })
      },//请求失败
    })

    // } else {
    //   // 这里修改成跳转的页面 
    //   wx.showToast({
    //     title: '登录成功',
    //     icon: 'success',
    //     duration: 2000
    //   })
    // }
  },
  
})

  function popSelect(role){
    wx.showActionSheet({
      itemList: role,
      success: function (res) {
        console.log(role[res.tapIndex]);
      }
    })

  }
  // formSubmit:function(){
  //   // wx.showToast({
  //   //   icon:"none",
  //   //   title: '该用户不存在',
  //   // })
  // }

  