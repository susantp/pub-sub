import React from 'react';
import {ProtectRoute} from "../contexts/auth";
import HtmlPageHead from "../components/HtmlPageHead";

function Dashboard(props) {
    return (
        <ProtectRoute>
            <HtmlPageHead metaContent={``} linkRel={``} linkHref={``} metaName={``} title={`Service Dashboard`} />
            <div>Hi Dashboard</div>
        </ProtectRoute>
    );
}

export default Dashboard;