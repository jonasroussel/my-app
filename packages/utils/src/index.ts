export const sleep = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms))

export const formatCount = (count: number) => {
	if (count < 0) return '...'
	return count
}
