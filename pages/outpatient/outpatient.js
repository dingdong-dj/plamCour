// pages/outpatient/outpatient.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
var util = require('../../utils/util.js');
var Parser = require('../../lib/dom-parser.js');
var dataList = [];
var lineList = [];


Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar_econe:{
      lazyLoad: true // 延迟加载
    },
    line_econe:{
      lazyLoad: true // 延迟加载
    },
    bar_econ_one:{
      lazyLoad: true // 延迟加载
    },
    role:null,
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var role = app.globalData.role;
    this.setData({
      role: role
    })
    if(role == 1){
      this.echartsComponnet = this.selectComponent('#bar-cancas');
      this.getData(); //获取数据

      this.echartsComponnet1 = this.selectComponent('#line-cancas');
      this.getDateLine();
    }else if(role ==2){
      this.echartsComponnet = this.selectComponent('#bar-cancas-one');
      this.getDataOne(); //获取数据
      this.getDoctorData();
    }
   
  },
  getDataOne:function(){
    var code = app.globalData.deptCode;
    var url = app.globalData.url;
    var nowTime = new Date();
    nowTime.setTime(nowTime.getTime() - 24 * 60 * 60 * 1000);
    var time = nowTime.getFullYear() + "" + (nowTime.getMonth() + 1) + "" + nowTime.getDate();
    var htmlBody = util.bodyHtml("Director_DoctorMzVisit", '{"date":"' + time + '","dept_code":"' + code + '"}');
    var that = this;
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: htmlBody,
      method: 'POST',
      header: {
        'content-type': 'text/xml; charset=utf-8',
      },
      success: (res) => {
        var list = xmlToJson(res.data);
        var name = [];
        var value = [];
        for (var index in list) {
          name.push(list[index].doctorname);
          value.push(list[index].cnt == null ? 0 : list[index].cnt);
        }
        var barList = { name: name, value: value };
        dataList = barList;
        that.init_echarts_one();//初始化图表
      }
    });
  },
  getDoctorData:function(){
    var that = this;
    var code = app.globalData.deptCode;
    var url = app.globalData.url;
    var nowTime = new Date();
    var month = nowTime.getMonth();
    var time;
    if (month == 0) {
      time = nowTime.getFullYear() - 1 + "" + "12";
    } else {
      time = nowTime.getFullYear() + "" + month;
    }
    var htmlBody = util.bodyHtml("Director_DoctorDataList", '{"date":"'+time+'","dept_code":"'+code+'"}');
    console.log(htmlBody);
    wx.request({
      url: url,
      data: htmlBody,
      method: 'POST',
      header: {
        'content-type': 'text/xml; charset=utf-8',
      },
      success: (res) => {
        var list = xmlToJson(res.data);
        that.setData({
          listData: list
        });
      },

    })
  },

  getDateLine:function(){
    var url = app.globalData.url;
    var nowTime = new Date();
    nowTime.setTime(nowTime.getTime() - 24 * 60 * 60 * 1000);
    var time = nowTime.getFullYear() + "" + (nowTime.getMonth() + 1) + "" + nowTime.getDate();
    var htmlBody = util.bodyHtml("Leader_MzVisitByHour", '{"date":' + time + '}');
    var that = this;
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: htmlBody,
      method: 'POST',
      header: {
        'content-type': 'text/xml; charset=utf-8',
      },
      success: (res) => {
        var list = xmlToJson(res.data);
        var mz =[];
        var jz =[];
      
        for(var index in list){
          if(list[index].windows_no == 9){
            jz.push(list[index].cnt);
          }else{
            mz.push(list[index].cnt);
          }
        }
        var qian = ["0","0","0","0","0","0"];
        var hou = ["0","0","0","0"];
        qian = qian.concat(mz);
        qian = qian.concat(hou);
        lineList = {mz:qian,jz:jz}
        that.init_Line();//初始化图表
      }
    });
  },

  //初始化图表
  init_Line: function () {
    this.echartsComponnet1.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getLineOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },

  getLineOption: function () {
    var option = {
      title: {
        text: '昨日门急诊人次(时间)',
      },
      color: ['#95c3ee', '#004387'],
      legend: {
        data: ['门诊量', '急诊量'],
        icon: "roundRect",
        x: "250rpx"
      },
      xAxis: {
        name: "时间",
        boundaryGap: false,
        type: 'category',
        data: ['0h', '1h', '2h', '3h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '18h', '19h', '20h', '21h', '22h', '23h'],
        nameTextStyle: {
          fontSize: 10,
        }
      },
      yAxis: {
        name: "挂号量(人次)",
        type: 'value',
        nameTextStyle: {
          fontSize: 10
        },
  
      },
      dataZoom: [
        {
          show: true,
          type: 'inside',
          start: 0, //数据窗口范围的起始百分比,表示30% 
          end: 60, //数据窗口范围的结束百分比,表示70% 
        }
      ],
      series: [{
        name: '门诊量',
        data:lineList.mz,
        type: 'line',
        itemStyle: { normal: { label: { show: true } } }
      },
      {
        name: '急诊量',
        data:lineList.jz,
        type: 'line',
        itemStyle: { normal: { label: { show: true } } }
      }]
    }
    return option;
  },

  getData: function () {
    var url = app.globalData.url;
    var nowTime = new Date();
    nowTime.setTime(nowTime.getTime() - 24 * 60 * 60 * 1000);
    var time = nowTime.getFullYear() + "" + (nowTime.getMonth() + 1) + "" + nowTime.getDate();
    var htmlBody = util.bodyHtml("Leader_MzVisitByDept", '{"date":' + time + '}');
    var that = this;
  	/**
  	 * 此处的操作：
  	 * 获取数据json
  	 */
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: htmlBody,
      method: 'POST',
      header: {
        'content-type': 'text/xml; charset=utf-8',
      },
      success: (res) => {
      var list = xmlToJson(res.data);
      var name =[];
      var value = [];
      for (var index in list){
        name.push(list[index].dept_name);
        value.push(list[index].mzcnt);
      }
      var barList = {name:name,value:value};
        dataList = barList;
        that.init_echarts();//初始化图表
      }
    });
  },
  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },

  init_echarts_one: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOptionOne());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getOption: function () {
    console.log(dataList);
    var option = {
      title: {
        text: '昨日门诊人次(科室)',
      },
      // color: ['#4472C5', '#95c3ee'],
      color: ['#95c3ee', '#4472C5'],
      xAxis: {
        name: "科室",
        boundaryGap: false,
        type: 'category',
        data: dataList.name,
        nameTextStyle: {
          fontSize: 8,
        },
        axisLabel: {
          interval: 0,
          //rotate: -40,
          formatter: function (value) {
            var result = "";//拼接加\n返回的类目项
            var maxLength = 3;//每项显示文字个数
            var valLength = value.length;//X轴类目项的文字个数
            var rowNumber = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            if (rowNumber > 1)//如果文字大于3,
            {
              for (var i = 0; i < rowNumber; i++) {
                var temp = "";//每次截取的字符串
                var start = i * maxLength;//开始截取的位置
                var end = start + maxLength;//结束截取的位置
                temp = value.substring(start, end) + "\n";
                result += temp; //拼接生成最终的字符串
              }
              return result;
            }
            else {
              return value;
            }
          }
        }
      },
      yAxis: {
        name: "挂号量(人次)",
        type: 'value',
        nameTextStyle: {
          fontSize: 10
        },
         max:600
      },
      dataZoom: [
        {
          show: true,
          type: 'inside',
          start: 0, //数据窗口范围的起始百分比,表示30% 
          end: 8, //数据窗口范围的结束百分比,表示70% 
        }
      ],
      series: [
        {
          data: dataList.value,
          type: 'bar',
        },
        {
          data: dataList.value,
          type: 'line',
          itemStyle: { normal: { label: { show: true } } }
        }]
    }
    return option;
  },

  getOptionOne: function () {
    var option = {
      title: {
        text: '昨日门诊人次(医生)',
      },
      color: ['#95c3ee', '#4472C5'],
      xAxis: {
        name: "医生",
        boundaryGap: false,
        type: 'category',
        data: dataList.name,
        nameTextStyle: {
          fontSize: 8,
        },
        axisLabel: {
          interval: 0,
          //rotate: -40,
          formatter: function (value) {
            var result = "";//拼接加\n返回的类目项
            var maxLength = 3;//每项显示文字个数
            var valLength = value.length;//X轴类目项的文字个数
            var rowNumber = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            if (rowNumber > 1)//如果文字大于3,
            {
              for (var i = 0; i < rowNumber; i++) {
                var temp = "";//每次截取的字符串
                var start = i * maxLength;//开始截取的位置
                var end = start + maxLength;//结束截取的位置
                temp = value.substring(start, end) + "\n";
                result += temp; //拼接生成最终的字符串
              }
              return result;
            }
            else {
              return value;
            }
          }
        }
      },
      yAxis: {
        name: "就诊人次",
        type: 'value',
        nameTextStyle: {
          fontSize: 10
        },
        max: 60
      },
      dataZoom: [
        {
          show: true,
          type: 'inside',
          start: 0, //数据窗口范围的起始百分比,表示30% 
          end: 52, //数据窗口范围的结束百分比,表示70% 
        }
      ],
      series: [
        {
          data: dataList.value,
          type: 'bar',
        },
        {
          data: dataList.value,
          type: 'line',
          itemStyle: { normal: { label: { show: true } } }
        }]
    }
    return option;
  },
  
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
function getMzVisitByDept(url, param) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: param,
      method: 'POST',
      header: {
        'content-type': 'text/xml; charset=utf-8',
      },
      success: (res) => {
        var list = xmlToJson(res.data);
        resolve(list);
      },
      fail: () => {
        reject("系统异常，请重试！")
      }
    })
  })

}