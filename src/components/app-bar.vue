<template lang="pug">
.c-app-bar
	router-link.logo(to="/") Freiwilligenbörse
	bunt-button Registrieren
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
@import '~variables'

.c-app-bar
	height: 52px
	border-bottom: border-separator()
	display: flex
	align-items: center
	padding: 0 16px
	justify-content: space-between
	flex: none
	.logo
		font-size: 24px
		color: $clr-primary-text-light
	.bunt-button
		button-style(color: $clr-primary, style: clear)
</style>
