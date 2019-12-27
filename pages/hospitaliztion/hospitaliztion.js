// pages/hospitaliztion/hospitaliztion.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
var util = require('../../utils/util.js');
var Parser = require('../../lib/dom-parser.js');
var dataList = [];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bar_ec:{
      lazyLoad: true // 延迟加载
    },
    // listData: [
    //   { "group_name": "网络错误", "outcnt": "0", "avgfee": "0", "yprate": "0","avgday": "0", "jyrate": "0" }
    // ]
    role:null,
  },
  onLoad:function(){
    var role = app.globalData.role;
    this.setData({
      role: role
    })
    this.echartsComponnet = this.selectComponent('#bar-canca');
    this.getData(); //获取数据
    this.getZlzData();
  },

  getZlzData:function(){
    var code = app.globalData.deptCode;
    var url = app.globalData.url;
    var that = this;
    var htmlBody;
    if(this.data.role == 1){
      htmlBody = util.bodyHtml("Leader_GroupZyData", "");
    }else{
      var nowTime = new Date();
      var month = nowTime.getMonth();
      var time;
      if(month == 0){
        time = nowTime.getFullYear()-1 +""+"12";
      }else{
        time = nowTime.getFullYear()+""+month;
      }
      htmlBody = util.bodyHtml("Director_GroupZyData", '{"date":"'+time+'","dept_code":"'+code+'"}');
    }
    wx.request({
      url: url,
      data:htmlBody,
      method: 'POST',
      header: {
        'content-type': 'text/xml; charset=utf-8',
      },
      success: (res) => {
        var list = xmlToJson(res.data);
        that.setData({
          listData:list
        });
      },
      
    })
  },
  getData: function () {
    var url = app.globalData.url;
    var nowTime = new Date();
    nowTime.setTime(nowTime.getTime() - 24 * 60 * 60 * 1000);
    var time = nowTime.getFullYear() + "" + (nowTime.getMonth() + 1) + "" + nowTime.getDate();  
    var that = this;
    if(this.data.role == 1){
      var htmlBody = util.bodyHtml("Leader_DeptZyData", '{"date":' + time + '}');
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
          var name = [];
          var incnt = [];
          var outcnt = [];
          var nowcnt = [];
          for (var index in list) {
            name.push(list[index].deptname.trim());
            incnt.push(list[index].incnt == null ? "0" : list[index].incnt);
            outcnt.push(list[index].outcnt == null ? "0" : list[index].outcnt);
            nowcnt.push(list[index].nowcnt == null ? "0" : list[index].nowcnt);
          }
          var barList = { name: name, incnt: incnt, outcnt: outcnt, nowcnt: nowcnt };
          dataList = barList;
          that.init_echarts();//初始化图表
        }
      });
    } else if (this.data.role == 2){
      var code = app.globalData.deptCode;
      var htmlBody = util.bodyHtml("Director_GroupZyChartData", '{"date":"' + time + '","dept_code":"' + code + '"}');
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
          var name = [];
          var incnt = [];
          var outcnt = [];
          var nowcnt = [];
          for(var index in list){
            name.push(list[index].groupname.trim());
            incnt.push(list[index].incnt == null ? "0" : list[index].incnt);
            outcnt.push(list[index].outcnt == null ? "0" : list[index].outcnt);
            nowcnt.push(list[index].nowcnt == null ? "0" : list[index].nowcnt);
          }
          var barList = { name: name, incnt: incnt, outcnt: outcnt, nowcnt: nowcnt };
          dataList = barList;
          that.init_echarts1();//初始化图表
        }
      });
    }

  	
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
  getOption: function () {
    var option = {
      title: {
        text: '昨日住院情况统计(按科室分)',
        textStyle: {
          fontSize: 15,
        }
      },
      legend: {
        data: ['入院', '出院', '在院'],
        icon: "roundRect",
        x: "300rpx"
      },
      color: ['#95c3ee', '#6ca2d4', '#4a8ac5'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      calculable: true,
      xAxis: [{
        name: "病区",
        type: 'category',
        axisTick: { show: false },
        data:dataList.name,
        axisLabel: {
          interval: 0,
          // rotate: -20,
          formatter: function (value) {
            var result = "";//拼接加\n返回的类目项
            var maxLength = 4;//每项显示文字个数
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
      }],
      yAxis: [{
        name: "住院人次(个)",
        type: 'value'
      }],
      dataZoom: [
        {
          show: true,
          type: 'inside',
          start: 0, //数据窗口范围的起始百分比,表示30% 
          end: 10, //数据窗口范围的结束百分比,表示70% 
        }
      ],
      series: [{
        name: '入院',
        type: 'bar',
        barGap: 0,
        data: dataList.incnt,
        barWidth: 15,
        itemStyle: {
          normal: {
            label: {
              show: true,		//开启显示
              position: 'top',	//在上方显示
              textStyle: {	    //数值样式
                color: 'black',
                fontSize: 12
              }
            }
          }
        }
      },
      {
        name: '出院',
        type: 'bar',
        data: dataList.outcnt,
        barWidth: 15,
        itemStyle: {
          normal: {
            label: {
              show: true,		//开启显示
              position: 'top',	//在上方显示
              textStyle: {	    //数值样式
                color: 'black',
                fontSize: 12
              }
            }
          }
        }
      },
      {
        name: '在院',
        type: 'bar',
        data: dataList.nowcnt,
        barWidth: 15,
        itemStyle: {
          normal: {
            label: {
              show: true,		//开启显示
              position: 'top',	//在上方显示
              textStyle: {	    //数值样式
                color: 'black',
                fontSize: 12
              }
            }
          }
        }
      },]

    };
    return option;
  },

  init_echarts1: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption1());
      return Chart;
    });
  },
  getOption1: function () {
    var option = {
      title: {
        text: '昨日住院情况统计(按诊疗组分)',
        textStyle: {
          fontSize: 15,
        }
      },
      legend: {
        data: ['入院', '出院', '在院'],
        icon: "roundRect",
        x: "300rpx"
      },
      color: ['#95c3ee', '#6ca2d4', '#4a8ac5'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      calculable: true,
      xAxis: [{
        name: "病区",
        type: 'category',
        axisTick: { show: false },
        data: dataList.name,
        axisLabel: {
          interval: 0,
          // rotate: -20,
          formatter: function (value) {
            var result = "";//拼接加\n返回的类目项
            var maxLength = 4;//每项显示文字个数
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
      }],
      yAxis: [{
        name: "住院人次(个)",
        type: 'value'
      }],
      dataZoom: [
        {
          show: true,
          type: 'inside',
          start: 0, //数据窗口范围的起始百分比,表示30% 
          end: 40, //数据窗口范围的结束百分比,表示70% 
        }
      ],
      series: [{
        name: '入院',
        type: 'bar',
        barGap: 0,
        data: dataList.incnt,
        barWidth: 15,
        itemStyle: {
          normal: {
            label: {
              show: true,		//开启显示
              position: 'top',	//在上方显示
              textStyle: {	    //数值样式
                color: 'black',
                fontSize: 12
              }
            }
          }
        }
      },
      {
        name: '出院',
        type: 'bar',
        data: dataList.outcnt,
        barWidth: 15,
        itemStyle: {
          normal: {
            label: {
              show: true,		//开启显示
              position: 'top',	//在上方显示
              textStyle: {	    //数值样式
                color: 'black',
                fontSize: 12
              }
            }
          }
        }
      },
      {
        name: '在院',
        type: 'bar',
        data: dataList.nowcnt,
        barWidth: 15,
        itemStyle: {
          normal: {
            label: {
              show: true,		//开启显示
              position: 'top',	//在上方显示
              textStyle: {	    //数值样式
                color: 'black',
                fontSize: 12
              }
            }
          }
        }
      },]

    };
    return option;
  },


})

function DeptZyData(url, param) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: param,
      method: 'POST',
      header: {
        'content-type': 'text/xml; charset=utf-8',
      },
      success: (res) => {
        var pieList = xmlToJson(res.data);
        console.log(pieList);
        resolve(pieList);
      },
      fail: () => {
        reject("系统异常，请重试！")
      }
    })
  })

}

//xml转json
function xmlToJson(xml) {
  var dataxml = xml;
  var XMLParser = new Parser.DOMParser();
  var doc = XMLParser.parseFromString(dataxml);
  var a = doc.getElementsByTagName('CallResult')['0'];
  var b = a.firstChild.nodeValue;
  return JSON.parse(b);
}