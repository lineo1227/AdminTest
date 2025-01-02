// stores/counter.js
import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			user: {
				name: "lineo",
			}
		};
	},
	actions: {
		login(name) {
			this.user = {
				name: name || "lineo"
			}
			console.log(this.user)
			uni.navigateTo({
				url: '/pages/index/index'
			})
		},
		logout() {
			this.user = null
		}
	},
});