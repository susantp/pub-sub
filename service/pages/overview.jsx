import React, {useContext} from 'react';
import ProtectedLayout from "../components/protected-layout";
import useSchema from "../hooks/useSchema";
import AuthContext from "../contexts/auth";
import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'
import { TileLayer } from 'https://cdn.esm.sh/react-leaflet/TileLayer'
import { useMap } from 'https://cdn.esm.sh/react-leaflet/hooks'
function Overview(props) {
    const {user} = useContext(AuthContext);
    const {pages: {overview}} = useSchema()
    return (
        <ProtectedLayout title={overview.title}>
            <h1>Name: {user.name?.toUpperCase()}</h1>
            <h3>Current Location: {user.current_location?.type}</h3>
            <h3>Distance: {user.distance?.type}</h3>
        </ProtectedLayout>
    )
}

export default Overview;
