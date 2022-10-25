import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
const cookies = new Cookies();

const KINGFISHER_USER_COOKIE = 'Kingfisher_User_Cookie'
const KINGFISHER_GROUP_COOKIE = 'Kingfisher_Group_Cookie'

const useUser = () => {
    const [user, setUser] = useState(null)
    const [currentlySelectedGroup, setCurrentlySelectedGroup] = useState(null)

    // User
    useEffect(() => {
        const cookieUser = cookies.get(KINGFISHER_USER_COOKIE);
        const cookieGroup = cookies.get(KINGFISHER_GROUP_COOKIE);
        setUser(cookieUser)
        setCurrentlySelectedGroup(cookieGroup)
    }, [])

    const handleLogin = (user) => {
        cookies.set(KINGFISHER_USER_COOKIE, user)
        setUser(user)
    };

    const logoutUser = () => {
        cookies.set(KINGFISHER_USER_COOKIE, null)
        setUser(null)
    }

    // Current Group
    const selectGroup = (group) => {
        cookies.set(KINGFISHER_GROUP_COOKIE, group)
        setCurrentlySelectedGroup(group)
    }

    return { user, handleLogin, logoutUser, selectGroup, currentlySelectedGroup }

}

export default useUser