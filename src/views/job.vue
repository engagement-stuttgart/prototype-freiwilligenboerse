<template lang="pug">
.c-page-job
	bunt-progress-circular(v-if="!job", size="huge", :page="true")
	template(v-else)
		h1 {{ job.titel }}
</template>
<script>
import api from 'lib/api'

export default {
	props: {
		jobId: String
	},
	data () {
		return {
			job: null
		}
	},
	computed: {},
	async created () {
		this.job = await api.jobs.get(this.jobId)
	},
	mounted () {
		this.$nextTick(() => {
		})
	},
	methods: {}
}
</script>
<style lang="stylus">
.c-page-job
	display: flex
	flex-direction: column
	padding: 8px
</style>
