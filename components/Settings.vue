<template>
	<view class="setting" :class="show&&'show'">
		<!-- 主题模式切换 -->
		<view class="theme-mode">
			<button v-for="mode in themeModes" :key="mode.value"
				:class="{ active: themeStore.themeMode === mode.value }" @tap="themeStore.changeThemeMode(mode.value)">
				{{ mode.label }}
			</button>
		</view>

		<!-- 主题色选择 -->
		<view class="theme-color">
			<text class="label">主题色 {{themeStore.primaryColor}}</text>
			<ColorPicker v-model="themeStore.primaryColor" :preset-colors="presetColors" />
		</view>
		<view class="setting-control" @click="show=!show">
			<uni-icons :type="show?'closeempty':'gear'" color="white" size="20"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	import {
		useThemeStore
	} from '@/store/theme.js'
	import ColorPicker from './ColorPicker.vue'
	import {
		ref
	} from 'vue'
	const show = ref(false)
	const themeStore = useThemeStore()

	const themeModes = [{
			label: '浅色',
			value: 'light'
		},
		{
			label: '深色',
			value: 'dark'
		},
		{
			label: '跟随系统',
			value: 'system'
		}
	]

	const presetColors = [
		'#007AFF',
		'#FF3B30',
		'#4CD964',
		'#FF9500',
		'#5856D6',
		'#FF2D55'
	]
</script>

<style lang="scss">
	.setting {
		padding: 20px;
		border: 1px solid #ccc;
		position: fixed;
		top: 50%;
		right: 0%;
		transform: translate(100%, -50%);
		background-color: var(--background-color);
		border-radius: 10px;
		z-index: 9999;
		transition: .3s;

		&-control {
			cursor: pointer;
			position: absolute;
			top: 50%;
			left: -40px;
			transform: translateY(-50%);
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			background-color: var(--primary);
			border-radius: 10px 0 0 10px;
		}

		&.show {
			transform: translate(0%, -50%);
		}

		.title {
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 20px;
			color: var(--text-color);
		}
	}

	.theme-mode {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
		justify-content: flex-start;

		button {
			margin: 0;
			white-space: nowrap;
			text-align: center;
			background-color: var(--background-color);
			border: 1px solid #ccc;
			border-radius: 4px;
			color: var(--text-color);
			font-size: 14px;

			&.active {
				background-color: var(--primary);
				border-color: var(--primary);
				color: #fff;
			}
		}
	}

	.theme-color {
		.label {
			display: block;
			margin-bottom: 10px;
			font-size: 14px;
			color: var(--text-color);
		}
	}
</style>