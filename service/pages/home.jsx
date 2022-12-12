import React, {useContext, useState} from 'react';
import AuthContext, {ProtectRoute} from "../contexts/auth";
import HtmlPageHead from "../components/HtmlPageHead";
import ProtectedLayout from "../layout/protected-layout";
import HomeTopbar from "../components/layout/home-topbar";

function Home(props) {
    const {user, doLogout} = useContext(AuthContext);
    const [pageInfo, setPageInfo] = useState({
        title: 'Home',
        navBar: {
            welcomeText: `Welcome `,
            logoutText: `Logout`
        }
    });
    const handleLogout = (e) => {
        e.preventDefault()
        doLogout().then(r => window.location.pathname = '/')
        console.log(e)
    }
    return (
        <ProtectedLayout title={pageInfo.title} navBar={pageInfo.navBar} user={user} handleLogout={handleLogout}>
            <div className={`flex gap-y-2`}>Content</div>
        </ProtectedLayout>
    );
}

export default Home;
