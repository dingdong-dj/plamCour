//index.js
import * as echarts from '../../ec-canvas/echarts';
var util = require('../../utils/util.js');
var Parser = require('../../lib/dom-parser.js');
var randerList = []

//获取用实例
const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // infoList: [{ name: "在院人数", value: 0 }, { name: "就诊人数", value: 0 }, { name: "预约挂号", value: 0 }, { name: "手术台数", value: 0 }],
    radar_ec: {
      lazyLoad: true // 延迟加载
    },
    gauge:{
      onInit: initGauge//公共仪表盘图标
    },
    pie: {
      onInit: initPie//公共饼图
    },
    role:null,
  },
 
  onLoad: function () {
    var role = app.globalData.role;
    this.setData({
      role:role
    })
    var url = app.globalData.url;
    var that = this;
    var nowTime = new Date();
    nowTime.setTime(nowTime.getTime() - 24 * 60 * 60 * 1000);
    var time = nowTime.getFullYear() + "" + (nowTime.getMonth() + 1) + "" + nowTime.getDate();
    if(role == 1){
      var htmlBody = util.bodyHtml("Leader_FirstPage", '{"date":' + time + '}');
      wx.request({
        url: url,
        data: htmlBody,
        method: 'POST',
        header: {
          //设置参数内容类型为json
          'content-type': 'text/xml; charset=utf-8',
          //'SOAPAction': 'http://tempuri.org/Call'
        },
        success: function (res) {
          var pieList = [];
          var data = xmlToJson(res.data);
          for (var index in data) {
            if (data[index].type == "1") {
              console.log(data[index].list);
              that.setData({
                infoList: data[index].list
              })
            } else if (data[index].type == "2") {
              that.setData({
                gaugeList1: data[index].list
              })
            } else if (data[index].type == "3") {
              var name = [];
              var value = [];
              var list = data[index].list;
              for (var i in list) {
                name.push(list[i].name);
                value.push(list[i].value);
              }
              pieList.push({ title: "昨日住院/门诊收入", name: name, value: value });
            } else if (data[index].type == "4") {
              var name = [];
              var value = [];
              var list = data[index].list;
              for (var i in list) {
                name.push(list[i].name);
                value.push(list[i].value);
              }
              pieList.push({ title: "昨日门/急诊人次", name: name, value: value });
            } else if (data[index].type == "5") {
              var list = data[index].list;
              var name = [];
              var value = [];
              for (var i in list) {
                name.push(list[i].name);
                value.push(list[i].value);
              }
              randerList = { name: name.slice(1), value: value.slice(1) };
              that.echartsComponnet = that.selectComponent('#radar-cancas-id');
              that.init_echarts();
            }
          }
          that.setData({
            pieList: pieList
          })
        }
      })
    }else if(role ==2){
      var code = app.globalData.deptCode;
      var htmlBody = util.bodyHtml("Director_FirstPage", '{"date":' + time + ',"dept_code":'+code+'}');
      wx.request({
        url: url,
        data: htmlBody,
        method: 'POST',
        header: {
          //设置参数内容类型为json
          'content-type': 'text/xml; charset=utf-8',
          //'SOAPAction': 'http://tempuri.org/Call'
        },
        success: function (res) {
          var data = xmlToJson(res.data);
          console.log(data);
          for(var index in data){
            if (data[index].type == "1") {
              console.log(data[index]);
              that.setData({
                infoList: data[index].list
              })
            }else if(data[index].type == "2"){
              that.setData({
                gaugeList: data[index].list
              })
            }else if(data[index].type == "3"){
              var list = data[index].list;
              var name = [];
              var value = [];
              for (var i in list) {
                name.push(list[i].name);
                value.push(list[i].value);
              }
              randerList = { name: name.slice(1), value: value.slice(1) };
              that.echartsComponnet = that.selectComponent('#radar-cancas-id');
              that.init_echarts();
            }
          }
        }
      })

    }
    
    
  },

  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      // // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      // return Chart;
    });
  },
  getOption:function(){
    var name = randerList.name;
    var indicator;
    if(this.data.role == 1){
      indicator = [{ name: name[0], max: 300 },{ name: name[1], max: 300 },{ name: name[2], max: 300 },
        { name: name[3], max: 300 }];
    }else {
      indicator = [{ name: name[0], max: 40 }, { name: name[1], max: 40 }, { name: name[2], max: 40 },
        { name: name[3], max: 40 }];
    }
    var option = {
      title: {
        text: "昨日住院人次统计",
        textStyle: {
          fontSize: 15,
        }
      },
      radar: {
        indicator: indicator,
      },

      series: [{
        type: 'radar',
        //symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
        // symbolSize: 3, // 拐点的大小
        data: [
          {
            value: randerList.value,
            name: "人数",
            label: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(60,135,213,1)',
              },
            },
            areaStyle: { normal: { color: 'rgba(24, 144, 255,0.6)' } }//数据区域颜色
          }
        ]
      }]
    }

    return option;
  },

  // onShareAppMessage: function () {
  //   return {
  //     title: "qwee"
  //   }
  // },
  bindViewTap:function(e){
    var nowTime = new Date();
    nowTime.setTime(nowTime.getTime() - 24 * 60 * 60 * 1000);
    var time = nowTime.getFullYear() + "" + (nowTime.getMonth() + 1) + "" + nowTime.getDate();
    var title = e.currentTarget.dataset.title;
    var number = e.currentTarget.dataset.number;
    var code = e.currentTarget.dataset.code;
    if(this.data.role == 1){
      wx.navigateTo({
        url: '../indexDetail/indexDetail?title=' + title + '&time=' + time+'&code='+code
      })
    }
  
  },

})
function initRole() {
  var role = app.globalData.role;
  console.log(role);
  return role;
}

