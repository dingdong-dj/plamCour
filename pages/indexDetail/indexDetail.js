// pages/indexDetail/indexDetail.js
var util = require('../../utils/util.js');
var Parser = require('../../lib/dom-parser.js');

const app = getApp();     
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    // listData: [{ name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" }, { name: "1科", value: "1234" },{ name: "1科", value: "1234" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      type: options.title,
    });
    var url = app.globalData.url;
    var time = options.time;
    var code = options.code;
    this.setData({
      code:code
    })
    var htmlBody = util.bodyHtml("PointData_Dept", '{"pnt_code":"' + code + '","cmonth":'+time+'}') 
    wx.request({
      url: url,
      data: htmlBody,
      method: 'POST',
      header: {
        'content-type': 'text/xml; charset=utf-8',
      },
      success: function (res) {
        var data = xmlToJson(res.data);
        that.setData({
          listData:data
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


//xml转json
function xmlToJson(xml) {
  var dataxml = xml;
  var XMLParser = new Parser.DOMParser();
  var doc = XMLParser.parseFromString(dataxml);
  var a = doc.getElementsByTagName('CallResult')['0'];
  var b = a.firstChild.nodeValue;
  return JSON.parse(b);
}