import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import apiService from "../utils/apiService";
import {toast} from "react-toastify";
import Cookies from 'js-cookie'
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import getConfig from "next/config";

const AuthContext = createContext({
    user: null, login: () => {
    }, logout: () => {
    }, authReady: false
})

export const AuthContextProvider = ({children}) => {
    const {publicRuntimeConfig: config} = getConfig()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const loginToast = 'login'

    useEffect(() => {
        async function loadUserFromCookies() {
            if (user)
                await apiService().get(`/user`)
                    .then(({data}) => {
                        if (!data[0].error) {
                            setUser(data[1].user)
                            // router.pathname === '/' && router.back()
                        }
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            setLoading(false)
        }

        loadUserFromCookies().then(r => console.log('loadUserFromCookies called !!!'))
    }, [])

    const login = async (data) => {
        await axios.get(`${config.hostApiUrl}/csrf-cookie`).then(response => {
            apiService().post(`${config.hostAuthUrl}/consumer/login`, data)
                .then(({data}) => {
                    if (!data[0].error) {
                        const {token, user} = data[1]
                        Cookies.set('token', token, {expires: 86400, sameSite: 'lax'})
                        if (user) setUser(user);
                        router.push('/dashboard')
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
        apiService().get(`/auth/logout`).then(({data}) => {
            if (!data[1].error) {
                setUser(null)
                window.location.pathname = '/'
            }
        })

    }
    const context = {user, login, logout, isAuthenticated: !!user, loading}
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export const ProtectRoute = ({children}) => {
    const {user, isAuthenticated, loading} = useContext(AuthContext);
    const router = useRouter()
    if (loading || (!isAuthenticated && window.location.pathname !== '/')) {
        return <div className={`container mx-auto`}>
            <Skeleton height={40} count={5}/>
        </div>
    }

    return children;
};
