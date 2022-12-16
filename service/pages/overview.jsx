import React, {useContext} from 'react';
import ProtectedLayout from "../components/protected-layout";
import useSchema from "../hooks/useSchema";
import AuthContext from "../contexts/auth";
import MyMap from "../components/myMap";

// import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'


function Overview(props) {
    const {pages: {overview}} = useSchema()
    const {user} = useContext(AuthContext);
    const mapIsReadyCallback = (map) => {

    }
    return (
        <ProtectedLayout title={overview.title}>
            <h1>Name:
                {user?.name?.toUpperCase()}
            </h1>
            <h3>
                Current Location:
                {user?.latitude}, {user?.longitude}
            </h3>

            <MyMap
                latitude={user?.latitude}
                longitude={user?.longitude}
                mapIsReadyCallback={mapIsReadyCallback}
            />

        </ProtectedLayout>
    )
}

export default Overview;
