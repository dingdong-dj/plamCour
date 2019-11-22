// pages/hospitaliztion/hospitaliztion.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '昨日住院及门诊次数统计(按科室分)',
      textStyle: {
        fontSize:15,
      }
    },
    legend: {
      data: ['入院', '出院', '在院'],
      icon: "roundRect",
      x: "300rpx"
    },
    color: ['#33ccff', '#ffff99', '#ff6699'],
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
      data: ['妇产科病区', '眼科病区', '耳鼻喉科病区', '内科综合病区'],
      axisLabel: {
        interval: 0,
        // formatter: function (value) {
        //   return value.split("").join("\n");
        // }
        // rotate: -40
      }
    }],
    yAxis: [{
      name: "住院人次(个)",
      type: 'value'
    }],
    series: [{
      name: '入院',
      type: 'bar',
      barGap: 0,
      data: [7, 23, 8, 5],
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
      data: [1, 9, 3, 6],
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
      data: [21, 30, 41, 32],
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

  chart.setOption(option, true);

  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar_ec:{
      onInit: initChart
    },
    listData: [

      { "group_name": "阮雅文诊疗组", "outcnt": "83", "avgfee": "8566.96", "yprate": "17.60","avgday": "7.30", "jyrate": "10.45" },
      { "group_name": "李宏斌诊疗组", "outcnt": "35", "avgfee": "19902.69", "yprate": "16.21", "avgday": "10.80", "jyrate": "9.82" },
      { "group_name": "朱国庆诊疗组", "outcnt": "61", "avgfee": "19064.81", "yprate": "17.29", "avgday": "8.30", "jyrate": "15.13" }, 
      { "group_name": "吕佐诊疗组", "outcnt": "73", "avgfee": "16395.57", "yprate": "13.48", "avgday": "7.30", "jyrate": "6.27" }, 
      { "group_name": "陈巍诊疗组", "outcnt": "153", "avgfee": "5861.75", "yprate": "22.97", "avgday": "4.90", "jyrate": "4.02" }, 
      { "group_name": "张凯杰诊疗组", "outcnt": "70", "avgfee": "8088.86", "yprate": "46.71", "avgday": "6.70", "jyrate": "14.75" },
      { "group_name": "裘宇芳诊疗组", "outcnt": "82", "avgfee": "11328.72", "yprate": "13.91", "avgday": "7", "jyrate": "19.57" }, 
      { "group_name": "肖桂荣诊疗组", "outcnt": "61", "avgfee": "11231.41", "yprate": "36.76", "avgday": "9.80", "jyrate": "11.68" }, 
      { "group_name": "丁国娟诊疗组", "outcnt": "3", "avgfee": "254630.23", "yprate": "53.63", "avgday": "99.70", "jyrate": "3.45" }, 
      { "group_name": "吕杰青诊疗组", "outcnt": "92", "avgfee": "13766.81", "yprate": "35.74", "avgday": "7.50", "jyrate": "11.09" }, 
      { "group_name": "阮学东诊疗组", "outcnt": "85", "avgfee": "2397.98", "yprate": "19.29", "avgday": "4.60", "jyrate": "22.02" }, 
      { "group_name": "周军庆诊疗组", "outcnt": "21", "avgfee": "37789", "yprate": "22.43", "avgday": "12.40", "jyrate": "9.99" }, 
      { "group_name": "应向荣诊疗组", "outcnt": "92", "avgfee": "12051.35", "yprate": "24.23", "avgday": "6.90", "jyrate": "4.79" }, 
      { "group_name": "李锦泉诊疗组", "outcnt": "36", "avgfee": "28754.22", "yprate": "19", "avgday": "17.10", "jyrate": "10.53" }, 
      { "group_name": "俞学斌诊疗组", "outcnt": "49", "avgfee": "22996.55", "yprate": "15.90", "avgday": "12.90", "jyrate": "20.92" }

    ]
  }

})