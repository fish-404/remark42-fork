import { createClient } from './index'

describe('module', () => {
	it('should export client', () => {
		expect(createClient).toBeDefined()
	})
})
