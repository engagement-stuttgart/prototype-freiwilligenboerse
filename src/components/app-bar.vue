<template lang="pug">
.c-app-bar
	router-link.logo(to="/") Freiwilligenbörse
</template>
<script>
export default {
	components: {},
	data () {
		return {
		}
	},
	computed: {},
	created () {},
	mounted () {
		this.$nextTick(() => {
		})
	},
	methods: {}
}
</script>
<style lang="stylus">
.c-app-bar
	height: 52px
	border-bottom: border-separator()
	display: flex
	align-items: center
	padding: 0 16px
	.logo
		font-size: 24px
		color: $clr-primary-text-light
</style>
