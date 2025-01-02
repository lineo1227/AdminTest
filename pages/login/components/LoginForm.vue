<!-- /pages/login/components/LoginForm.vue -->
<template>
	<view class="login-form">
		<view class="form-header">
			<view class="title">欢迎回来</view>
			<view class="subtitle">请登录您的账号</view>
		</view>

		<view class="form-content">
			<view class="form-item">
				<input class="input" v-model="userInfo.username" type="text" placeholder="请输入用户名/手机号" />
			</view>

			<view class="form-item">
				<input class="input" v-model="userInfo.password" type="password" placeholder="请输入密码" />
			</view>

			<view class="form-actions">
				<text class="forgot-password">忘记密码？</text>
			</view>

			<button class="login-button" @click="userStore.login(userInfo.username)">登 录</button>
		</view>
	</view>
</template>
<script setup>
	import {
		reactive
	} from 'vue';
	import {
		useUserStore
	} from '@/store/user';
	const userStore = useUserStore();
	const userInfo = reactive({
		username: '',
		password: '',
	});
</script>
<style lang="scss" scoped>
	.login-form {
		width: 100%;
		max-width: 400px;
		margin: 0 auto;

		.form-header {
			text-align: center;
			margin-bottom: 40px;

			.title {
				font-size: 28px;
				font-weight: bold;
				color: #333;
				margin-bottom: 10px;
			}

			.subtitle {
				font-size: 16px;
				color: #999;
			}
		}

		.form-content {
			.form-item {
				margin-bottom: 20px;

				.input {
					width: 100%;
					height: 50px;
					border: 1px solid #ddd;
					border-radius: 8px;
					padding: 0 15px;
					font-size: 16px;

					&:focus {
						border-color: var(--primary);
						outline: none;
					}
				}
			}

			.form-actions {
				text-align: right;
				margin-bottom: 20px;

				.forgot-password {
					color: var(--primary);
					font-size: 14px;
				}
			}

			.login-button {
				width: 100%;
				height: 44px;
				background: var(--primary);
				color: #fff;
				border: none;
				border-radius: 8px;
				font-size: 16px;
				cursor: pointer;

				&:hover {
					background: var(--primary-light);
				}
			}
		}
	}
</style>