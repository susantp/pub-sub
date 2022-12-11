import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import apiService from "../utils/apiService";
import {toast} from "react-toastify";
import Cookies from 'js-cookie'
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import getConfig from "next/config";
import Home from "../pages";
import dashboard from "../pages/dashboard";

const AuthContext = createContext({
    user: {}, login: () => {
    },
    logout: () => {
    },
    loading: false,
    isAuthenticated: false
})

export const AuthContextProvider = ({children}) => {
    const {publicRuntimeConfig: config} = getConfig()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const loginToast = 'login'

    const csrfCookieUrl = `${config.hostApiUrl}/csrf-cookie`
    const loginUrl = `${config.hostAuthUrl}/consumer/login`
    const logoutUrl = `${config.hostAuthUrl}/consumer/logout`
    const dashboardPath = '/dashboard'

    useEffect(() => {
        async function loadUserFromCookies() {
            const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
            if (!userFromLocalStorage) {
                await apiService().get(`/user`)
                    .then(({data}) => {
                        if (!data[0].error) {
                            const {user} = data[1].data
                            setUser(user)
                            localStorage.setItem('user', JSON.stringify(user))
                            router.pathname === '/' && router.push(dashboardPath)
                        }
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            } else {
                console.log('json parse ', userFromLocalStorage)
                setUser(userFromLocalStorage)
            }

            setLoading(false)
        }

        loadUserFromCookies().then(r => console.log('loadUserFromCookies called !!!'))
    }, [])

    const login = async (data) => {
        await axios.get(csrfCookieUrl).then(() => {
            apiService().post(loginUrl, data)
                .then(({data}) => {
                    if (!data[0].error) {
                        const {user} = data[1].data
                        localStorage.setItem('user', JSON.stringify(user))
                        if (user) setUser(user);
                        router.push(dashboardPath)
                        toast(data[1].message, {toastId: loginToast, pauseOnFocusLoss: false})
                    }
                })
        })

        /**
         * @description Another method for login, first it request for token, then for user using the token
         *
         * const { data: token } = await api.post('auth/login', { email, password })
         *         if (token) {
         *             console.log("Got token")
         *             Cookies.set('token', token, { expires: 60 })
         *             api.defaults.headers.Authorization = `Bearer ${token.token}`
         *             const { data: user } = await api.get('users/me')
         *             setUser(user)
         *             console.log("Got user", user)
         *         }
         * **/
    }
    const logout = () => {
        apiService().get(logoutUrl).then(({data}) => {
            if (!data[1].error) {
                setUser(null)
                window.location.pathname = '/'
                localStorage.removeItem('user')
            }
        })

    }
    const context = {logout, login, user, isAuthenticated: !!user, loading}
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export const ProtectRoute = ({children}) => {
    const {isAuthenticated, loading} = useContext(AuthContext);
    const router = useRouter()
    if (loading || (!isAuthenticated && router.pathname !== '/')) {
        return <div className={`container mx-auto`}>
            <Skeleton height={40} count={5}/>
        </div>
    }


    return children;
};
