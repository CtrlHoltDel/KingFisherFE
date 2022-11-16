import { useEffect } from "react"
import { useState } from "react"

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, delay || 300)

        return () => clearTimeout(timeoutId)
    }, [value, delay])

    return { debouncedValue }
}

export default useDebounce