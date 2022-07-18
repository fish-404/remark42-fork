import { mockEndpoint } from '@test/lib'
import { BlockTTL, createAdminClient } from './admin'

describe('Admin Client', () => {
	const client = createAdminClient({ siteId: 'mysite', baseUrl: '/remark42' })

	it('should create an admin client', () => {
		expect(client).toBeDefined()
	})

	it('should return list of blocked users', async () => {
		const data = [{ id: 1 }, { id: 2 }]

		mockEndpoint('/remark42/api/v1/blocked', { body: data })
		await expect(client.getBlockedUsers()).resolves.toEqual(data)
	})

	it.each`
		ttl              | expected
		${'permanently'} | ${'0'}
		${'1440m'}       | ${'1440m'}
		${'43200m'}      | ${'43200m'}
	`(
		'should block user with ttl: $ttl',
		async ({ ttl, expected }: { ttl: BlockTTL; expected: string }) => {
			const data = { block: true, site_id: 'remark42', user_id: '1' }
			const ref = mockEndpoint('/remark42/api/v1/user/1', { method: 'put', body: data })

			await expect(client.blockUser('1', ttl)).resolves.toEqual(data)
			expect(ref.req.url.searchParams.get('ttl')).toBe(expected)
		}
	)

	it('should unblock user', async () => {
		const data = { block: false, site_id: 'remark42', user_id: '1' }
		const ref = mockEndpoint('/remark42/api/v1/user/1', { method: 'put', body: data })

		await expect(client.unblockUser('1')).resolves.toEqual(data)
		expect(ref.req.url.searchParams.get('block')).toBe('0')
	})

	it('should mark user as verified', async () => {
		const ref = mockEndpoint('/remark42/api/v1/verify/1', { method: 'put' })

		await client.verifyUser('1')
		expect(ref.req.url.searchParams.get('verified')).toBe('1')
	})

	it('should mark user as unverified', async () => {
		const ref = mockEndpoint('/remark42/api/v1/verify/1', { method: 'put' })

		await client.unverifyUser('1')
		expect(ref.req.url.searchParams.get('verified')).toBe('0')
	})

	it('should approve removing request', async () => {
		const ref = mockEndpoint('/remark42/api/v1/deleteme')

		await client.approveRemovingRequest('token')
		expect(ref.req.url.searchParams.get('token')).toBe('token')
	})

	it('should pin comment', async () => {
		const ref = mockEndpoint('/remark42/api/v1/pin/1', { method: 'put' })

		await client.pinComment('1')
		expect(ref.req.url.searchParams.get('pinned')).toBe('1')
	})

	it('should unpin comment', async () => {
		const ref = mockEndpoint('/remark42/api/v1/pin/1', { method: 'put' })

		await client.unpinComment('1')
		expect(ref.req.url.searchParams.get('pinned')).toBe('0')
	})

	it('should remove comment', async () => {
		const ref = mockEndpoint('/remark42/api/v1/comment/1', { method: 'delete' })
		const url = '/post/1'

		await client.removeComment(url, '1')
		expect(ref.req.url.searchParams.get('url')).toBe(url)
	})

	it('should enable commenting on a page', async () => {
		const ref = mockEndpoint('/remark42/api/v1/readonly', { method: 'put' })
		const url = '/post/1'

		await client.enableCommenting(url)
		expect(ref.req.url.searchParams.get('ro')).toBe('1')
		expect(ref.req.url.searchParams.get('url')).toBe(url)
	})

	it('should disable commenting on a page', async () => {
		const ref = mockEndpoint('/remark42/api/v1/readonly', { method: 'put' })
		const url = '/post/1'

		await client.disableCommenting('/post/1')
		expect(ref.req.url.searchParams.get('ro')).toBe('0')
		expect(ref.req.url.searchParams.get('url')).toBe(url)
	})
})
