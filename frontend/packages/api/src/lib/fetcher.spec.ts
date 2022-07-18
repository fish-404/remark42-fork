import { mockEndpoint } from '@test/lib'
import { JWT_HEADER, XSRF_COOKIE, XSRF_HEADER } from '../consts'
import { createFetcher } from './fetcher'

describe('fetcher', () => {
	const fetcher = createFetcher('remark42', '')

	describe('methods', () => {
		it('should send GET request', async () => {
			const ref = mockEndpoint('/test')

			await fetcher.get('/test')
			expect(ref.req.method).toBe('GET')
		})

		it('should send PUT request', async () => {
			const ref = mockEndpoint('/test', { method: 'put' })

			await fetcher.put('/test')
			expect(ref.req.method).toBe('PUT')
		})

		it('should send DELETE request', async () => {
			const ref = mockEndpoint('/test', { method: 'delete' })

			await fetcher.delete('/test')
			expect(ref.req.method).toBe('DELETE')
		})
	})

	describe('send data', () => {
		it('should send json', async () => {
			const data = { name: 'test' }
			const ref = mockEndpoint('/test', { method: 'post', body: data })

			await expect(fetcher.post('/test', {}, data)).resolves.toEqual(data)
			await expect(ref.req.json()).resolves.toEqual(data)
			expect(ref.req.headers.get('Content-Type')).toBe('application/json')
		})

		it('should send text', async () => {
			const data = 'text'
			const ref = mockEndpoint('/test', { method: 'post', body: data })

			await expect(fetcher.post('/test', {}, data)).resolves.toBe(data)
			expect(ref.req.headers.get('Content-Type')).toMatch('text/plain')
			await expect(ref.req.text()).resolves.toBe(data)
		})

		it('should send form data', async () => {
			const ref = mockEndpoint('/test', { method: 'post' })
			const data = new FormData()

			data.append('name', 'test')
			await expect(fetcher.post('/test', {}, data)).resolves.toBe('')
			expect(ref.req.headers.get('Content-Type')).toBeNull()
		})
	})

	describe('query params', () => {
		it('should send query params', async () => {
			const ref = mockEndpoint('/test')

			await expect(fetcher.get('/test', { x: 1, p: 2 })).resolves.toBe('')
			expect(ref.req.url.searchParams.get('x')).toBe('1')
			expect(ref.req.url.searchParams.get('p')).toBe('2')
		})

		it('should sort query params', async () => {
			const ref = mockEndpoint('/test')

			await expect(fetcher.get('/test', { x: 1, p: 2 })).resolves.toBe('')
			expect(ref.req.url.search).toBe('?p=2&site=remark42&x=1')
		})
	})

	describe('auth headers', () => {
		it('should set active token and then clean it on unauthorized response', async () => {
			let ref = mockEndpoint('/user', { headers: { [JWT_HEADER]: 'token' } })

			// token should be saved
			await fetcher.get('/user')
			// the first call should be without token
			expect(ref.req.headers.get(JWT_HEADER)).toBeNull()
			// the second call should be with token
			await fetcher.get('/user')
			// check if the second call was with token
			expect(ref.req.headers.get(JWT_HEADER)).toBe('token')

			// unauthorized response should clean token
			ref = mockEndpoint('/user', { status: 401 })
			// the third call should be with token but token should be cleaned after it
			await expect(fetcher.get('/user')).rejects.toMatch('Unauthorized')
			// the fourth call should be without token
			await expect(fetcher.get('/user')).rejects.toMatch('Unauthorized')
			// check if the fourth call was with token
			expect(ref.req.headers.get(JWT_HEADER)).toBeNull()
		})

		it('should add XSRF header if we have it in cookies', async () => {
			const ref = mockEndpoint('/user')

			Object.defineProperty(document, 'cookie', {
				writable: true,
				value: `${XSRF_COOKIE}=token`,
			})

			await fetcher.get('/user')
			expect(ref.req.headers.get(XSRF_HEADER)).toBe('token')
		})
	})

	describe('errors', () => {
		it('should throw error on api response with status code 400', async () => {
			mockEndpoint('/user', { status: 400 })

			await expect(fetcher.get('/user')).rejects.toBe('')
		})
	})
})
