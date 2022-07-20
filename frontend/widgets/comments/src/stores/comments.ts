import type { Comment } from '@remark42/api/dist/typings'
import { get, writable } from 'svelte/store'
import { publicApi } from '../lib/api'

const isLoading = writable(false)
let byId = {}
export const comments = writable<null | any[]>(null, () => {
	if (get(isLoading)) {
		return
	}

	publicApi
		.getComments({ url: 'https://remark42.com/demo/', sort: '-active' })
		.then((data: any) => {
			comments.set(data.comments)

			byId = storeById(data.comments)
			console.log(byId)
		})
})

function storeById(comments: any) {
	const obj = {}

	function walk(cc) {
		// debugger
		cc?.forEach((node) => {
			obj[node.comment.id] = node

			if (node.replies) {
				walk(node.replies)
			}
		})
	}

	walk(comments)

	return obj
}

export function addNewComment(comment: Comment) {
	const node = { comment }

	byId[comment.id] = node

	if (comment.pid) {
		const parent = byId[comment.pid]

		parent.replies = [...(parent?.replies ?? []), node]
		comments.update((v) => v)
		return
	}

	comments.update((v) => [node, ...(v ?? [])])
}

comments.subscribe((v) => {
	console.log(v?.[0])
})
