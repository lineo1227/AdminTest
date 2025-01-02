<!-- /pages/login/components/BubbleAnimation.vue -->
<template>
	<view class="bubble-container">
		<view v-for="bubble in bubbles" :key="bubble.id" :class="['bubble', `bubble-${bubble.size}`]"
			:style="bubble.style"></view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	const bubbles = ref([])

	onMounted(() => {
		// 创建10个气泡
		for (let i = 0; i < 10; i++) {
			bubbles.value.push({
				id: i,
				size: Math.floor(Math.random() * 3) + 1, // 1-3种大小
				style: {
					left: `${Math.random() * 100}%`,
					animationDelay: `${Math.random() * 5}s`,
					animationDuration: `${Math.random() * 10 + 10}s`
				}
			})
		}
	})
</script>

<style lang="scss">
	.bubble-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.bubble {
			position: absolute;
			border-radius: 50%;
			background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.6) 100%);
			animation: float linear infinite;

			&-1 {
				width: 30px;
				height: 30px;
			}

			&-2 {
				width: 50px;
				height: 50px;
			}

			&-3 {
				width: 70px;
				height: 70px;
			}
		}
	}

	@keyframes float {
		0% {
			transform: translateY(100vh) translateX(0);
		}

		100% {
			transform: translateY(-100%) translateX(50px);
		}
	}
</style>