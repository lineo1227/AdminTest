<!-- /pages/login/components/LoginOptions.vue -->
<template>
	<view class="login-options">
		<view class="divider">
			<text class="divider-text">其他登录方式</text>
		</view>

		<view class="options-list">
			<view class="option-item">
				<view class="icon wechat">
					<!-- 使用字体图标或图片 -->
				</view>
				<text>微信登录</text>
			</view>

			<view class="option-item">
				<view class="icon qrcode">
					<!-- 使用字体图标或图片 -->
				</view>
				<text>扫码登录</text>
			</view>

			<view class="option-item">
				<view class="icon phone">
					<!-- 使用字体图标或图片 -->
				</view>
				<text>手机登录</text>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	.login-options {
		margin-top: 40px;

		.divider {
			position: relative;
			text-align: center;
			margin: 20px 0;

			&::before,
			&::after {
				content: '';
				position: absolute;
				top: 50%;
				width: calc(50% - 100px);
				height: 1px;
				background: #ddd;
			}

			&::before {
				left: 0;
			}

			&::after {
				right: 0;
			}

			.divider-text {
				background: #fff;
				padding: 0 20px;
				color: #999;
				font-size: 14px;
			}
		}

		.options-list {
			display: flex;
			justify-content: center;
			gap: 30px;
			margin-top: 20px;

			.option-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				cursor: pointer;

				.icon {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin-bottom: 8px;
					display: flex;
					align-items: center;
					justify-content: center;

					&.wechat {
						background: #07c160;
					}

					&.qrcode {
						background: #409eff;
					}

					&.phone {
						background: #ff9800;
					}
				}

				text {
					font-size: 12px;
					color: #666;
				}
			}
		}
	}
</style>