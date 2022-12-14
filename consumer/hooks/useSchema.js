import React, {useState} from 'react';
import getConfig from "next/config";

function UseSchema(props) {
    const {publicRuntimeConfig: config} = getConfig()
    const [registerPage, setRegisterPage] = useState({
        title: 'Consumer Register',
        description: '',
        metaContent: 'Register your service',
        path: '/register'
    });
    const [loginPage, setLoginPage] = useState({
        title: 'Consumer Login',
        description: '',
        metaContent: 'Login in',
        path: '/'
    });

    const [pages, setPages] = useState({
        home: {
            id: 1,
            title: 'Home',
            description: '',
            metaContent: 'Home',
            path: '/home',
            label: 'Home',
            key: 'home',
            classes: 'cursor-pointer rounded-sm hover:bg-blue-400 p-2 hover:text-white ',
            activeClasses: 'bg-blue-400 text-white',
            component: <></>
        },

    });
    const [paths, setPaths] = useState({
        csrfCookieUrl: {path: `${config.hostApiUrl}/csrf-cookie`},
        searchServiceRequest: {path: `consumer/searchService`}
    })
    return {loginPage, registerPage, pages, paths};
}

export default UseSchema;