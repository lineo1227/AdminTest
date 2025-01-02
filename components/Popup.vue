<!-- components/Popup/index.vue -->
<template>
	<view v-if="modelValue" class="popup-wrapper" @tap.stop="onMaskClick">
		<view class="popup-content" :class="position" :style="contentStyle" @tap.stop>
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue'

	const props = defineProps({
		modelValue: Boolean,
		position: {
			type: String,
			default: 'bottom' // top, bottom, left, right, center
		},
		backgroundColor: {
			type: String,
			default: '#ffffff'
		}
	})

	const emit = defineEmits(['update:modelValue'])

	const contentStyle = computed(() => ({
		backgroundColor: props.backgroundColor
	}))

	const onMaskClick = () => {
		emit('update:modelValue', false)
	}
</script>

<style lang="scss" scoped>
	.popup-wrapper {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 999;

		.popup-content {
			position: fixed;
			transition: all 0.3s;

			&.bottom {
				left: 0;
				right: 0;
				bottom: 50%;
				border-radius: 12px 12px 0 0;
				transform: translateY(50%);

				&.enter-from,
				&.leave-to {
					transform: translateY(100%);
				}
			}

			&.top {
				left: 0;
				right: 0;
				top: 0;
				border-radius: 0 0 12px 12px;
				transform: translateY(0);

				&.enter-from,
				&.leave-to {
					transform: translateY(-100%);
				}
			}

			&.center {
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				border-radius: 12px;
			}
		}
	}
</style>