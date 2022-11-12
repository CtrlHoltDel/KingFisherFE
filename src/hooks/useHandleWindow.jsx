import { useEffect, useState } from 'react'

const TOUCH_SIZE = 'touch'
const DESKTOP_SIZE = 'desktop'
const MOBILE_CUT_OFF = 605

const useHandleWindow = () => {
    const [windowType, setWindowType] = useState(null);

    useEffect(() => {
        window.addEventListener('resize', () => setWindowType(windowWidth() ? TOUCH_SIZE : DESKTOP_SIZE))
        setWindowType(windowWidth() ? TOUCH_SIZE : DESKTOP_SIZE)
    }, [])

    const windowWidth = () => window.innerWidth <= MOBILE_CUT_OFF

    return { windowType, TOUCH_SIZE }
}

export default useHandleWindow