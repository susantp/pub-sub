import React, {useContext} from 'react';
import AuthContext, {ProtectRoute} from "../contexts/auth";
import HtmlPageHead from "../components/HtmlPageHead";

function Dashboard(props) {
    const {user} = useContext(AuthContext);

    return (
        <ProtectRoute>
            <HtmlPageHead metaContent={``} linkRel={``} linkHref={``} metaName={``} title={`Service Dashboard`}/>
            <div>Hi {user.name}</div>
            <p>{user.email}</p>
        </ProtectRoute>
    );
}

export default Dashboard;