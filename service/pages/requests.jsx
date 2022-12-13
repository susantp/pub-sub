import React, {useContext} from 'react';
import ProtectedLayout from "../components/protected-layout";
import useSchema from "../hooks/useSchema";
import AuthContext from "../contexts/auth";

function Requests(props) {
    const {user, doLogout} = useContext(AuthContext);
    const {overViewPage, topBarComponent} = useSchema()
    return (
        <ProtectedLayout title={overViewPage.title} navBar={topBarComponent} user={user}
                         handleLogout={() => doLogout().then(r => window.location.pathname = '/')}></ProtectedLayout>
    );
}

export default Requests;