<template lang="pug">
.c-jobs-search(v-scrollbar.y="")
	.jobs-search-inner
		.hero
			h1 Some flavor text
			p A lot more flavor text. A lot more flavor text. A lot more flavor text. A lot more flavor text. A lot more flavor text. A lot more flavor text.
		.categories
			router-link.category(v-for="category of categories", :to="{name: 'category', params: {categoryId: category.id}}")
				img(:src="`https://placeimg.com/200/160/any?${category.id}`")
				.name {{ category.label }}
</template>
<script>
import api from 'lib/api'
import categories from 'assets/categories.json'

export default {
	name: 'home',
	data () {
		return {
			categories: Object.entries(categories).map(cat => ({id: cat[0], label: cat[1]})),
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
		background-color: $clr-white
		+above('m')
			padding: 8px 32px
		+below('m')
			padding: 8px 8px
		.hero
			h1
				margin: 0
		.bunt-progress-circular
			align-self: center
		.categories
			display: grid
			grid-template-columns: repeat(2, 1fr)
			// max-width: 100vw
			grid-column-gap: 8px
			grid-row-gap: 8px
			.category
				height: 128px + 56px
				position: relative
				display: flex
				flex-direction: column
				justify-content: flex-end
				img
					height: 128px
					object-fit: cover
					border-radius: 8px
				.name
					font-size: 14px
					padding: 4px 8px 8px
					height: 56px
					vertical-align: middle
					background-color: $clr-primary-text-dark
					// font-weight: 500
					color: $clr-primary-text-light
					overflow-wrap: break-word
					// border: 2px solid $clr-grey-500
					// border-top: none
				// & + .job
				// 	border-top: border-separator()
</style>
