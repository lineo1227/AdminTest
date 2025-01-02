<template>
	<view class="container">
		<view class="charts-grid">
			<!-- 折线图 -->
			<view class="chart-item">
				<qiun-data-charts type="area" :opts="lineOpts" :chartData="lineData" />
			</view>

			<!-- 柱状图 -->
			<view class="chart-item">
				<qiun-data-charts type="column" :opts="columnOpts" :chartData="columnData" />
			</view>

			<!-- 饼图 -->
			<view class="chart-item">
				<qiun-data-charts type="pie" :opts="pieOpts" :chartData="pieData" />
			</view>

			<!-- 雷达图 -->
			<view class="chart-item">
				<qiun-data-charts type="radar" :opts="radarOpts" :chartData="radarData" />
			</view>

			<!-- 面积图 -->
			<view class="chart-item">
				<qiun-data-charts type="mount" :opts="areaOpts" :chartData="areaData" />
			</view>

			<!-- 散点图 -->
			<view class="chart-item">
				<qiun-data-charts type="scatter" :opts="scatterOpts" :chartData="scatterData" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	// 折线图配置
	const lineOpts = ref({
		color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
		padding: [15, 15, 0, 15],
		enableScroll: false,
		legend: {},
		xAxis: {
			disableGrid: true
		},
		yAxis: {
			gridType: "dash",
			dashLength: 2
		},
		extra: {
			area: {
				type: "curve",
				opacity: 0.2,
				addLine: true,
				width: 2,
				gradient: true,
				activeType: "hollow"
			}
		}
	})
	const lineData = ref({
		categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
		series: [{
				name: "成交量A",
				data: [35, 8, 25, 37, 4, 20]
			},
			{
				name: "成交量B",
				data: [70, 40, 65, 100, 44, 68]
			},
			{
				name: "成交量C",
				data: [100, 80, 95, 150, 112, 132]
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
	}

	.title {
		fonst-size: 20px;
		font-weight: bold;
		margin-bottom: 15px;
	}

	.charts-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
	}

	.chart-item {
		width: calc(33.33% - 10px);
		min-width: 300px;
		height: 300px;
		background: calc(--primary);
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	/* 响应式布局 */
	@media screen and (max-width: 992px) {
		.chart-item {
			width: calc(50% - 10px);
		}
	}

	@media screen and (max-width: 768px) {
		.chart-item {
			width: 100%;
		}
	}
</style>