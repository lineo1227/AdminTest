import {
	defineStore
} from 'pinia'
import {
	ref,
	watch
} from 'vue'
import Color from 'color'

export const useThemeStore = defineStore('theme', () => {
	const themeMode = ref(uni.getStorageSync('themeMode') || 'system')
	const currentTheme = ref('light')
	const primaryColor = ref(uni.getStorageSync('primaryColor') || '#007AFF')

	const getThemeColors = (color) => {
		const baseColor = Color(color)
		return {
			primary: color,
			'primary-light': baseColor.lighten(0.2).rgb(),
			'primary-dark': baseColor.darken(0.2).rgb(),
			'primary-fade': baseColor.alpha(0.2).rgb(),
		}
	}
	const RootStyles = ref("")
	const applyTheme = () => {
		const colors = getThemeColors(primaryColor.value)
		RootStyles.value = ""
		Object.entries(colors).forEach(([key, value]) => {
			RootStyles.value += `--${key}:${value};`
		})
		console.log('RootStyles', RootStyles.value)
	}

	const watchSystemTheme = () => {
		// #ifdef H5
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handler = (e) => {
			if (themeMode.value === 'system') {
				currentTheme.value = e.matches ? 'dark' : 'light'
				applyTheme()
			}
		}
		mediaQuery.addEventListener('change', handler)
		handler(mediaQuery)
		// #endif

		// #ifdef APP-PLUS || MP
		uni.onThemeChange(({
			theme
		}) => {
			if (themeMode.value === 'system') {
				currentTheme.value = theme
				applyTheme()
			}
		})
		// #endif
	}

	const changeThemeMode = (mode) => {
		themeMode.value = mode
		uni.setStorageSync('themeMode', mode)

		if (mode === 'system') {
			// #ifdef H5
			const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
			currentTheme.value = isDark ? 'dark' : 'light'
			// #endif

			// #ifdef APP-PLUS || MP-WEIXIN
			const sysInfo = uni.getSystemInfoSync()
			uni.setBackgroundColor({
				backgroundColor: '#e5e5e5'
			})
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			})
			currentTheme.value = sysInfo.theme || 'light'
			// #endif
		} else {
			// #ifdef APP-PLUS || MP-WEIXIN
			console.log('mode', mode)
			uni.setBackgroundColor({
				backgroundColor: mode === 'dark' ? '#252525' : '#f5f5f5'
			})
			uni.setNavigationBarColor({
				frontColor: mode === 'dark' ? '#ffffff' : '#000000',
				backgroundColor: mode === 'dark' ? '#252525' : '#f5f5f5'
			})
			// #endif

			currentTheme.value = mode
		}
		applyTheme()
	}

	const changePrimaryColor = (color) => {
		primaryColor.value = color
		uni.setStorageSync('primaryColor', color)
		applyTheme()
	}

	watch(currentTheme, () => {
		applyTheme()
	})

	return {
		themeMode,
		currentTheme,
		primaryColor,
		changeThemeMode,
		changePrimaryColor,
		watchSystemTheme,
		RootStyles
	}
})