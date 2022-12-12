import React, {useContext, useState} from 'react';
import AuthContext, {ProtectRoute} from "../contexts/auth";
import HtmlPageHead from "../components/HtmlPageHead";

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
        <ProtectRoute>
            <HtmlPageHead metaContent={``} linkRel={``} linkHref={``} metaName={``} title={pageInfo.title}/>
            <div className="justify-center items-center container mx-auto my-2">

                <HomeNavbar info={pageInfo.navBar}
                            user={user}
                            classes={`p-6 flex justify-between items-center text-lg bg-blue-500 rounded-lg shadow-lg text-white`}
                            onLogout={handleLogout}/>


            </div>
        </ProtectRoute>
    );
}

export default Home;
const HomeNavbar = ({classes, info, onLogout, user}) => {
    return (
        <div id={`homeNavbar`} className={classes}>
            <div className={`uppercase`}>{info.welcomeText} {user.username}</div>
            <div className={`px-4 py-2 cursor-pointer hover:bg-blue-900 bg-blue-700 rounded-sm`}
                 onClick={onLogout}>{info.logoutText}</div>
        </div>
    )
}