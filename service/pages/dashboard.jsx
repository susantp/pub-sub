import React from 'react';
import {ProtectRoute} from "../contexts/auth";

function Dashboard(props) {
    return (
        <ProtectRoute>
            <HtmlPageHead metaContent={``} linkRel={``} linkHref={``} metaName={``} title={`Consumer Dashboard`} />
            <div>Hi Dashboard</div>
        </ProtectRoute>
    );
}

export default Dashboard;