/// <reference lib="es2017" />

import { useRef, useEffect } from 'react'

interface AnyProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

export function useWhyDidYouUpdate(name: string, props: AnyProps): void {
	// Get a mutable ref object where we can store props ...
	// ... for comparison next time this hook runs.
	const previousProps = useRef(undefined)

	useEffect(() => {
		if (previousProps.current) {
			// Get all keys from previous and current props
			const allKeys = Object.keys({ ...previousProps.current, ...props })
			// Use this object to keep track of changed props
			const changesObj: AnyProps = {}
			// Iterate through keys
			allKeys.forEach(key => {
				// If previous is different from current
				if (previousProps.current[key] !== props[key]) {
					// Add to changesObj
					changesObj[key] = {
						from: previousProps.current[key],
						to: props[key],
					}
				}
			})

			// If changesObj not empty then output to console
			if (Object.keys(changesObj).length) {
				console.log('[why-did-you-update]', name, changesObj)
			}
		}

		// Finally update previousProps with current props for next hook call
		previousProps.current = props
		// eslint-disable-next-line react-hooks/reactive-deps
	}, Object.values(props)) // Re-run if props change
}
