import React, {useState} from 'react';

function UseSchema(props) {

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
    return {loginPage, registerPage, pages};
}

export default UseSchema;