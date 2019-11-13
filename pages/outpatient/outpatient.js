// pages/outpatient/outpatient.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    line_econe:{
      onInit:initLine
    },
    bar_econe:{
      onInit: initBar
    }
  },
})

function initLine(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '今日门急诊人次',
    },
    color: ['yellow', '#4472C5'],
    legend: {
      data: ['门诊量', '急诊量'],
      icon: "roundRect",
      x:"250rpx"
    },
    xAxis: {
      name: "时间",
      boundaryGap: false,
      type: 'category',
      data: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '18h'],
      nameTextStyle: {
        fontSize: 10,
      }
    },
    yAxis: {
      name: "挂号量(人次)",
      type: 'value',
      nameTextStyle: {
        fontSize: 10
      }
    },
    series: [{
      name: '门诊量',
      data: [0, 9, 121, 105, 101, 27, 6, 20, 84, 26],
      type: 'line',
      itemStyle: { normal: { label: { show: true } } }
    },
    {
      name: '急诊量',
      data: [0, 2, 21, 135, 121, 58, 60, 120, 4, 2],
      type: 'line',
      itemStyle: { normal: { label: { show: true } } }
    }]
  }
  chart.setOption(option);
  return chart;
}
function initBar(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '今日门急诊人次',
    },
    color: ['#4472C5', 'yellow'],
    xAxis: {
      name: "科室",
      boundaryGap: false,
      type: 'category',
      data: ['小儿科', '心脏内科', '呼吸内科', '耳鼻喉科', '骨科', '妇科', '皮肤科', '肝科', '口腔科'],
      nameTextStyle: {
        fontSize: 10,
      },
      axisLabel: {
        interval: 0,
        // formatter: function (value) {
        //   return value.split("").join("\n");
        // }
        rotate: -40
      }
    },
    yAxis: {
      name: "挂号量(人次)",
      type: 'value',
      nameTextStyle: {
        fontSize: 10
      }
    },
    series: [
      {
        data: [0, 2, 21, 135, 121, 58, 60, 120, 4, 2,3,40,45,39],
        type: 'bar',
      },
      {
        data: [0, 2, 21, 135, 121, 58, 60, 120, 4, 2, 3, 40, 45, 39],
        type: 'line',
        itemStyle: { normal: { label: { show: true } } }
      }]
  }
  chart.setOption(option);
  return chart;
}