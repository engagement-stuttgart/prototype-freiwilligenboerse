<template lang="pug">
.c-jobs-search
	bunt-input(name="search", label="Suche", v-model="search")
	bunt-progress-circular(v-if="jobsLoading", size="huge")
	.list(v-else)
		router-link.job(v-for="job of jobs", :to="{name: 'job', params: {jobId: job.id}}") {{ job.titel }}
</template>
<script>
import api from 'lib/api'

export default {
	name: 'home',
	data () {
		return {
			search: '',
			jobs: [],
			jobsLoading: false,
			searchQueued: false
		}
	},
	computed: {
	},
	watch: {
		search () {
			this.loadJobs()
		}
	},
	created () {
		this.loadJobs()
	},
	methods: {
		async loadJobs () {
			if (this.jobsLoading) {
				this.searchQueued = true
				return
			}
			this.jobsLoading = true
			const jobs = await api.jobs.list(this.search)
			this.jobsLoading = false
			if (this.searchQueued) {
				this.searchQueued = false
				return this.loadJobs()
			}
			this.jobs = jobs
		}
	}
}
</script>
<style lang="stylus">
@import '~variables'

.c-jobs-search
	display: flex
	flex-direction: column
	max-width: 560px
	width: 560px
	align-self: center
	+above('m')
		padding: 8px 32px
	+below('m')
		padding: 8px 8px
	.bunt-progress-circular
		align-self: center
	.list
		display: flex
		flex-direction: column
		.job
			height: 32px
			line-height: 32px
			& + .job
				border-top: border-separator()
</style>
