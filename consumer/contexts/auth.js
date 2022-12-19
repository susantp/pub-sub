import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import apiService from "../utils/apiService";
import {toast} from "react-toastify";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import getConfig from "next/config";
import useSchema from "../hooks/useSchema";

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
    const registerUrl = `${config.hostAuthUrl}/consumer/register`
    const loginUrl = `${config.hostAuthUrl}/consumer/login`
    const logoutUrl = `${config.hostAuthUrl}/consumer/logout`
    const {loginPage, registerPage, pages} = useSchema()

    useEffect(() => {
        async function loadUserFromCookies() {
            const userExists = JSON.parse(localStorage.getItem('user'))
            if (userExists && Object.keys(userExists).length) {
                setUser(userExists)
                if (
                    [loginPage.path, registerPage.path].includes(router.pathname)
                ) {
                    await router.push(pages.home.path)
                }
            } else {
                await apiService().get(`/user`)
                    .then(({data}) => {
                        if (!data[0].errors) {
                            const {user} = data[1].data
                            setUser(user)
                            localStorage.setItem('user', JSON.stringify(user))
                        }
                    }).catch(error => {
                        ![loginPage.path, registerPage.path].includes(router.pathname) && router.push(loginPage.path)
                    })
            }

            setLoading(false)
        }

        loadUserFromCookies().then(r => console.log('loadUserFromCookies called !!!'))
    }, [])
    const doRegister = async (data, redirectPath) => {
        if (data['password'] !== data['confirm_password']) {
            toast('password must be same', {
                toastId: passwordNotSameErrorToast,
                type: "warning"
            })
            return false
        }
        await apiService().post(registerUrl, data)
            .then(({data}) => {
                if (!data[0].error) {
                    const {user} = data[1].data
                    // console.log('register ', user)
                    localStorage.setItem('user', JSON.stringify(user))
                    if (user) setUser(user);
                    router.push(redirectPath)
                }

            })
            .catch((error) => {
                console.log(error)
                if (error?.response?.status >= 500) {
                    toast('Registration failed. !!! Please contact support.', {
                        toastId: registerErrorToast,
                        pauseOnFocusLoss: false
                    })
                }
                toast(error?.response?.data[1]?.message, {
                    toastId: registerErrorToast,
                    pauseOnFocusLoss: false
                })
            })
    }
    const doLogin = async (data, redirectPath) => {
        await axios.get(csrfCookieUrl).then(() => {
            apiService().post(loginUrl, data)
                .then(({data}) => {
                    if (!data[0].error) {
                        const {user} = data[1].data
                        localStorage.setItem('user', JSON.stringify(user))
                        if (user) setUser(user);
                        router.push(redirectPath)
                    } else {
                        console.log('on error ', data[1].message)
                    }
                })
                .catch(error => {
                    toast(error.response?.data[1].message, {
                        toastId: 'loginError'
                    })
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
    const doLogout = async (redirectPath) => {
        await apiService()
            .post(logoutUrl, {type: config.userType})
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
    const {isAuthenticated, loading} = useContext(AuthContext);
    const router = useRouter()
    if (loading || (!isAuthenticated && router.pathname !== '/')) {
        return <div className={`container mx-auto`}>
            <Skeleton height={40} count={5}/>
        </div>
    }
    return children;
};
