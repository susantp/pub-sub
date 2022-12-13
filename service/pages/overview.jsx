import React from 'react';
import ProtectedLayout from "../components/protected-layout";
import useSchema from "../hooks/useSchema";

function Overview(props) {
    const {pages:{overview}} = useSchema()
    return <ProtectedLayout title={overview.title}>

    </ProtectedLayout>
}

export default Overview;
