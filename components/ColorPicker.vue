<template>
	<view class="color-picker">
		<view class="selected-color" @click="showPicker = true">
			<view class="color-preview" :style="{ backgroundColor: modelValue }"></view>
			<text class="color-value">{{ modelValue }}</text>
		</view>

		<Popup v-model="showPicker" position="bottom">
			<view class="picker-panel">
				<view class="header">
					<text>选择颜色</text>
					<text class="close" @click="showPicker = false">×</text>
				</view>

				<!-- 颜色预览 -->
				<view class="color-preview-panel">
					<view class="preview-box" :style="{ backgroundColor: previewColor }"></view>
					<text class="preview-text">{{ previewColor }}</text>
				</view>

				<!-- 预设颜色 -->
				<view class="preset-colors">
					<view v-for="color in presetColors" :key="color" class="preset-color"
						:style="{ backgroundColor: color }" :class="{ active: modelValue === color }"
						@click="selectColor(color)"></view>
				</view>

				<!-- HSL 颜色选择器 -->
				<view class="hsl-picker">
					<!-- 色相选择 -->
					<view class="hue-slider" ref="hueRef" @click="onHueClick">
						<view class="hue-track"></view>
						<view class="hue-thumb" :style="{ 
                            left: `${currentColor.hue() / 360 * 100}%`,
                            pointerEvents: 'none'
                        }" @touchstart.stop="onHueStart" @touchmove.stop.prevent="onHueMove" @touchend="onHueEnd">
						</view>
					</view>

					<!-- 饱和度和亮度选择区域 -->
					<view class="sl-panel" ref="slRef"
						:style="{ backgroundColor: `hsl(${currentColor.hue()}, 100%, 50%)` }" @click="onSLClick">
						<view class="sl-thumb" :style="{
                            left: `${currentColor.saturationl()}%`,
                            top: `${100 - currentColor.lightness()}%`,
                            pointerEvents: 'none'
                        }" @touchstart.stop="onSLStart" @touchmove.stop.prevent="onSLMove" @touchend="onSLEnd"></view>
					</view>
				</view>
			</view>
		</Popup>
	</view>
</template>

<script setup>
	import {
		ref,
		watch,
		onMounted,
		computed
	} from 'vue'
	import Color from 'color'
	import Popup from './Popup.vue'
	import {
		useThemeStore
	} from '@/store/theme'
	const themeStore = useThemeStore()


	const props = defineProps({
		modelValue: {
			type: String,
			required: true
		},
		presetColors: {
			type: Array,
			default: () => [
				'#007AFF',
				'#FF3B30',
				'#4CD964',
				'#FF9500',
				'#5856D6',
				'#FF2D55',
				'#8E8E93',
				'#EFEFF4'
			]
		}
	})
	const showPicker = ref(false)
	const currentColor = ref(Color(props.modelValue))
	const isDragging = ref(false)
	const hueRef = ref(null)
	const slRef = ref(null)

	// 实时预览颜色
	const previewColor = computed(() => {
		try {
			return currentColor.value.hex()
		} catch (error) {
			return props.modelValue
		}
	})

	// 获取元素位置信息的跨平台方法
	const getElementRect = (selector) => {
		return new Promise((resolve) => {
			const query = uni.createSelectorQuery().in(this)
			query.select(selector).boundingClientRect(data => {
				resolve(data)
			}).exec()
		})
	}

	// 获取相对点击位置
	const getRelativePosition = async (event, selector) => {
		const touch = event.touches ? event.touches[0] : event
		const rect = await getElementRect(selector)
		if (!rect) return {
			x: 0,
			y: 0
		}

		const x = touch.clientX - rect.left
		const y = touch.clientY - rect.top
		return {
			x,
			y
		}
	}

	// 色相点击和拖动事件
	const onHueClick = async (e) => {
		const {
			x
		} = await getRelativePosition(e, '.hue-slider')
		const rect = await getElementRect('.hue-slider')
		if (!rect) return

		const hue = Math.max(0, Math.min(360, (x / rect.width) * 360))
		currentColor.value = currentColor.value.hue(hue)
		updateColor()
	}

	const onHueStart = async (e) => {
		e.preventDefault()
		const rect = await getElementRect('.hue-slider')
		if (!rect) return

		isDragging.value = true
		const {
			x
		} = await getRelativePosition(e, '.hue-slider')
		const hue = Math.max(0, Math.min(360, (x / rect.width) * 360))
		currentColor.value = currentColor.value.hue(hue)
		updateColor()
	}

	const onHueMove = async (e) => {
		if (!isDragging.value) return
		const {
			x
		} = await getRelativePosition(e, '.hue-slider')
		const rect = await getElementRect('.hue-slider')
		if (!rect) return

		const hue = Math.max(0, Math.min(360, (x / rect.width) * 360))
		currentColor.value = currentColor.value.hue(hue)
		updateColor()
	}

	const onHueEnd = () => {
		isDragging.value = false
	}

	// 饱和度和亮度点击和拖动事件
	const onSLClick = async (e) => {
		const {
			x,
			y
		} = await getRelativePosition(e, '.sl-panel')
		const rect = await getElementRect('.sl-panel')
		if (!rect) return

		const saturation = Math.max(0, Math.min(100, (x / rect.width) * 100))
		const lightness = Math.max(0, Math.min(100, 100 - (y / rect.height) * 100))

		currentColor.value = currentColor.value
			.saturationl(saturation)
			.lightness(lightness)

		updateColor()
	}

	const onSLStart = async (e) => {
		e.preventDefault()
		isDragging.value = true
		const {
			x,
			y
		} = await getRelativePosition(e, '.sl-panel')
		const rect = await getElementRect('.sl-panel')
		if (!rect) return

		const saturation = Math.max(0, Math.min(100, (x / rect.width) * 100))
		const lightness = Math.max(0, Math.min(100, 100 - (y / rect.height) * 100))

		currentColor.value = currentColor.value
			.saturationl(saturation)
			.lightness(lightness)

		updateColor()
	}

	const onSLMove = async (e) => {
		if (!isDragging.value) return
		const {
			x,
			y
		} = await getRelativePosition(e, '.sl-panel')
		const rect = await getElementRect('.sl-panel')
		if (!rect) return

		const saturation = Math.max(0, Math.min(100, (x / rect.width) * 100))
		const lightness = Math.max(0, Math.min(100, 100 - (y / rect.height) * 100))

		currentColor.value = currentColor.value
			.saturationl(saturation)
			.lightness(lightness)

		updateColor()
	}

	const onSLEnd = () => {
		isDragging.value = false
	}

	// 更新颜色
	const updateColor = () => {
		themeStore.changePrimaryColor(currentColor.value.hex())
	}

	// 选择预设颜色
	const selectColor = (color) => {
		currentColor.value = Color(color)
		updateColor()
	}

	// popup 显示时初始化
	watch(showPicker, (newValue) => {
		if (newValue) {
			currentColor.value = Color(props.modelValue)
		}
	})

	// 监听外部颜色变化
	watch(() => props.modelValue, (newValue) => {
		if (!isDragging.value) {
			currentColor.value = Color(newValue)
		}
	})
