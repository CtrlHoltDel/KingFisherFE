import Cookies from "universal-cookie"
const cookies = new Cookies()

export const setCookies = () => {
    cookies.set('thiscookie', { First: 'cookiedata', second: [1,2,3,4,5,6]})

}

export const getCookies = () => {
    const result = cookies.get('thiscookie')
    console.log(result)
}