const polka = require('polka')
const send = require('@polka/send-type')
const cors = require('cors')({ origin: true })
const fuzzysearch = require('fuzzysearch')

const jobs = require('./data.json')
const jobsLookup = jobs.reduce((acc, job) => {
	acc[job.id] = job
	return acc
})

polka()
	.use(cors)
	.use((req, res, next) => {
		res.send = send.bind(null, res)
		next()
	})
	.get('/jobs/', (req, res) => {
		if (req.query.search) {
			const results = jobs.filter(job => fuzzysearch(req.query.search, job.titel || ''))
			res.send(200, results.slice(0, 10))
		} else {
			res.send(200, jobs.slice(0, 10))
		}
	})
	.get('/jobs/:id', (req, res) => {
		res.send(200, jobsLookup[req.params.id])
	})
	.listen(8000, err => {
		if (err) throw err
		console.log(`> Running on localhost:8000`)
	})
