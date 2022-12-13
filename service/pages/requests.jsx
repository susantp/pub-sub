import React from 'react';
import ProtectedLayout from "../components/protected-layout";
import useSchema from "../hooks/useSchema";

function Requests() {
    const {pages:{requestPage}} = useSchema()
    return <ProtectedLayout title={requestPage.title}>

    </ProtectedLayout>
}

export default Requests;