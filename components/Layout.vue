<template>
	<view class="admin" :style="themeStore.RootStyles" :data-theme="themeStore.currentTheme">
		<NavBarVue v-if="!isLogin" />
		<view class="admin-page">
			<HeaderVue v-if="!isLogin" />
			<CacheNavVue v-if="!isLogin" />
			<slot name="page"></slot>
			<SettingsVue />
		</view>
	</view>
</template>

<script setup>
	import NavBarVue from './NavBar.vue';
	import HeaderVue from './Header.vue';
	import SettingsVue from './Settings.vue';
	import CacheNavVue from './CacheNav.vue';
	import {
		useThemeStore
	} from '../store/theme';
	const {
		isLogin
	} = defineProps({
		isLogin: {
			type: Boolean,
			default: false
		}
	})
	const themeStore = useThemeStore();
</script>

<style lang="scss">
	.admin {
		display: flex;
		height: 100vh;
		width: 100vw;
		background-color: var(--background-color);
		color: var(--text-color);

		&-page {
			flex: 1;
			display: flex;
			flex-direction: column;
		}
	}

	.admin {
		--background-color: #ffffff;
		--text-color: #333333;
		--border-color: #e5e5e5;

		--primary: #007AFF;
		--primary-light: #3395ff;
		--primary-dark: #0066d6;
		--primary-fade: rgba(0, 122, 255, 0.2);
	}

	.admin[data-theme='dark'] {
		--background-color: #333;
		--text-color: #ffffff;
		--border-color: #333;
	}
</style>