//雷达图
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    title: {
      text: "昨日住院人次统计",
      textStyle: {
        fontSize: 15,
      }
    },
    radar: {
      indicator: [
        { name: "出院人数", max: 300 },
        { name: "手术人数", max: 300 },
        { name: "转科人数", max: 300 },
        { name: "入院人数", max: 300 }
      ],
    },
    
    series: [{
      type: 'radar',
      //symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
      // symbolSize: 3, // 拐点的大小
      data: [
        {
          value: data,
          name: "人数",
          label: {
            normal: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(60,135,213,1)',
            },
          },
          areaStyle: { normal: { color: 'rgba(24, 144, 255,0.6)'}}//数据区域颜色
        }
      ]
    }]
  }
  chart.setOption(option);
  return chart;
}

//公共仪表盘图标
function initGauge(canvas, width, height, data) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  // console.log(data.title+data.data);
  var option = {
    title: {
      text: data.name,
      x: 'center',
      y: 'bottom',
      textStyle: {
        fontSize: 15,
      }
    },
    series: [{
      type: 'gauge',
      detail: {
        formatter: '{value}%',
        fontSize: 20,
        offsetCenter: [0, "60%"],
        // color: "#eceff8"
      },
      axisLine: {//仪表盘轴线
        lineStyle: {
          color: [[0.2, '#95c3ee'], [0.8, '#72abe0'], [1, '#4a8ac5']],
          width: 15,  
          // shadowColor: '#fff', //默认透明
          // shadowBlur: 10
        }
      },
      axisTick: {//小刻度相关
        length: 4,
      },
      splitLine: {//分隔线样式相关
        length: 25,//分割线的长度
        lineStyle: {
          width: 1,
        }
      },
      axisLabel: {
        show: false
      },
      // itemStyle:{//指针样式
      //   normal:{
      //     color:"#eceff8"
      //   }
      // },
      pointer: {//指针长度与宽度
        width: 3,
        length: '90%',
      },
      data: [{
        value: data.value,
      }]

    }]
  };
  chart.setOption(option, true);
  return chart;
}

//公共饼图
function initPie(canvas, width, height,data) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    title: {
      text: data.title,
      x: 'center',
      y: 'bottom',
      textStyle: {
        fontSize: 15
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: "{d}%",
    },
    color: ["#4a8ac5","#95c3ee"],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '75%',
        data: [
          { value: data.value[0], name: data.name[0] },
          { value: data.value[1], name: data.name[1] }
        ],
        label: {            //饼图图形上的文本标签
          normal: {
            show: true,
            position: 'inner', //标签的位置
            textStyle: {
              fontSize: 10   //文字的字体大小
            },
            formatter: "{b}\n{c}\n({d}%)"
          }
        },
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

//组参
function bodyHtml(type,param){
  var htmlBody = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:Call><tem:type>';
  htmlBody  += type+'</tem:type><tem:parms>';
  htmlBody += param;
  htmlBody += '</tem:parms></tem:Call></soapenv:Body></soapenv:Envelope>';
  return htmlBody;
}
//xml转json
function xmlToJson(xml){
  var dataxml = xml;
  var XMLParser = new Parser.DOMParser();
  var doc = XMLParser.parseFromString(dataxml);
  var a = doc.getElementsByTagName('CallResult')['0'];
  var b = a.firstChild.nodeValue;
  return JSON.parse(b);
}


function getPie(url,param,title) {
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