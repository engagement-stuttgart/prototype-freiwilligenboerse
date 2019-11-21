<template lang="pug">
#app
	app-bar
	router-view
</template>
<script>
import AppBar from 'components/app-bar'

export default {
	components: { AppBar }
}
</script>
<style lang="stylus">
#app
	display: flex
	flex-direction: column
</style>
