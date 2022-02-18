import { useEffect, useRef } from "react"

let UseDidUpdateEffect = (fn: any, inputs: any) => {
	const didMountRef = useRef(false)

	useEffect(() => {
		if (didMountRef.current) {
			return fn()
		}
		didMountRef.current = true
	}, inputs)
}

export default UseDidUpdateEffect
