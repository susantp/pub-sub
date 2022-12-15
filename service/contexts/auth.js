import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import apiService from "../utils/apiService";
import {toast} from "react-toastify";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import getConfig from "next/config";
import useSchema from "../hooks/useSchema";
import overview from "../pages/overview";

const AuthContext = createContext({
    user: {},

    doRegister: async () => {
    },
    doLogin: async () => {
    },
    doLogout: async () => {
    },
    loading: false,
    isAuthenticated: false,

})

export const AuthContextProvider = ({children}) => {
    const {publicRuntimeConfig: config} = getConfig()
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const loginToast = 'login'
    const passwordNotSameErrorToast = 'passwordNotSameError'
    const registerErrorToast = 'registerError'

    const csrfCookieUrl = `${config.hostApiUrl}/csrf-cookie`
    const registerUrl = `${config.hostAuthUrl}/service/register`
    const loginUrl = `${config.hostAuthUrl}/service/login`
    const logoutUrl = `${config.hostAuthUrl}/service/logout`
    const {loginPage, registerPage, pages} = useSchema()

    useEffect(() => {
        async function loadUserFromCookies() {
            const userExists = JSON.parse(localStorage.getItem('user'))
            if (userExists) {
                [loginPage.path, registerPage.path].includes(router.pathname) && await router.push(pages.overview.path)
                return 0
            }
            await apiService().get(`/user`)
                .then(({data}) => {
                    if (!data[0].errors) {
                        const {user} = data[1].data
                        setUser(user)
                        localStorage.setItem('user', JSON.stringify(user))
                        router.pathname === loginPage.path && router.push(homePath)
                    }
                }).catch(error => {
                    router.pathname === loginPage.path && router.push(loginPage.path)
                    router.pathname === registerPage.path && router.push(loginPage.path)
                })

            setLoading(false)
        }

        loadUserFromCookies().then(r => null)
    }, [])
    const doRegister = async (data) => {
        if (data['password'] !== data['confirm_password']) {
            toast('password must be same', {
                toastId: passwordNotSameErrorToast,
                type: "warning"
            })
            return false
        }
        await apiService().post(registerUrl, data)
            .then(({data}) => {
                if (!data[0].errors) {
                    const {user} = data[1].data
                    localStorage.setItem('user', JSON.stringify(user))
                    if (user) setUser(user);
                }

            })
            .catch(({response}) => {
                // console.log(response.data[1].message)
                toast(response.data[1].message, {toastId: registerErrorToast, pauseOnFocusLoss: false})
            })
    }
    const doLogin = async (data) => {
        await axios.get(csrfCookieUrl).then(() => {
            apiService()
                .post(loginUrl, data)
                .then(({data}) => {
                    if (!data[0].errors) {
                        const {user} = data[1].data
                        localStorage.setItem('user', JSON.stringify(user))
                        if (user) setUser(user);
                        toast(data[1].message, {toastId: loginToast, pauseOnFocusLoss: false})
                    }else{
                        console.log('login error')
                    }
                })
                .catch(error => {
                    console.log(error)
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
    const doLogout = async () => {
        await apiService()
            .post(logoutUrl)
            .then(({data}) => {
                if (!data[1].errors) {
                    setUser(null)
                    localStorage.removeItem('user')
                }
            })
            .catch(error => {
                console.log(error)
            })

    }
    const context = {doLogin, doRegister, doLogout, user, isAuthenticated: !!user, loading}
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext

export const ProtectRoute = ({children}) => {
    const {loginPage} = useSchema()
    const {isAuthenticated, loading} = useContext(AuthContext);
    const router = useRouter()
    if (loading || (!isAuthenticated && router.pathname !== loginPage.path)) {
        return <div className={`container mx-auto`}>
            <Skeleton height={40} count={5}/>
        </div>
    }
    return children;
};
