import React from 'react';
import {ProtectRoute} from "../contexts/auth";

function Dashboard(props) {
    return (
        <ProtectRoute>
            <div>Hi Dashboard</div>
        </ProtectRoute>
    );
}

export default Dashboard;