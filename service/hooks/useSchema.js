import React, {useState} from 'react';
import Overview from "../pages/overview";
import Requests from "../pages/requests";

function UseSchema(props) {

    const [registerPage, setRegisterPage] = useState({
        title: 'Service Register',
        description: '',
        metaContent: 'Register your service',
        path: '/register'
    });
    const [loginPage, setLoginPage] = useState({
        title: 'Service Login',
        description: '',
        metaContent: 'Login in',
        path: '/'
    });
    const [topBarComponent, setTopBarComponent] = useState({
        welcomeText: `Welcome `,
        logoutText: `Logout`,

    });
    const [pages, setPages] = useState({
        overview: {
            id: 1,
            title: 'Overview',
            description: '',
            metaContent: 'Overview',
            path: '/overview',
            label: 'Overview',
            key: 'overview',
            classes: 'cursor-pointer rounded-sm hover:bg-blue-400 p-2 hover:text-white ',
            activeClasses: 'bg-blue-400 text-white',
            component: <Overview></Overview>
        },
        requestPage: {
            id: 2,
            title: 'Requests',
            description: '',
            metaContent: 'Requests',
            label: 'Requests',
            key: 'requests',
            path: '/requests',
            classes: 'cursor-pointer rounded-sm hover:bg-blue-400 p-2 hover:text-white ',
            activeClasses: 'bg-blue-400 text-white',
            component: <Requests></Requests>
        }
    });
    return {
        topBarComponent, loginPage, registerPage, pages
    };
}

export default UseSchema;