<template>
	<LayoutVue>
		<template #page>
			<scroll-view class="page-container" scroll-y>
				<product v-if="currentNav.path==='/product'" />
				<setting v-if="currentNav.path==='/setting'" />
				<home v-if="currentNav.path==='/index'" />
				<person v-if="currentNav.path==='/person'" />
			</scroll-view>

		</template>
	</LayoutVue>

</template>

<script setup>
	import LayoutVue from '@/components/Layout.vue'
	import product from "@/router/product/product.vue";
	import setting from "@/router/setting/setting.vue";
	import home from "@/router/index/index.vue";
	import person from "@/router/person/person.vue";
	import {
		useNavStore
	} from '@/store/nav';
	import {
		storeToRefs
	} from 'pinia';
	const navStore = useNavStore();
	const {
		currentNav
	} = storeToRefs(navStore);
</script>

<style lang="scss">
	.page-container {
		flex: 1;
		height: 1px;
		// background-color: var(--primary);
	}
</style>