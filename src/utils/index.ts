export async function mapAsync<T>(array: T[], fn: Parameters<Array<T>['map']>[0]) {
	return Promise.all(array.map(fn))
}