/**
 * @description map的异步版本
 * @param array
 * @param fn
 * @returns array
*/
export async function mapAsync<T>(array: T[], fn: Parameters<Array<T>['map']>[0]) {
	return Promise.all(array.map(fn))
}

/**
 * @description 防抖函数
 * @param fn
 * @param delay
 * @returns debounced version of fn
*/
export function debounce(fn: (...args: unknown[]) => void, delay: number) {
	let timer: NodeJS.Timeout
	return (...args: unknown[]) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}

interface Point {
	x: number;
	y: number;
}

/**
 * @description 计算两点间的距离
 * @param p1 距离原点的第一个点
 * @param p2 距离原点的第二个点
 * @returns 距离
*/
export function twoOfPointsDistance(p1: Point, p2: Point) {
	const a = p2.x - p1.x
	const b = p2.y - p1.y
	return Math.hypot(a, b)
}

/**
 * @description 计算阶乘
*/
export function factorial(n: number): number {
	if(n < 0) return 0
	return n <= 1 ? 1 : n * factorial(n - 1)
}


export function createBezier(n: number) {
	const pointNumber = n + 1
	return (t: number, ...points: Point[]): Point => {
		if(t < 0 || t > 1) {
			throw new Error('t must be between 0 and 1')
		}

		if(Array.isArray(points[0])) {
			points = points[0]
		}

		if(points.length !== pointNumber) {
			throw new Error('The number of points must be ' + pointNumber)
		}

		const triangles = pascalTriangle(pointNumber)
		const P0 = points[0]
		const PN = points[n]
		const oneMinusT = 1 - t
		const calValue = (axis: keyof Point) => {
			let result = (oneMinusT ** n) * P0[axis] + t ** n * PN[axis]
			for(let i = 1; i < n; i+=1) {
				const axisValue = points[i][axis]
				const times = triangles[n][i]
				result += times * (oneMinusT ** (n - i)) * (t ** i) * axisValue
			}
			return result	
		}

		return {
			x: calValue('x'),
			y: calValue('y'),
		}
	}
}

/**
 * @description 创建一个帕斯科三角形 
*/
function pascalTriangle(n: number): number[][] {
	const record = [[1]]
	let i = 1
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const zero = (n: any) => n ? n : 0
	while (i < n) {
		const row = []
		let j = 0
		while (j <= i) {
			const previousRow = record[i-1]
			row[j] = zero(previousRow[j-1]) + zero(previousRow[j])
			j+=1
		}
		record.push(row)
		i+=1
	}

	return record
}