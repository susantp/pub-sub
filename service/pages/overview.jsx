import React, {useContext} from 'react';
import ProtectedLayout from "../components/protected-layout";
import useSchema from "../hooks/useSchema";
import AuthContext from "../contexts/auth";
import MyMap from "../components/myMap";

// import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'


function Overview(props) {
    const {pages:{overview}} = useSchema()
    const {user} = useContext(AuthContext);
    const mapIsReadyCallback = (map) => {

    }
    return (
        <ProtectedLayout title={overview.title}>
            <h1>Name: {user?.name?.toUpperCase()}</h1>
            <h3>Current Location: {user?.current_location?.coordinates[0]}, {user?.current_location?.coordinates[1]}</h3>
            <h3>{user?.latitude_single_feature?.features[0]?.geometry.coordinates[0]}</h3>
            <h3>{user?.latitude_single_feature?.features[0]?.geometry.coordinates[1]}</h3>

            <MyMap
                latitude={user?.latitude_single_feature?.features[0]?.geometry.coordinates[1]}
                longitude={user?.latitude_single_feature?.features[0]?.geometry.coordinates[0]}
                mapIsReadyCallback={mapIsReadyCallback}
            />

        </ProtectedLayout>
    )
}

export default Overview;
