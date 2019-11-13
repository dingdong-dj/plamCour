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

      { "code": "01", "text": "6", "type": "20" },

      { "code": "02", "text": "7", "type": "25" },

      { "code": "03", "text": "8", "type": "13" },

      { "code": "04", "text": "9", "type": "14" },

      { "code": "05", "text": "3", "type": "16" },

      { "code": "06", "text": "2", "type": "17" },

      { "code": "07", "text": "1", "type": "19" }

    ]
  }

})