//index.js
import * as echarts from '../../ec-canvas/echarts';

//获取应用实例
const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // infoList: [{ title: "在院人数费", number: 179 }, { title: "就诊人数", number: 66 }, { title: "预约挂号", number: 200 }, { title: "预约床位", number: 55 }, { title: "体检人数", number: 55 }, { title: "检查人次", number: 123 }],
    infoList: [{ title: "在科人数", number: 45 }, { title: "门诊就诊", number: 66 }, { title: "入院人次", number: 200 }, { title: "出院人次", number: 55 }],
    // infoList: [{ title: "在科人数", number: 23 }, { title: "昨日就诊", number: 66 }, { title: "昨天收治", number: 23 }, { title: "昨天处方", number: 67 }, { title: "昨日诊察费", number: 1298 }, { title: "昨日检查费", number: 4567 }],
    gaugeList: [{ title: "抗菌使用率", data: 10 }, { title: "基药使用率", data: 25 }, { title: "床位使用率", data: 85 }, { title: "药比", data: 75 }, { title: "平均床日数", data: 60 }, { title: "平均处方金额", data: 65 }],
    gaugeList1: [{ title: "当前床位使用率", data: 82 }, { title: "门诊预约率", data: 78 }],
    pieList:[{title:"昨日住院/门诊收入",name:['住院','门诊','其他'],value:[12,20,3]},{title:'昨日门/急诊人次',name:['门诊','急诊','其他'],value:[20,30,10]}],
    radar_ec: {
      onInit: initChart
    },
    guage_econe_one:{
      onInit: initGuage_one
    },
    guage_econe_two: {
      onInit: initGuage_two
    },
    gauge:{
      onInit:initGauge
    },
    pie: {
      onInit: initPie
    },
    role:1,
  },
  onShareAppMessage: function () {
    return {
      title: "qwee"
    }
  }
})

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
        { name: "出院人数", max: 50 },
        { name: "手术人数", max: 50 },
        { name: "转科人数", max: 50 },
        { name: "入院人数", max: 50 }
      ],
      // splitArea: {
      //   show: true,
      //   areaStyle: {
      //     color: ['rgba(114, 172, 209, 0.6)', 'rgba(114, 172, 209,0.8)'], // 图表背景网格的颜色
      //       shadowColor: 'rgba(0, 0, 0, 0.3)',
      //       shadowBlur: 10
      //   }
      // },
    },
    
    series: [{
      type: 'radar',
      data: [
        {
          value: [19, 6, 1, 43],
          name: "人数",
          label: {
            normal: {
              show: true
            }
          },
          areaStyle: {normal: {color: 'rgba(255,0,0,0.6)'}}//数据区域颜色
        }
      ]
    }]
  }
  chart.setOption(option);
  return chart;
}

//仪表盘图
function initGuage_one(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title:{
      text:'当前床位使用率',
      x:'center',
      y:'bottom',
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
      },
      axisLine: {//仪表盘轴线
        lineStyle: {
          width: 15,
        }
      },
      axisTick: {//小刻度相关
        length: 4,
      },
      splitLine: {//分隔线样式相关
        length: 30,//分割线的长度
        lineStyle: {
          width: 2,
        }
      },
      axisLabel: {
        show: false
      },
      pointer: {//指针长度与宽度
        width: 3,
        length: '85%'
      },
      data: [{
        value: 60,
      }]

    }]
  };
  chart.setOption(option, true);
  return chart;
}

function initGuage_two(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '门诊预约率',
      x: 'center',
      y: 'bottom',
      textStyle: {
        fontSize: 15
      }
    },
    series: [{
      type: 'gauge',
      detail: {
        formatter: '{value}%',
        fontSize: 20,
        offsetCenter: [0, "60%"]
      },
      axisLine: {//仪表盘轴线
        lineStyle: {
          width: 15,
        }
      },
      axisTick: {//小刻度相关
        length: 4,
      },
      splitLine: {//分隔线样式相关
        length: 30,//分割线的长度
        lineStyle: {
          width: 2,
        }
      },
      axisLabel: {
        show: false
      },
      pointer: {//指针长度与宽度
        width: 3,
        length: '85%'
      },
      data: [{
        value: 30,
      }]

    }]
  };
  chart.setOption(option, true);
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
      text: data.title,
      x: 'center',
      y: 'bottom',
      textStyle: {
        fontSize: 15,
        // color:"#eceff8"
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
          // color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
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
        value: data.data,
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
    color: ["#AAA2DA", "#32C5E9", "#AAE0E3"],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '75%',
        data: [
          { value: data.value[0], name: data.name[0] },
          { value: data.value[1], name: data.name[1] },
          { value: data.value[2], name: data.name[2] }
        ],
        label: {            //饼图图形上的文本标签
          normal: {
            show: true,
            position: 'inner', //标签的位置
            textStyle: {
              fontSize: 10   //文字的字体大小
            },
            formatter: "{b}:{c}\n({d}%)"
          }
        },
      }
    ]
  };
  chart.setOption(option);
  return chart;
}
