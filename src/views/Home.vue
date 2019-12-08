<template lang="pug">
.c-jobs-search(v-scrollbar.y="")
	.jobs-search-inner
		.hero
			h1 Some flavor text
			p A lot more flavor text. A lot more flavor text. A lot more flavor text. A lot more flavor text. A lot more flavor text. A lot more flavor text.
		bunt-input(name="search", label="Suche", v-model="search")
		bunt-progress-circular(v-if="jobsLoading", size="huge")
		.list(v-else)
			router-link.job(v-for="job of jobs", :to="{name: 'job', params: {jobId: job.id}}", :style="{'background-image': `url(https://placeimg.com/640/480/any?${job.id})`}")
				.name {{ job.titel }}
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
	.jobs-search-inner
		display: flex
		flex-direction: column
		max-width: 560px
		align-self: center
		width: 100%
		box-sizing: border-box
		+above('m')
			padding: 8px 32px
		+below('m')
			padding: 8px 8px
		.hero
			h1
				margin: 0
		.bunt-progress-circular
			align-self: center
		.list
			display: flex
			flex-direction: column
			.job
				height: 200px
				// line-height: 32px
				margin: 8px 0
				position: relative
				display: flex
				flex-direction: column
				justify-content: flex-end
				img
					position: absolute
					height: 180px
					object-fit: cover
				.name
					font-size: 18px
					padding: 16px 8px
					background-color: $clr-secondary-text-dark
					// font-weight: 500
					color: $clr-primary-text-light
				// & + .job
				// 	border-top: border-separator()
</style>
