<template>
	<view class="cache-nav">
		<view class="cache-nav-item" v-for="item in navStore.cacheList" :key="item.path"
			:class="navStore.currentNav?.path===item.path&&'active'" @click="navTo(item)">
			<text>
				{{item.name}}
			</text>
			<view @click.stop="deleteNav(item)">
				<uni-icons type="closeempty" :color="navStore.currentNav?.path===item.path?'white':'var(--text-color)'"
					size="12"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useNavStore
	} from '@/store/nav';
	const navStore = useNavStore()

	function navTo(nav) {
		navStore.currentNav = nav
		// uni.redirectTo({
		// 	url: `/pages${nav?.path}${nav?.path}`
		// })
	}

	function deleteNav(nav) {
		navStore.cacheList = navStore.cacheList.filter(item => item.path !== nav.path)
		if (navStore.cacheList.length === 0) {
			navStore.cacheList = [navStore.navList[0]]
		}
		if (navStore.currentNav.path === nav.path) {
			navStore.currentNav = navStore.cacheList.at(-1)
			// uni.redirectTo({
			// 	url: `/pages${navStore.currentNav?.path}${navStore.currentNav?.path}`
			// })
		}
	}
</script>

<style lang="scss">
	.cache-nav {
		width: 100%;
		height: 36px;
		border-bottom: 1px solid #ccc;
		display: flex;
		align-items: center;
		background-color: var(--background-color);
		color: var(--text-color);

		&-item {
			margin: 4px;
			padding: 4px 6px;
			box-sizing: border-box;
			border-radius: 2px;
			min-width: 60px;
			font-size: 12px;
			outline: 1px solid #ccc;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&:first-child {
				margin-left: 6px;
			}

			text {
				transition: 0s;
			}

			&:hover,
			&.active {
				background-color: var(--primary-light);
				outline: none;
			}

			&.active {
				color: white;
			}
		}
	}
</style>