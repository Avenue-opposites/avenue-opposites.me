export async function mapAsync<T>(array: T[], fn: Parameters<Array<T>['map']>[0]) {
	return Promise.all(array.map(fn))
}

export function debounce(fn: (...args: unknown[]) => void, delay: number) {
	let timer: NodeJS.Timeout
	return (...args: unknown[]) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}