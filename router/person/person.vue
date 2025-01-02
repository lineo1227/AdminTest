<template>
	<view class="container">

		<qiun-data-charts type="word" :opts="lineOpts" :chartData="lineData" />
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	// 折线图配置
	const lineOpts = ref({
		color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
		padding: undefined,
		enableScroll: false,
		extra: {
			word: {
				type: "normal",
				autoColors: true
			}
		}
	})
	const lineData = ref({
		series: [{
				name: "跨全端图表",
				textSize: 25,
				data: undefined
			},
			{
				name: "微信小程序",
				textSize: 20,
				data: undefined
			},
			{
				name: "支付宝小程序",
				textSize: 20,
				data: undefined
			},
			{
				name: "百度小程序",
				textSize: 20,
				data: undefined
			},
			{
				name: "QQ小程序",
				textSize: 20,
				data: undefined
			},
			{
				name: "头条小程序",
				textSize: 20,
				data: undefined
			},
			{
				name: "抖音小程序",
				textSize: 20,
				data: undefined
			},
			{
				name: "360小程序",
				textSize: 20,
				data: undefined
			},
			{
				name: "跨全端",
				textSize: 10,
				data: undefined
			},
			{
				name: "跨全端",
				textSize: 12,
				data: undefined
			},
			{
				name: "跨全端",
				textSize: 10,
				data: undefined
			},
			{
				name: "跨全端",
				textSize: 12,
				data: undefined
			},
			{
				name: "跨全端",
				textSize: 10,
				data: undefined
			},
			{
				name: "跨全端",
				textSize: 12,
				data: undefined
			},
			{
				name: "跨全端",
				textSize: 10,
				data: undefined
			},
			{
				name: "跨全端",
				textSize: 12,
				data: undefined
			}
		]
	})

	// 柱状图配置
	const columnOpts = ref({
		title: {
			text: '柱状图示例'
		},
		tooltip: {
			show: true
		}
	})
	const columnData = ref({
		categories: ['A', 'B', 'C', 'D', 'E', 'F'],
		series: [{
			name: '数量',
			data: [35, 45, 25, 37, 35, 40]
		}]
	})

	// 饼图配置
	const pieOpts = ref({
		title: {
			text: '饼图示例'
		},
		tooltip: {
			show: true
		}
	})
	const pieData = ref({
		series: [{
			data: [{
					name: '项目1',
					value: 30
				},
				{
					name: '项目2',
					value: 25
				},
				{
					name: '项目3',
					value: 45
				}
			]
		}]
	})

	// 雷达图配置
	const radarOpts = ref({
		title: {
			text: '雷达图示例'
		},
		tooltip: {
			show: true
		}
	})
	const radarData = ref({
		categories: ['维度1', '维度2', '维度3', '维度4', '维度5'],
		series: [{
			name: '指标',
			data: [90, 80, 85, 95, 70]
		}]
	})

	// 面积图配置
	const areaOpts = ref({
		color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
		padding: [15, 15, 0, 5],
		enableScroll: false,
		legend: {},
		xAxis: {
			disableGrid: true
		},
		yAxis: {
			data: [{
				min: 0
			}]
		},
		extra: {
			mount: {
				type: "bar",
				widthRatio: 0.3,
				borderWidth: 0,
				barBorderRadius: [
					50,
					50,
					50,
					50
				],
				linearType: "custom"
			}
		}
	})
	const areaData = ref({
		series: [{
			data: [{
				"name": "一班",
				"value": 82
			}, {
				"name": "二班",
				"value": 63
			}, {
				"name": "三班",
				"value": 86
			}, {
				"name": "四班",
				"value": 65
			}, {
				"name": "五班",
				"value": 79
			}]
		}]
	})

	// 散点图配置
	const scatterOpts = ref({
		title: {
			text: '散点图示例'
		},
		tooltip: {
			show: true
		}
	})
	const scatterData = ref({
		series: [{
			name: '散点',
			data: [
				[10, 8.04],
				[8, 6.95],
				[13, 7.58],
				[9, 8.81],
				[11, 8.33]
			]
		}]
	})
</script>

<style>
	.container {
		padding: 15px;
		min-height: 50%;
		background: calc(--primary);
	}
</style>