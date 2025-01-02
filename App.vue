<script setup>
	import {
		onHide,
		onLaunch,
		onShow,
		onThemeChange,
		onError
	} from "@dcloudio/uni-app"
	import {
		useThemeStore
	} from "./store/theme"
	import {
		useNavStore
	} from "./store/nav"
	const themeStore = useThemeStore()
	const navStore = useNavStore()
	onLaunch(() => {
		console.log('App Launch')
		themeStore.changeThemeMode(uni.getStorageSync('themeMode') || 'system')
		themeStore.changePrimaryColor(uni.getStorageSync('primaryColor') || '#007AFF')
		navStore.currentNav = navStore.navList[0]
		navStore.cacheList = [navStore.navList[0]]
	})
	onShow(() => {
		console.log('App Launch')
	})
	onHide(() => {
		console.log('App Launch')
	})
	onThemeChange(() => {
		console.log('111')
	})
</script>

<style lang="scss">

</style>