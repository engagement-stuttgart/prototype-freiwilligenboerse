import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home'
import Category from 'views/category'
import Job from 'views/job'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	}, {
		path: '/category/:categoryId',
		name: 'category',
		component: Category,
		props: true
	}, {
		path: '/jobs/:jobId',
		name: 'job',
		component: Job,
		props: true
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