</script>

<style lang="scss">
	/* 样式保持不变 */
	.color-picker {
		background-color: var(--background-color);

		.color-preview-panel {
			display: flex;
			align-items: center;
			gap: 12px;
			margin-bottom: 16px;
			padding: 12px;
			border-radius: 8px;

			.preview-box {
				width: 40px;
				height: 40px;
				border-radius: 6px;
				border: 2px solid #fff;
				box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
			}

			.preview-text {
				font-size: 14px;
				color: #666;
				font-family: monospace;
			}
		}

		.hue-slider,
		.sl-panel {
			touch-action: none;
			/* 防止触摸事件的默认行为 */
		}

		.selected-color {
			display: flex;
			align-items: center;
			gap: 10px;
			padding: 10px;
			border: 1px solid #ccc;
			border-radius: 4px;

			.color-preview {
				width: 24px;
				height: 24px;
				border-radius: 4px;
				border: 1px solid var(--border-color);
			}

			.color-value {
				font-size: 14px;
				color: var(--text-color);
			}
		}
	}

	.picker-panel {
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		background-color: var(--background-color);
		outline: 1px solid #ccc;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
			padding: 10px 6px 0 20px;

			.close {
				font-size: 24px;
				color: #999;
				padding: 0 10px;
			}
		}

		.preset-colors {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
			margin-bottom: 20px;
			padding: 0 20px;

			.preset-color {
				width: 40px;
				height: 40px;
				border-radius: 4px;
				border: 2px solid transparent;

				&.active {
					border-color: #000;
				}
			}
		}

		.hsl-picker {
			padding: 0 20px 20px;

			.hue-slider {
				position: relative;
				height: 20px;
				margin-bottom: 20px;

				.hue-track {
					position: absolute;
					left: 0;
					right: 0;
					height: 8px;
					border-radius: 4px;
					background: linear-gradient(to right,
							#ff0000 0%,
							#ffff00 17%,
							#00ff00 33%,
							#00ffff 50%,
							#0000ff 67%,
							#ff00ff 83%,
							#ff0000 100%);
				}

				.hue-thumb {
					position: absolute;
					width: 16px;
					height: 16px;
					background: #fff;
					border: 2px solid #000;
					border-radius: 50%;
					transform: translate(-50%, -4px);
					transition: .3s;
				}
			}

			.sl-panel {
				position: relative;
				width: 100%;
				height: 200px;
				border-radius: 4px;
				background-image:
					linear-gradient(to right, #fff 0%, transparent 100%),
					linear-gradient(to top, #000 0%, transparent 100%);

				.sl-thumb {
					position: absolute;
					width: 16px;
					height: 16px;
					background: #fff;
					border: 2px solid #000;
					border-radius: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
	}
</style>