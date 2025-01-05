<template>
	<view class="nav" :class="show&&'show'">
		<view class="nav-menus">
			<view class="nav-logo">
				<image src="/static/logo.svg" mode="heightFix"></image>
			</view>
			<view class="nav-link" :class="navStore.currentNav?.path===item.path&&'active'"
				v-for="item in navStore.navList" @click="navTo(item)">
				<image :src="`/static/images/${item.icon}.svg`" mode=""></image>
				<view>
					{{item.name}}
				</view>
			</view>
			<view class="nav-control" @click="show=!show">
				<uni-icons :type="show?'left':'right'" color="white" size="20"></uni-icons>

			</view>
		</view>
		<view class="sub-menus">
			<view class="current-menu">
				{{navStore.currentNav?.name ?? "首页"}}模块
			</view>
			<view class="sub-link" v-for="item in 4">
				测试{{item}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useNavStore
	} from '../store/nav';
	import {
		ref
	} from "vue"
	const show = ref(false)
	const navStore = useNavStore();

	function navTo(nav) {
		navStore.currentNav = nav
		const index = navStore.cacheList.findIndex(item => item.path === nav.path)
		if (index === -1) {
			navStore.cacheList.push(nav)
		} else {
			navStore.cacheList.splice(index, 1)
			navStore.cacheList.push(nav)
		}
		// uni.navigateTo({
		// 	url: `/pages${nav?.path}${nav?.path}`
		// })
	}
</script>

<style lang="scss" scoped>
	.nav {
		display: flex;
		transition: .3s;

		.sub-menus {
			height: 100vh;
			background-color: var(--background-color);
			border-right: 1px solid #ccc;
			width: 120px;
			color: var(--text-color);
			;

			.current-menu {
				height: 50px;
				text-align: center;
				line-height: 50px;
				box-sizing: border-box;
				font-size: 14px;
				border-bottom: 1px solid #ccc;
				margin-bottom: 10px;
			}

			.sub-link {
				margin: 0px auto 6px;
				font-size: 14px;
				padding: 8px 20px;
				box-sizing: border-box;
				width: calc(100% - 20px);
				border-radius: 4px;
				cursor: pointer;

				&:hover {
					color: var(--primary-dark);
					background-color: var(--primary-fade);
				}
			}
		}

		&-menus {
			width: 70px;
			height: 100vh;
			border-right: 1px solid #ccc;
			background-color: #333;
			color: #fff;
			transition: .3s;
		}

		&-logo {
			height: 54px;
			width: 70px;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				height: 60%;
			}
		}

		&-control {
			position: fixed;
			bottom: 20px;
			left: 20px;
			width: 40px;
			height: 40px;
			background-color: var(--primary);
			border-radius: 10px;
			display: none;
		}

		&-link {
			width: 50px;
			height: 50px;
			text-align: center;
			font-size: 16px;
			cursor: pointer;
			display: flex;
			flex-direction: column;
			font-size: 12px;
			align-items: center;
			justify-content: center;
			padding: 0;
			transition: .3s;
			margin: 0 auto 10px;
			border-radius: 4px;

			image {
				height: 16px;
				width: 16px;
				margin-bottom: 2px;
			}

			view {
				width: 100%;
				box-sizing: border-box;
			}

			&:hover,
			&.active {
				background-color: var(--primary);
			}
		}
	}

	// 写一个媒体查询 当尺寸为小于600px的时候，导航栏设置fixed定位
	@media screen and (max-width: 600px) {
		.nav {
			position: fixed;
			top: 0;
			left: -100%;
			z-index: 999;

			.sub-menus {
				width: 160rpx;

				.current-menu {
					height: 80rpx;
					padding: 12rpx;
					font-size: 24rpx;
					line-height: 50rpx;
				}

				.sub-link {
					margin: 4px auto;
					text-align: center;
					font-size: 12px;
					width: calc(100% - 10px);
					border-radius: 4px;
				}
			}

			&.show {
				left: 0;
			}

			&-logo {
				height: 40px;
			}

			&-control {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			&-link {
				text-align: left;
				height: 60rpx;

				view {
					padding: 0;
					padding-left: 10px;
				}

				image {
					display: none;
				}
			}

		}
	}
</style>