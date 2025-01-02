// stores/counter.js
import {
	defineStore
} from 'pinia';

export const useNavStore = defineStore('nav', {
	state: () => {
		return {
			navList: [{
					name: '首页',
					path: '/index',
					icon: "home",
					children: [{
						name: '公司简介',
						path: '/company',
					}]
				},
				{
					name: '产品',
					path: '/product',
					icon: "product",
				},
				{
					name: '个人',
					path: '/person',
					icon: "person",
				},
				{
					name: '设置',
					path: '/setting',
					icon: 'setting'
				}
			],
			currentNav: {
				name: '首页',
				path: '/',
				icon: "home",
				children: [{
					name: '公司简介',
					path: '/company',
				}]
			},
			cacheList: []
		};
	},
	actions: {
		navTo() {

		}
	},
});