// api layer be here
import config from 'config'

function cleanQuery (object) {
	Object.keys(object).forEach(key => !object[key] && delete object[key])
	return object
}

const api = {
	fetch (url, method, body, userHeaders) {
		const headers = userHeaders || {
			'Content-Type': 'application/json',
			// 'authorization': `JWT ${this.idToken}`,
			'Cache-Control': 'no-cache'
		}
		const options = {
			method: method || 'GET',
			headers,
			body: body instanceof FormData ? body : JSON.stringify(body),
			credentials: 'omit' // api wants no cookies
		}
		return window.fetch(url.startsWith('http') ? url : config.api.baseUrl + url, options).then((response) => {
			if (response.status === 204) // no content to parse
				return Promise.resolve()
			return response.json().then((json) => {
				if (!response.ok)
					// TODO change to error
					return Promise.reject({response, json}) // eslint-disable-line
				return Promise.resolve(json)
			}).catch(error => {
				if (!error.json) // no json
					return Promise.reject({response}) // eslint-disable-line
				return Promise.reject(error)
			})
		}).catch((error) => {
			return Promise.reject(error)
		})
	},
	jobs: {
		list (search) {
			const query = {
				search
			}
			const qs = new URLSearchParams(cleanQuery(query)).toString()
			return api.fetch(`jobs/?${qs}`)
		},
		get (id) {
			return api.fetch(`jobs/${id}`)
		}
	}
}

window.api = api

export default api
