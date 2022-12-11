import axios from "axios";
import {logOut} from "./auth";
import {toast} from "react-toastify";
import getConfig from 'next/config'

export default function apiService(token = '') {
    const {publicRuntimeConfig: config} = getConfig()
    const unAuthenticatedToast = 'unAuthenticated'
    const api = axios.create({
        baseURL: config.hostApiUrl,
        timeout: 2500,
        withCredentials: true,
        responseType: 'json',
        maxRedirects: 5,
        decompress: true
    })
    // token.length &&
    if (token.length)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // // Request interceptor. Runs before your request reaches the server
    // const onRequest = (config) => {
    //     // If http method is `post | put | delete` and XSRF-TOKEN cookie is
    //     // not present, call '/sanctum/csrf-cookie' to set CSRF token, then
    //     // proceed with the initial response
    //     if ((
    //             config.method == 'post' ||
    //             config.method == 'put' ||
    //             config.method == 'delete'
    //             /* other methods you want to add here */
    //         ) &&
    //         !Cookies.get('XSRF-TOKEN')) {
    //         return setCSRFToken()
    //             .then(response => config);
    //     }
    //     return config;
    // }
    // // A function that calls '/api/csrf-cookie' to set the CSRF cookies. The
    // // default is 'sanctum/csrf-cookie' but you can configure it to be anything.
    // const setCSRFToken = () => {
    //     return api.get(`/csrf-cookie`); // resolves to '/api/csrf-cookie'.
    // }
    //
    // // attach your interceptor
    // api.interceptors.request.use(onRequest, null);

    // if response from server get 401 (unauthorized) logout method called to logout in the front end
    api.interceptors.response.use(response => response, error => {
        if (error.response?.status === 401) {
            logOut()
            toast('Unauthenticated', {toastId: unAuthenticatedToast, pauseOnFocusLoss: false})
            return Promise.reject()
        }
        return Promise.reject(error)
    })


    return api
}