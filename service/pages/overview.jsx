import React, {useContext, useState} from 'react';
import AuthContext, {ProtectRoute} from "../contexts/auth";
import HtmlPageHead from "../components/HtmlPageHead";
import ProtectedLayout from "../components/protected-layout";
import HomeTopbar from "../components/layout/home-topbar";
import useSchema from "../hooks/useSchema";

function Overview(props) {
    const {user, doLogout} = useContext(AuthContext);
    const {overViewPage, topBarComponent} = useSchema()

    return (
        <ProtectedLayout title={overViewPage.title}
                         navBar={topBarComponent}
                         user={user}
                         handleLogout={() => doLogout().then(r => window.location.pathname = '/')}>
            <div className={`flex gap-y-2`}>Content</div>
        </ProtectedLayout>
    );
}

export default Overview;
