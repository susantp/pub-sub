import React, {useState} from 'react';

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
        path: '/login'
    });
    const [topBarComponent, setTopBarComponent] = useState({
        welcomeText: `Welcome `,
        logoutText: `Logout`
    });
    const [overViewPage, setOverView] = useState({
        title: 'Overview',
        description: '',
        metaContent: 'Overview',
        path: '/overview'
    });
    return {
        topBarComponent, overViewPage, loginPage, registerPage
    };
}

export default UseSchema;