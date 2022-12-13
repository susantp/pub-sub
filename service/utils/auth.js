import router from 'next/router'
import Cookies from 'js-cookie'
import cookie from 'cookie'

export const isLoggedIn = (reqCookies = null) => {
    // if we don't have request cookies, get the cookie from client
    if (!reqCookies) {
        return !!Cookies.get('access_token')
        // return !!window.localStorage.getItem('token')
    }

    // otherwise get cookie from server
    return !!cookie.parse(reqCookies).access_token
}

export const logIn = (token) => {
    // Cookies.set('is_admin_logged_in', true, {expires: 86400, sameSite: 'lax'})
    Cookies.set('access_token', token, {expires: 86400, sameSite: 'lax'})

    router.push('/overview').then(r => null)
}

export const logOut = () => {
    localStorage.removeItem('user')
    if (typeof window !== 'undefined') {
        // remove logged in user's cookie and redirect to login page
        // Cookies.remove('is_admin_logged_in', {expires: 86400, sameSite: 'lax'})
        localStorage.removeItem('user')
        if (!['/register', '/'].includes(router.pathname)) {
            router.push('/')
        }
    }
}