import React, {useContext} from "react";
import AuthContext from "../../contexts/auth";
import {useRouter} from "next/router";

const HomeTopBar = ({classes, info, onLogout, user}) => {
    const {doLogout} = useContext(AuthContext);
    const router = useRouter()
    return (
        <div id={`homeNavbar`} className={classes}>
            <div className={`uppercase`}>{info.welcomeText} {user.username}</div>
            <div className={`px-4 py-2 cursor-pointer hover:bg-blue-900 bg-blue-700 rounded-sm`}
                 onClick={onLogout}>{info.logoutText}</div>
        </div>
    )
}
export default HomeTopBar