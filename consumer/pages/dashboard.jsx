import React, {useContext} from 'react';
import AuthContext from "../contexts/auth";
import HtmlPageHead from "../components/HtmlPageHead";

function Dashboard(props) {
    const {user} = useContext(AuthContext);

    return (
        <>
            <HtmlPageHead metaContent={``} linkRel={``} linkHref={``} metaName={``} title={`Consumer Dashboard`}/>
            <div>Hi {user.name}</div>
            <p>{user.email}</p>
        </>
    );
}

export default Dashboard;