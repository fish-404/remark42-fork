import { mockEndpoint } from '@test/lib'
import { User } from 'typings'
import { createPublicClient, GetUserCommentsParams, Vote } from './public'

describe('Public Client', () => {
	const client = createPublicClient({ siteId: 'mysite', baseUrl: '/remark42' })

	it('should create an public client', () => {
		expect(client).toBeDefined()
	})

	describe('getConfig', () => {
		it('should return config', async () => {
			const data = { x: 1, y: 2 }

			mockEndpoint('/remark42/api/v1/config', { body: data })
			await expect(client.getConfig()).resolves.toEqual(data)
		})
	})

	describe('getComments', () => {
		it('should return page comments', async () => {
			const data = { post: { id: '1' }, node: [{ id: 1 }] }
			const ref = mockEndpoint('/remark42/api/v1/find', { body: data })

			await expect(client.getComments('/post/1')).resolves.toEqual(data)
			expect(ref.req.url.searchParams.get('url')).toBe('/post/1')
		})
		it.each`
			params
			${{ userId: '1' }}
			${{ userId: '2' }}
			${{ userId: '3', limit: 10 }}
			${{ userId: '4', skip: 10 }}
			${{ userId: '5', skip: 10, limit: 0 }}
		`(
			'should return user comments with params: $params',
			async ({ params }: { params: GetUserCommentsParams }) => {
				const data = [{ id: 1 }, { id: 2 }]
				const ref = mockEndpoint('/remark42/api/v1/comments', { body: data })

				await expect(client.getComments(params)).resolves.toEqual(data)
				expect(ref.req.url.searchParams.get('userId')).toBe(params.userId)
				expect(ref.req.url.searchParams.get('limit')).toBe(
					params.limit === undefined ? null : `${params.limit}`
				)
				expect(ref.req.url.searchParams.get('skip')).toBe(
					params.skip === undefined ? null : `${params.skip}`
				)
			}
		)
	})

	it('should add comment', async () => {
		const data = { id: '1', text: 'test' }
		const ref = mockEndpoint('/remark42/api/v1/comment', { method: 'post', body: data })

		await expect(client.addComment('/post/my-first-post', { text: 'test' })).resolves.toEqual(data)
		await expect(ref.req.json()).resolves.toEqual({
			text: data.text,
			locator: {
				site: 'mysite',
				url: '/post/my-first-post',
			},
		})
	})

	it('should update comment', async () => {
		const data = { id: 1, body: 'test' }
		const ref = mockEndpoint('/remark42/api/v1/comment/1', { method: 'put', body: data })

		await expect(client.updateComment('/post/my-first-post', '1', 'test')).resolves.toEqual(data)
		await expect(ref.req.json()).resolves.toEqual({ text: 'test' })
		expect(ref.req.url.searchParams.get('url')).toBe('/post/my-first-post')
	})

	it('should remove comment', async () => {
		const ref = mockEndpoint('/remark42/api/v1/comment/1', { method: 'delete' })

		await expect(client.removeComment('/post/my-first-post', '1')).resolves.toBe('')
		expect(ref.req.url.searchParams.get('url')).toBe('/post/my-first-post')
	})

	it.each`
		do            | vote
		${'upvote'}   | ${1}
		${'downvote'} | ${-1}
	`('should $do for comment', async ({ vote }: { vote: Vote; expected: string }) => {
		const data = { id: 1, vote: 2 }
		const ref = mockEndpoint('/remark42/api/v1/vote/1', { method: 'put', body: data })

		await expect(client.vote('/post/my-first-post', '1', vote)).resolves.toEqual(data)
		expect(ref.req.url.searchParams.get('url')).toBe('/post/my-first-post')
		expect(ref.req.url.searchParams.get('vote')).toBe(`${vote}`)
	})

	it.each`
		user
		${null}
		${{ id: '1', username: 'user' }}
	`('should return user', async ({ user }: { user: User | null }) => {
		mockEndpoint('/remark42/api/v1/user', { body: user })
		await expect(client.getUser()).resolves.toEqual(user)
	})
})
