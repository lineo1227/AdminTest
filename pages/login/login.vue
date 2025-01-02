<!-- /pages/login/index.vue -->
<template>
	<LayoutVue :isLogin="true">
		<template #page>
			<view class="login-container">
				<!-- PC端显示的左侧动画区域 -->
				<view class="left-container" v-if="isPc">
					<bubble-animation></bubble-animation>
				</view>

				<!-- 登录表单区域 -->
				<view :class="['login-form-container', { 'mobile': !isPc }]">
					<login-form></login-form>
					<login-options></login-options>
				</view>
			</view>
		</template>
	</LayoutVue>

</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import BubbleAnimation from './components/BubbleAnimation.vue'
	import LoginForm from './components/LoginForm.vue'
	import LoginOptions from './components/LoginOptions.vue'
	import LayoutVue from '@/components/Layout.vue'
	const isPc = ref(false)

	onMounted(() => {
		// 判断是否为PC端
		// #ifdef H5
		isPc.value = window.innerWidth > 768
		// #endif
	})
</script>

<style lang="scss">
	.login-container {
		min-height: 100vh;
		display: flex;
		background: linear-gradient(135deg, #f5f7fa 0%, var(--primary-light) 100%);
		// background-color: var(--primary);

		.left-container {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			@media (max-width: 768px) {
				display: none;
			}
		}

		.login-form-container {
			flex: 1;
			background: #ffffff;
			padding: 40px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);

			&.mobile {
				width: 100%;
				padding: 20px;
			}
		}
	}
</style>