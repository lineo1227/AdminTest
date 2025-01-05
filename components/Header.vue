<template>
	<view class="header">
		<view class="header-control">
		</view>
		<view class="header-avatar" v-if="userStore.user" @click="userStore.logout()">
			{{userStore.user.name}}
			<!-- <image src="/static/logo.png" mode=""></image> -->
		</view>
		<view class="header-avatar" v-else @click="navTo">
			login
			<!-- <image src="/static/logo.png" mode=""></image> -->
		</view>
	</view>
</template>

<script setup>
	import {
		useNavStore
	} from '@/store/nav';
	import {
		storeToRefs
	} from "pinia"
	import {
		useUserStore
	} from '@/store/user';
	const userStore = useUserStore();
	const navStore = useNavStore();
	const {
		cacheList
	} = storeToRefs(navStore)
	const navTo = () => {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
</script>

<style lang="scss">
	.header {
		height: 50px;
		width: 100%;
		border-bottom: 1px solid #ccc;
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
		box-sizing: border-box;
		align-items: center;
		background-color: var(--background-color);

		&-control {}

		&-avatar {
			height: 32px;
			width: 32px;
			background-color: var(--primary);
			border-radius: 50%;
			overflow: hidden;
			align-items: center;
			display: flex;
			justify-content: center;
			font-size: 12px;
			color: #fff;

			image {
				height: 100%;
				width: 100%;
			}
		}
	}

	@media screen and (max-width: 600px) {
		.header {
			height: 40px;

			&-avatar {
				height: 26px;
				width: 26px;
			}
		}
	}
</style>